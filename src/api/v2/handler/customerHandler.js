const {getCustomerProfile} = require('../controller/customerController')
const customerProfileHandler = async(event) => {
    switch (event.method) {
        case 'GET':
            console.log(event.method, 'eventbody-----');
            let profile = await getCustomerProfile();
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

const customerApplicationHandler = (event)=>{
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
const customerPolicyHandler = (event)=>{
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
const customerClaimsHandler = (event)=>{
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
const customerPaymentHandler = (event)=>{
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
const customerPreferenceHandler = (event)=>{
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



module.exports = { customerProfileHandler,customerApplicationHandler,customerPolicyHandler,customerPaymentHandler,customerClaimsHandler };