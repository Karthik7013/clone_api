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

const DELETE_REFRESH_TOKEN = 'DELETE FROM refresh_token where refresh_token = ?'

module.exports = {
    GET_CUSTOMER_PHONE, GET_AGENT_PHONE, GET_EMPLOYEE_PHONE, CREATE_CUSTOMER, CREATE_EMPLOYEE, CREATE_AGENT,
    GET_CUSTOMER_MAX_ID,
    GET_AGENT_MAX_ID,
    GET_EMPLOYEE_MAX_ID,
    GET_CUSTOMER_ID,
    GET_EMPLOYEE_ID,
    GET_AGENT_ID,
    INSERT_REFRESH_TOKEN,
    DELETE_REFRESH_TOKEN
}