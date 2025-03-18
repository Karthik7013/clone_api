// =======================|        NAEMLIX 360 TOTAL INSURANCE APPLICATION        |=================>
const express = require("express");
const path = require('path')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { flushCache } = require("./utils/cache");
const fs = require('fs');
// ================|        MIDDLEWARES      |================>
const rateLimiter = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// ================|        V1 ROUTES      |================>
const authRoutes = require('./v1/routes/authRoutes')
const customerRoutes = require("./v1/routes/customerRoutes");
const agentRoutes = require("./v1/routes/agentRoutes");
const employeeRoutes = require("./v1/routes/employeeRoutes");
const botRoutes = require("./v1/routes/botRoutes");
const analyticsRoutes = require("./v1/routes/analyticsRoute");
const webhookRoutes = require("./v1/routes/webhookRoutes");
const smsRoutes = require("./v1/routes/smsRoutes");

// ================|        V1 ROUTES      |================>
const authRoutesV2 = require('./v2/routes/authRoutes');
const customerRoutesV2 = require("./v2/routes/customerRoutes");
const agentRoutesV2 = require("./v2/routes/agentRoutes");
const employeeRoutesV2 = require("./v2/routes/employeeRoutes");
const botRoutesV2 = require("./v2/routes/botRoutes");
const analyticsRoutesV2 = require("./v2/routes/analyticsRoute");
const webhookRoutesV2 = require("./v2/routes/webhookRoutes");
const smsRoutesV2 = require("./v2/routes/smsRoutes");
const successHandler = require("./middleware/successHandler");

const app = express();

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(logger);

// ================| CORS OPTIONS |=================>
const corsOptions = {
    origin: ['http://localhost:5173'], // allowed origin
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

let count = 0;

app.use('/public', express.static(path.join(__dirname, '../../public')));

// ==========================| VERSION 0.1 |===========================>

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/customer', customerRoutes)
app.use('/api/v1/agent', agentRoutes)
app.use('/api/v1/employee', employeeRoutes)
app.use('/api/v1/bot', botRoutes)
app.use('/api/v1/analytics', analyticsRoutes)
app.use('/api/v1/webhooks', webhookRoutes)
app.use('/api/v1/sms', smsRoutes)


// ==========================| VERSION 0.2 |===========================>

app.use('/api/v2/auth', authRoutesV2)
app.use('/api/v2/customer', customerRoutesV2)
app.use('/api/v2/agent', agentRoutesV2)
app.use('/api/v2/employee', employeeRoutesV2)
app.use('/api/v2/bot', botRoutesV2)
app.use('/api/v2/analytics', analyticsRoutesV2)
app.use('/api/v2/webhooks', webhookRoutesV2)
app.use('/api/v2/sms', smsRoutesV2)

// SSE
app.get('/', async (req, res) => {
    // res.setHeader('Content-Type', 'text/event-stream')
    // res.setHeader('Cache-Control', 'no-cache')
    // res.setHeader('Connection', 'keep-alive');
    // res.setHeader('Transfer-Encoding', 'chunked');
    const api1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
    });
    const api2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 6000)
    })
    // setTimeout(()=> res.end(),10000)
    api1.then((data = "api1") => {
        res.write(data);
    })
    api2.then((data = "api2") => {
        res.write(data);
    })
})

app.get('/add', (req, res) => {
    ++count;
    // return res.json(200).json(successHandler(count,"count increased",200))
    return res.status(200).json(successHandler(count, 'added', 200))
})
app.get('/getCount', (req, res) => {
    return res.status(200).json(successHandler(count, 'count', 200))
})
console.log(path.join(__dirname+""),'thisi')
app.get('/crash', (req, res) => {
    try {
        console.log(err)
    } catch (error) {
        console.log(error.message)
        fs.writeFile(path.join(__dirname+'/log.txt'), error.message,(fileError)=>{
            if(fileError) console.log('failed to write !');
        })
    }
})

// app.use(errorHandler);
app.use(notFound)
// flushCache()


module.exports = app;