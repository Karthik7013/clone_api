const http = require('k6/http');
const { sleep } = require('k6');

export let options = {
    vus: 10, // virtual users
    duration: '3600s', // test duration
};

export default function () {
    http.get('https://namelixinsurance.koyeb.app/private'); // replace with your API
    sleep(1); // wait 1 second between requests
}