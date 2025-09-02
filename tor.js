const axios = require("axios")
const { SocksProxyAgent } = require("socks-proxy-agent");

function generatePhoneNumber() {
    const firstDigitOptions = [9, 8, 7, 6];
    const firstDigit = firstDigitOptions[Math.floor(Math.random() * firstDigitOptions.length)];

    let number = firstDigit.toString();
    for (let i = 0; i < 9; i++) {
        number += Math.floor(Math.random() * 10); // random digit 0–9
    }
    return number;
}
const body3 = {
    payload: "EqmOGBbKW4aRltA8G6PYmw==:alfrcyVmGLRVOTNYXTewp23n1GhhjjuFiXQ77l/pI0wFfZxzTUA29dDobwc2TGAx1M4uwdbNN0dpu1Luu/7mmgyZKBKTSuRN2tkIVTAUt3T9KzwPBnCjyYsOq91gKzhgiQs4s3VwI0KnOPGBh1Qcm4IEJ9UOD6AcNiOMXNBb+571s99R7vhMkHoEjlE3WRZ0THVtsgpiq1BmdUWdQ2taoFhC7xDb84AAzGuiWfqWW2H4ofXf4Fhux+X0irZxPbGtzF3DPtwMRDf7g5Oae12AGh7x7tHYahcTwEUf3Y8DezKFjK2UCyFeoJcOyBzPSFtQCZd7qrbyUpLJgioAu12lb9wkljpf2QA2aCP0efXEudK0wvSHZ+U3vc1JWxB13USYaQGOPhO+k4ZvWWMbP/tdbddDmy33dDDELef59c9COacPuUc/GMiccEmyGhpZ1Shd9UuHRFXdtaaQeFjNGgoXhV49sdwCefOMyYGmheJfK/YhnWHLA5SmoLnfCTerGSDzrRb1JWSTQO4GEHRwyNxFZg=="
}
const body4 = {
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

async function getIP({
    count = 1,
    phone_number,
    customer_name
}) {
    try {
        const torAgent = new SocksProxyAgent("socks5h://127.0.0.1:9050");
        // Call IP API only once
        const ipRes = await axios.get("https://httpbin.org/ip",
            { httpsAgent: torAgent }
        );
        const ipAddress = ipRes.data.origin;


        const makeMultipleReq = async () => {
            return Promise.all(
                Array.from({ length: count }, async (_, i) => {
                    try {
                        const phoneNumber = generatePhoneNumber().toString();
                        const body1 = {
                            phone: phone_number || phoneNumber,
                            org_id: "100",
                            agent_id: "1000",
                            method: "SEND",
                            type: "C",
                            name: customer_name || ""
                        };
                        const body2 = {
                            customer_name: customer_name || "",
                            phone: phone_number || phoneNumber,
                            org_id: "100",
                            agent_id: "1000",
                            method: "POST",
                            type: "C"
                        };

                        // Run requests in parallel
                        const [res1,
                            res2, res3, res4
                        ] = await Promise.all([
                            axios.post(
                                "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/messages/v1/sms",
                                body1,
                                { httpsAgent: torAgent }
                            ),
                            axios.post(
                                "https://75e8n7v4uj.execute-api.ap-south-1.amazonaws.com/Prod/insurance/crm/v1/org/agent/customer",
                                body2,
                                { httpsAgent: torAgent }
                            ),
                            axios.post(
                                "https://c4vygufp78.execute-api.ap-south-1.amazonaws.com/Prod/insurance/v1/health/policy/quote",
                                body3,
                                { httpsAgent: torAgent }
                            ),
                            axios.post(
                                "https://73rhs0ky9d.execute-api.ap-south-1.amazonaws.com/prod/insurance/v1/motor/policy/quote",
                                body4,
                                { httpsAgent: torAgent }
                            )
                        ]);

                        return {
                            ip: ipAddress,
                            api1: { req: body1, res: res1.data },
                            api2: { req: body2, res: res2.data },
                            api3: { req: body3, res: res3.data },
                            api4: { req: body4, res: res4.data }
                        };
                    } catch (err) {
                        return { index: i, error: err.message, response: err.response?.data };
                    }
                })
            );
        };

        const multiResults = await makeMultipleReq();
        return { multiple: multiResults, count };
    } catch (err) {
        throw err;
    }
}
module.exports = { getIP };