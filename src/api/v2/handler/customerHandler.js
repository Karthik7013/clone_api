const { getCustomerProfile, updateCustomerProfile, deleteCustomerProfile } = require('../controller/customerController')

const customerProfileHandler = async (event) => {
    const customer_id = event.params.id;
    const updatedCustomerDetails = event.body;
    switch (event.method) {
        case 'GET':
            let profile = await getCustomerProfile(customer_id);
            return profile;
        case 'POST':
            console.log(event.method, 'eventbody--CUSTOMER ADD---');
            break;
        case 'PUT':
        let updatedProfile = await updateCustomerProfile(customer_id, updatedCustomerDetails)
        return updatedProfile;
        case 'DELETE':
            let deleteProfile = await deleteCustomerProfile(customer_id);
            return deleteProfile;
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

module.exports = { customerProfileHandler, customerApplicationHandler, customerPolicyHandler, customerPaymentHandler, customerClaimsHandler };