const GET_CUSTOMER_PHONE = 'SELECT * FROM customer WHERE phone = ?';

const GET_EMPLOYEE_PHONE = 'SELECT * FROM employee WHERE phone = ?';

const GET_AGENT_PHONE = 'SELECT * FROM agent WHERE phone = ?';

const GET_CUSTOMER_ID = 'SELECT * FROM customer WHERE customer_id = ?';

const GET_EMPLOYEE_ID = 'SELECT * FROM employee WHERE employee_id = ?';

const GET_AGENT_ID = 'SELECT * FROM agent WHERE agent_id = ?';

const CREATE_CUSTOMER = 'INSERT INTO customer (customer_id,first_name,last_name,phone,created_at) VALUES(?,?,?,?,?)'

const CREATE_AGENT = 'INSERT INTO agent (agent_id,first_name,last_name,phone,created_at) VALUES(?,?,?,?,?)'

const CREATE_EMPLOYEE = 'INSERT INTO employee (employee_id,first_name,last_name,phone,email,dob,gender,address_line1,address_line2,state,city,pincode,country,position,department,hire_date,salary,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

const GET_CUSTOMER_MAX_ID = 'SELECT MAX(CAST(SUBSTRING(customer_id, 5) AS UNSIGNED)) AS max_id FROM customer';
const GET_AGENT_MAX_ID = 'SELECT MAX(CAST(SUBSTRING(agent_id, 6) AS UNSIGNED)) AS max_id FROM agent';
const GET_EMPLOYEE_MAX_ID = 'SELECT MAX(CAST(SUBSTRING(employee_id, 4) AS UNSIGNED)) AS max_id FROM employee';

module.exports = { GET_CUSTOMER_PHONE, GET_AGENT_PHONE, GET_EMPLOYEE_PHONE, CREATE_CUSTOMER, CREATE_EMPLOYEE, CREATE_AGENT,
    GET_CUSTOMER_MAX_ID,
    GET_AGENT_MAX_ID,
    GET_EMPLOYEE_MAX_ID,
    GET_CUSTOMER_ID,
    GET_EMPLOYEE_ID,
    GET_AGENT_ID
 }