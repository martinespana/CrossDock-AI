import assert from 'node:assert/strict';
import { sendDemoRequest } from '../lib/demo-request.ts';

// In-memory responses only: these checks never contact a service or send leads.
const details = { firstName: 'Demo', lastName: 'Test', email: 'demo@example.com', company: 'Example', phone: '+57 (300) 123 4567 ext. 2', interest: 'exceptions', message: 'Test only', locale: 'es' };
let calls = 0;
await assert.rejects(() => sendDemoRequest('', details, async () => { calls++; }), /not configured/);
assert.equal(calls, 0);
for (const interest of ['', 'unknown', undefined]) {
  await assert.rejects(() => sendDemoRequest('https://receiver.example/demo', { ...details, interest }, async () => { calls++; }), /interest is required/);
}
assert.equal(calls, 0);

await sendDemoRequest('https://receiver.example/demo', details, async (url, request) => {
  assert.equal(url, 'https://receiver.example/demo');
  assert.equal(request.method, 'POST');
  assert.equal(request.headers['Content-Type'], 'application/json');
  assert.equal(request.redirect, 'error');
  assert.deepEqual(JSON.parse(request.body), { ...details, fullName: 'Demo Test', source: 'crossdock-demo' });
  return Response.json({ accepted: true });
});

for (const response of [Response.json({ accepted: false }), Response.json({}), new Response(null, { status: 204 }), new Response('<html>Login</html>'), Response.json({ accepted: true }, { status: 500 })]) {
  await assert.rejects(() => sendDemoRequest('https://receiver.example/demo', details, async () => response));
}

await sendDemoRequest('https://formspree.io/f/testid', details, async (url, request) => {
  assert.equal(url, 'https://formspree.io/f/testid');
  assert.equal(request.headers.Accept, 'application/json');
  assert.ok(request.body instanceof FormData);
  assert.equal(request.headers['Content-Type'], undefined);
  assert.equal(request.body.get('email'), details.email);
  assert.equal(request.body.get('firstName'), details.firstName);
  assert.equal(request.body.get('lastName'), details.lastName);
  assert.equal(request.body.get('fullName'), 'Demo Test');
  assert.equal(request.body.get('phone'), details.phone);
  assert.equal(request.body.get('interest'), 'exceptions');
  assert.equal(request.body.get('source'), 'crossdock-demo');
  assert.equal(request.body.get('locale'), 'es');
  assert.match(request.body.get('_subject'), /Solicitud de demo/);
  return Response.json({ ok: true });
});
await sendDemoRequest('https://formspree.io/f/testid', { ...details, firstName: '  Demo ', lastName: ' Test  ', phone: '', interest: 'other', locale: 'en' }, async (_url, request) => {
  assert.equal(request.body.get('fullName'), 'Demo Test');
  assert.equal(request.body.get('phone'), '');
  assert.equal(request.body.get('interest'), 'other');
  assert.equal(request.body.get('locale'), 'en');
  assert.match(request.body.get('_subject'), /Demo request/);
  return new Response(null, { status: 204 });
});
await assert.rejects(() => sendDemoRequest('https://formspree.io/f/testid', details, async () => Response.json({ errors: ['Invalid form'] }, { status: 422 })));
await assert.rejects(() => sendDemoRequest('https://formspree.io.evil.example/f/testid', details, async (_url, request) => {
  assert.equal(typeof request.body, 'string');
  return Response.json({ ok: true });
}));
await assert.rejects(() => sendDemoRequest('https://formspree.io/f/testid', details, async () => { throw new Error('Network failure'); }), /Network failure/);
console.log('Demo receiver checks passed. No network requests made.');
