const GET_CUSTOMER_PHONE = 'SELECT * FROM customer WHERE phone = ?';

const GET_EMPLOYEE_PHONE = 'SELECT * FROM employee WHERE phone = ?';

const GET_AGENT_PHONE = 'SELECT * FROM agent WHERE phone = ?';

const CREATE_CUSTOMER = 'INSERT INTO customer (customer_id,first_name,last_name,phone,created_at) VALUES(?,?,?,?,?)'

const CREATE_AGENT = 'INSERT INTO agent (customer_id,first_name,last_name,phone,created_at) VALUES(?,?,?,?,?)'

const CREATE_EMPLOYEE = 'INSERT INTO employee (customer_id,first_name,last_name,phone,created_at) VALUES(?,?,?,?,?)'


module.exports = { GET_CUSTOMER_PHONE, GET_AGENT_PHONE, GET_EMPLOYEE_PHONE, CREATE_CUSTOMER, CREATE_EMPLOYEE, CREATE_AGENT }