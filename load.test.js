import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 55 },    // ramp up slowly
        { duration: '1m', target: 100 },   // increase gradually
        { duration: '30s', target: 500 },   // ramp down
    ],
};

export default function () {
    let params = { timeout: '60s' };
    const res = http.get('https://namelixinsurance.koyeb.app/private', params);
    check(res, {
        'status is 200': (r) => r.status === 200
    });
    sleep(1);
}