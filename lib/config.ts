const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '';
export const siteConfig = {
  name: 'CrossDock AI',
  wordmark: 'cross-dock.ai',
  origin: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cross-dock.ai',
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? '',
  demoBookingUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Tts4e59iBCp0Ktlz_mlKzr0S9WF6eNqxlaqmzVtGMb-q_hzQcLyyEqqDgjAdqo47hxFqU2OHE',
  linkedin: /^https:\/\/(www\.)?linkedin\.com\//i.test(linkedin) ? linkedin : '',
  description: 'AI agents that coordinate the work between logistics teams, systems, and partners. Built by logistics operators, for logistics operators.',
};
