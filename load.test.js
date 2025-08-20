import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 1 },   // start small
        { duration: '1m', target: 5 },    // ramp up slowly
        { duration: '1m', target: 10 },   // increase gradually
        { duration: '30s', target: 0 },   // ramp down
    ],
};

export default function () {
    let params = { timeout: '60s' };
    const res = http.get('https://namelixinsurance.koyeb.app/api/v1/analytics/cron-job', params);
    check(res, {
        'status is 200': (r) => r.status === 200
    });
    sleep(1);
}