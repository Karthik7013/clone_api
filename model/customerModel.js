const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    custId: String,
    dob: Date,
    firstname: String,
    lastname: String,
    type: String,
    gender: String,
    sideProps: [],
    menuProps: [],

})
const customerModel = mongoose.Model('', {})