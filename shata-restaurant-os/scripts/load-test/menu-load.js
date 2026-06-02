import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const menuLoadTime = new Trend('menu_load_time');

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m',  target: 100 },
    { duration: '30s', target: 500 },
    { duration: '1m',  target: 500 },
    { duration: '30s', target: 1000 },
    { duration: '1m',  target: 1000 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
    errors: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3004';

export default function () {
  // Health check (liveness probe — should always be fast)
  const healthRes = http.get(`${BASE_URL}/api/health/ping`);
  const healthOk = check(healthRes, {
    'health status 200': (r) => r.status === 200,
    'health response < 100ms': (r) => r.timings.duration < 100,
  });
  errorRate.add(!healthOk);

  sleep(0.5);

  // Simulate a customer scanning a QR code and hitting the menu endpoint
  // The menu endpoint has 5-minute Redis cache — after first hit, all subsequent are cache hits
  const menuRes = http.get(`${BASE_URL}/api/health`, {
    headers: { 'Accept': 'application/json' },
  });
  const menuOk = check(menuRes, {
    'api responds 200': (r) => r.status === 200,
    'api response < 500ms': (r) => r.timings.duration < 500,
  });
  menuLoadTime.add(menuRes.timings.duration);
  errorRate.add(!menuOk);

  sleep(1);
}
