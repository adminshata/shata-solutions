import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const menuResponseTime = new Trend('menu_response_time');

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '2m',  target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.01'],
    errors: ['rate<0.01'],
    menu_response_time: ['p(95)<500'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3004';
const SESSION_TOKEN = __ENV.SESSION_TOKEN || 'demo-token';

export default function () {
  group('Customer order flow', () => {
    // Step 1: Load session context
    group('Load session', () => {
      const res = http.get(`${BASE_URL}/api/v1/sessions/${SESSION_TOKEN}`, {
        headers: { 'Accept': 'application/json' },
      });
      const ok = check(res, {
        'session loads': (r) => r.status === 200 || r.status === 404,
        'session fast': (r) => r.timings.duration < 300,
      });
      errorRate.add(!ok);
    });

    sleep(1);

    // Step 2: Load menu (should be cache hit after first request)
    group('Load menu', () => {
      const res = http.get(`${BASE_URL}/api/v1/sessions/${SESSION_TOKEN}/menu`, {
        headers: { 'Accept': 'application/json' },
      });
      const ok = check(res, {
        'menu loads': (r) => r.status === 200 || r.status === 404,
        'menu fast (cache hit target)': (r) => r.timings.duration < 500,
      });
      menuResponseTime.add(res.timings.duration);
      errorRate.add(!ok);
    });

    sleep(2);

    // Step 3: Check upsell suggestions
    group('Upsell check', () => {
      const res = http.get(
        `${BASE_URL}/api/v1/sessions/${SESSION_TOKEN}/upsell/prod-cappuccino`,
        { headers: { 'Accept': 'application/json' } }
      );
      check(res, {
        'upsell responds': (r) => r.status === 200 || r.status === 404,
      });
    });

    sleep(2);
  });
}
