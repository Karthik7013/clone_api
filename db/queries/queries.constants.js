const GET_CUSTOMER_PHONE = 'SELECT * FROM customers WHERE phone = ?';

const GET_EMPLOYEE_PHONE = 'SELECT * FROM employees WHERE phone = ?';

const GET_AGENT_PHONE = 'SELECT * FROM agents WHERE phone = ?';

const GET_CUSTOMER_ID = 'SELECT * FROM customers WHERE customer_id = ?';

const GET_EMPLOYEE_ID = 'SELECT * FROM employees WHERE employee_id = ?';

const GET_AGENT_ID = 'SELECT * FROM agents WHERE agent_id = ?';

const CREATE_CUSTOMER = 'INSERT INTO customer (customer_id,first_name,last_name,phone,created_at) VALUES(?,?,?,?,?)'

const CREATE_AGENT = 'INSERT INTO agent (agent_id,first_name,last_name,phone,created_at) VALUES(?,?,?,?,?)'

const CREATE_EMPLOYEE = 'INSERT INTO employee (employee_id,first_name,last_name,phone,email,dob,gender,address_line1,address_line2,state,city,pincode,country,position,department,hire_date,salary,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

const GET_CUSTOMER_MAX_ID = 'SELECT MAX(CAST(SUBSTRING(customer_id, 5) AS UNSIGNED)) AS max_id FROM customer';
const GET_AGENT_MAX_ID = 'SELECT MAX(CAST(SUBSTRING(agent_id, 6) AS UNSIGNED)) AS max_id FROM agent';
const GET_EMPLOYEE_MAX_ID = 'SELECT MAX(CAST(SUBSTRING(employee_id, 4) AS UNSIGNED)) AS max_id FROM employee';

const INSERT_REFRESH_TOKEN = 'INSERT INTO refresh_token (customer_id,employee_id,agent_id,refresh_token,expires_at,user_agent,ip_address) VALUES(?,?,?,?,?,?,?)';

const DELETE_REFRESH_TOKEN = 'DELETE FROM refresh_token where refresh_token = ?';

const GET_CUSTOMER_POLICIES = 'SELECT * FROM policies WHERE customer_id = ?'

const GET_CUSTOMER_CLAIMS = 'SELECT claims.claim_id,claims.registered_claim_id,claims.claim_date,claims.claim_amount,claims.claim_status,claims.description,claims.created_at,claims.updated_at FROM claims RIGHT JOIN registered_claims ON registered_claims.registered_claim_id = claims.registered_claim_id RIGHT JOIN policies ON registered_claims.policy_id = policies.policy_id WHERE customer_id = ?';

const GET_POLICY_PAYMENT = 'SELECT payments.payment_id,payments.policy_id,payments.amount,payments.payment_date,payments.payment_status,payments.created_at,payments.updated_at FROM payments RIGHT JOIN policies ON payments.policy_id = policies.policy_id WHERE customer_id = ?';

const REGISTER_CLAIM = 'INSERT INTO registered_claims (registered_claim_id,policy_id,description) values(?,?,?)';

const INSERT_CLAIM = 'INSERT INTO claims (claim_id,registered_claim_id,description) values(?,?,?)';

const CREATE_POLICY = 'INSERT INTO policies (application_id, policy_number,policy_type,insured_name,insured_company,customer_id,agent_id,employee_id,start_date,end_date,premium_amount,coverage_amount,status,mode) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'



const CREATE_PAYMENT = "INSERT INTO payments(payment_id, policy_id, amount) VALUES(?,?,?)";
const UPDATE_PAYMENT = "UPDATE payments SET payment_date=?, payment_status=?, payment_mode=?,currency=? WHERE payment_id = ?";
module.exports = {
    GET_CUSTOMER_PHONE, GET_AGENT_PHONE, GET_EMPLOYEE_PHONE, CREATE_CUSTOMER, CREATE_EMPLOYEE, CREATE_AGENT,
    GET_CUSTOMER_MAX_ID,
    GET_AGENT_MAX_ID,
    GET_EMPLOYEE_MAX_ID,
    GET_CUSTOMER_ID,
    GET_EMPLOYEE_ID,
    GET_AGENT_ID,
    INSERT_REFRESH_TOKEN,
    DELETE_REFRESH_TOKEN,
    GET_CUSTOMER_POLICIES,
    GET_POLICY_PAYMENT,
    GET_CUSTOMER_CLAIMS,
    REGISTER_CLAIM,
    INSERT_CLAIM, CREATE_POLICY,
    CREATE_PAYMENT,
    UPDATE_PAYMENT
}