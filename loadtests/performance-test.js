// performance-test.js

import { sleep } from "k6";
import http from "k6/http";

export let options = {
  duration: "5m",
  vus: 250,
  thresholds: {
    http_req_duration: ["p(95)<500"]
  }
};

export default function () {
  http.get("https://tanzu-build.apps.tanzu.on-target.tech");
  sleep(1);
}