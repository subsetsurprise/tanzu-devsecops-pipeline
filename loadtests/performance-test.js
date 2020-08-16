// performance-test.js

import { sleep } from "k6";
import http from "k6/http";
import { Rate } from 'k6/metrics';

const myFailRate = new Rate('failed_requests');

export let options = {
  duration: "5m",
  vus: 250,
  thresholds: {
    'failed_requests': ['rate<0.5'],
    'http_req_duration': ["p(95)<1000"]
  }
};

export default function () {
  let res = http.get("https://tanzu-build.apps.tanzu.on-target.tech");
  myFailRate.add(res.status !== 200);
  sleep(0.25);
}