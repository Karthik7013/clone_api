import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '1s', target: 100 },    // ramp up slowly
        { duration: '1m', target: 100 },   // increase gradually
        { duration: '1m', target: 100 },   // ramp down
        { duration: '1s', target: 0 },   // ramp down
    ],
};

export default function () {
    let params = { timeout: '60s' };
    const res = http.get('http://localhost:8000/target', params);
    check(res, {
        'status is 200': (r) => r.status === 200
    });
    sleep(1);
}