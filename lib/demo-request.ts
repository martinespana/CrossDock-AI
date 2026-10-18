export const demoInterests = ['tracking', 'exceptions', 'documents', 'other'] as const;
export type DemoInterest = typeof demoInterests[number];

export type DemoDetails = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  interest: DemoInterest;
  message: string;
  locale: 'en' | 'es';
};

/** Send to the configured receiver; never report a booked calendar slot. */
export async function sendDemoRequest(endpoint: string, details: DemoDetails, fetcher: typeof fetch = fetch) {
  if (!endpoint) throw new Error('Demo receiver is not configured');
  if (!demoInterests.includes(details.interest)) throw new Error('Demo interest is required');
  const formspree = /^https:\/\/formspree\.io\/f\/[a-z0-9]+\/?$/i.test(endpoint);
  const fields = {
    ...details,
    fullName: `${details.firstName.trim()} ${details.lastName.trim()}`.trim(),
    source: 'crossdock-demo',
  };
  const body = new FormData();
  if (formspree) {
    for (const [key, value] of Object.entries(fields)) body.set(key, value);
    body.set('_subject', details.locale === 'es' ? 'CrossDock AI — Solicitud de demo' : 'CrossDock AI — Demo request');
  }
  const response = await fetcher(endpoint, {
    method: 'POST',
    headers: formspree ? { Accept: 'application/json' } : { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: formspree ? body : JSON.stringify(fields),
    redirect: 'error',
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Demo request was not accepted');
  // Formspree's documented AJAX contract acknowledges receipt with HTTP 2xx.
  if (formspree) return;
  const result: unknown = await response.json();
  if (typeof result !== 'object' || result === null || !('accepted' in result) || result.accepted !== true) {
    throw new Error('Receipt not confirmed');
  }
}
