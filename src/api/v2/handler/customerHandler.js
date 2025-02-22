const { getCustomerProfile } = require('../controller/customerController')
const customerProfileHandler = async (event) => {
    const customer_id = event.params.id;
    switch (event.method) {
        case 'GET':
            console.log(event.method, 'eventbody-----');
            let profile = await getCustomerProfile(customer_id);
            console.log(profile, "profile_customer")
            break;
        case 'POST':
            console.log(event.method, 'eventbody-----');
            break;
        case 'PUT':
            console.log(event.method, 'eventbody-----');
            break;
        case 'DELETE':
            console.log(event.method, 'eventbody-----');
            break;
        default:
            break;
    }



}

const customerApplicationHandler = (event) => {
    let response = {}
    switch (event.method) {
        case 'GET':
            console.log(event.method, 'eventbody-----');
            break;
        case 'POST':
            console.log(event.method, 'eventbody-----');
            break;
        case 'PUT':
            console.log(event.method, 'eventbody-----');
            break;
        case 'DELETE':
            console.log(event.method, 'eventbody-----');
            break;
        default:
            break;
    }
    return response
}
const customerPolicyHandler = (event) => {
    let response = {}
    switch (event.method) {
        case 'GET':
            console.log(event.method, 'eventbody-----');
            break;
        case 'POST':
            console.log(event.method, 'eventbody-----');
            break;
        case 'PUT':
            console.log(event.method, 'eventbody-----');
            break;
        case 'DELETE':
            console.log(event.method, 'eventbody-----');
            break;
        default:
            break;
    }
    return response
}
const customerClaimsHandler = (event) => {
    let response = {}
    switch (event.method) {
        case 'GET':
            console.log(event.method, 'eventbody-----');
            break;
        case 'POST':
            console.log(event.method, 'eventbody-----');
            break;
        case 'PUT':
            console.log(event.method, 'eventbody-----');
            break;
        case 'DELETE':
            console.log(event.method, 'eventbody-----');
            break;
        default:
            break;
    }
    return response
}
const customerPaymentHandler = (event) => {
    let response = {}
    switch (event.method) {
        case 'GET':
            console.log(event.method, 'eventbody-----');
            break;
        case 'POST':
            console.log(event.method, 'eventbody-----');
            break;
        case 'PUT':
            console.log(event.method, 'eventbody-----');
            break;
        case 'DELETE':
            console.log(event.method, 'eventbody-----');
            break;
        default:
            break;
    }
    return response
}
const customerPreferenceHandler = (event) => {
    let response = {}
    switch (event.method) {
        case 'GET':
            console.log(event.method, 'eventbody-----');
            break;
        case 'POST':
            console.log(event.method, 'eventbody-----');
            break;
        case 'PUT':
            console.log(event.method, 'eventbody-----');
            break;
        case 'DELETE':
            console.log(event.method, 'eventbody-----');
            break;
        default:
            break;
    }
    return response
}

// this is my change in another branch

module.exports = { customerProfileHandler, customerApplicationHandler, customerPolicyHandler, customerPaymentHandler, customerClaimsHandler };