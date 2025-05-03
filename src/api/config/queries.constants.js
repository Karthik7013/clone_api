const GET_CUSTOMER_PHONE = 'SELECT * FROM customers WHERE phone = ? OR email = ?'

const GET_CUSTOMER_DETAILS = 'SELECT customer_id, firstname, email, phone FROM customers WHERE phone = ? OR email = ?'

const GET_EMPLOYEE_PHONE = 'SELECT * FROM employees WHERE phone = ?';

const GET_AGENT_PHONE = 'SELECT * FROM agents WHERE phone = ?';

const GET_CUSTOMER_ID = 'SELECT * FROM customers WHERE customer_id = ?';

const UPDATE_CUSTOMER_BY_ID = 'UPDATE customers set email = ? ,dob = ?, gender=?,address=?,state=?,city=?,pincode=?,country=?,marital_status=?,bio=? WHERE customer_id = ?';

const DELETE_CUSTOMER_BY_ID = 'DELETE FROM customers WHERE customer_id = ?';

const GET_EMPLOYEE_ID = 'SELECT employees.*, employee_roles.employee_role_id, COALESCE(JSON_ARRAYAGG(role_permissions.permission_id), JSON_ARRAY()) AS permissions FROM employees JOIN employee_roles ON employees.employee_id = employee_roles.employee_id LEFT JOIN role_permissions ON employee_roles.employee_role_id = role_permissions.employee_role_id WHERE employees.employee_id = ? GROUP BY employees.employee_id, employee_roles.employee_role_id'
const GET_AGENT_ID = 'SELECT * FROM agents WHERE agent_id = ?';

const CREATE_CUSTOMER = 'INSERT INTO customer (customer_id,first_name,last_name,phone,created_at) VALUES(?,?,?,?,?)'

const CREATE_AGENT = 'INSERT INTO agent (agent_id,first_name,last_name,phone,created_at) VALUES(?,?,?,?,?)'

const CREATE_EMPLOYEE = 'INSERT INTO employee (employee_id,first_name,last_name,phone,email,dob,gender,address_line1,address_line2,state,city,pincode,country,position,department,hire_date,salary,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

const GET_CUSTOMER_MAX_ID = 'SELECT MAX(CAST(SUBSTRING(customer_id, 5) AS UNSIGNED)) AS max_id FROM customer';
const GET_AGENT_MAX_ID = 'SELECT MAX(CAST(SUBSTRING(agent_id, 6) AS UNSIGNED)) AS max_id FROM agent';
const GET_EMPLOYEE_MAX_ID = 'SELECT MAX(CAST(SUBSTRING(employee_id, 4) AS UNSIGNED)) AS max_id FROM employee';

const INSERT_REFRESH_TOKEN = 'INSERT INTO refresh_token (customer_id,employee_id,agent_id,refresh_token,expires_at,user_agent,ip_address) VALUES(?,?,?,?,?,?,?)';

const DELETE_REFRESH_TOKEN = 'DELETE FROM refresh_token where refresh_token = ?';

const GET_CUSTOMER_POLICIES = 'SELECT * FROM policies WHERE customer_id = ? ORDER BY created_at DESC'
const GET_CUSTOMER_ACTIVE_POLICIES = "SELECT * FROM policies WHERE status = 'active' AND customer_id = ?   ORDER BY created_at DESC LIMIT 100"
const GET_COUNT_CUSTOMER_ACTIVE_POLICIES = `SELECT COUNT(*) as active_policies FROM policies WHERE status = 'active' AND customer_id = ? ORDER BY created_at DESC LIMIT 100`;
const GET_CUSTOMER_RENEWAL_POLICIES = "SELECT * FROM policies WHERE status = 'inactive' AND customer_id = ?   ORDER BY created_at DESC LIMIT 100"
const GET_COUNT_CUSTOMER_RENEWAL_POLICIES = `SELECT COUNT(*) as renewal_policies FROM policies WHERE status = 'inactive' AND customer_id = ? ORDER BY created_at DESC LIMIT 100`;

const GET_CUSTOMER_REGISTER_POLICIES = "SELECT * FROM register_claims JOIN policies ON policies.policy_number = register_claims.policy_number JOIN customers on customers.customer_id = policies.customer_id WHERE customers.customer_id = ? ORDER BY register_claims.created_date DESC LIMIT 100"

const GET_COUNT_CUSTOMER_REGISTER_POLICIES = `SELECT COUNT(*) as register_policies FROM register_claims JOIN policies ON policies.policy_number = register_claims.policy_number JOIN customers on customers.customer_id = policies.customer_id WHERE customers.customer_id = ? ORDER BY register_claims.created_date DESC LIMIT 100`


const GET_CUSTOMER_CLAIMS = 'SELECT * from customers JOIN policies ON customers.customer_id = policies.customer_id JOIN register_claims ON register_claims.policy_number = policies.policy_number  JOIN claims ON claims.register_claim_id = register_claims.register_claim_id WHERE customers.customer_id = ?  ORDER BY claims.created_at DESC';

const GET_APPROVED_CLAIMS = `SELECT * from customers JOIN policies ON customers.customer_id = policies.customer_id JOIN register_claims ON register_claims.policy_number = policies.policy_number  JOIN claims ON claims.register_claim_id = register_claims.register_claim_id WHERE customers.customer_id = ? AND claims.claim_status = 'Approved' ORDER BY claims.created_at DESC LIMIT 100`;

const GET_COUNT_CUSTOMER_APPROVED_CLAIMS = `SELECT COUNT(*) as approved_policies from customers JOIN policies ON customers.customer_id = policies.customer_id JOIN register_claims ON register_claims.policy_number = policies.policy_number  JOIN claims ON claims.register_claim_id = register_claims.register_claim_id WHERE customers.customer_id = ? AND claims.claim_status = 'Approved' ORDER BY claims.created_at DESC LIMIT 100`

const GET_POLICY_PAYMENT = 'SELECT payments.payment_id,payments.application_id,payments.amount,payments.payment_method,payments.payment_date,payments.status,payments.transaction_id,applications.product_type,payments.description,payments.created_at FROM payments JOIN applications ON payments.application_id = applications.application_id JOIN customers on applications.customer_id = customers.customer_id WHERE customers.customer_id = ? ORDER BY payments.created_at'

const REGISTER_CLAIM = 'INSERT INTO register_claims (register_claim_id,first_name,last_name,dob,gender,phone,email,address,city,state,pincode,policy_number,policy_type,policy_issue_date,claim_nature,incident_date,support_docs,description,additional_description) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

const INSERT_CLAIM = 'INSERT INTO claims (claim_id,register_claim_id,claim_date,description) values(?,?,?,?)';

const CREATE_POLICY = 'INSERT INTO policies (application_id, policy_number,policy_type,insured_name,insured_company,customer_id,agent_id,employee_id,start_date,end_date,premium_amount,coverage_amount,status,mode) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

const CUSTOMER_APPLICATION_QUEUE = 'SELECT * FROM applications WHERE customer_id = ? ORDER BY created_at DESC';

const CREATE_PAYMENT = "INSERT INTO payments(payment_id, policy_id, amount) VALUES(?,?,?)";
const UPDATE_PAYMENT = "UPDATE payments SET payment_date=?, payment_status=?, payment_mode=?,currency=? WHERE payment_id = ?";


// AGENT QUERIES
const GET_AGENT_CUSTOMERS = 'SELECT * FROM customers where refered_by_agent = ?';
const GET_AGENT_POLICIES = 'SELECT * FROM policies where  agent_id = ?'
const CREATE_AGENT_CUSTOMERS = 'INSERT INTO customers (customer_id,firstname,lastname,phone,email,dob,gender,address,state,city,pincode,country,marital_status,refered_by_agent) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'


// EMPLOYEE QUERIES
const GET_ALL_CUSTOMERS = 'SELECT * FROM customers order by customer_id desc';
const GET_ALL_AGENTS = 'SELECT * FROM agents order by agent_id desc'
const GET_ALL_EMPLOYEES = 'SELECT * FROM employees JOIN employee_roles ON employees.employee_id = employee_roles.employee_id join roles ON roles.role_id = employee_roles.role_id order by employees.employee_id desc'
const GET_ALL_CLAIMS = 'SELECT * FROM claims join register_claims on register_claims.register_claim_id = claims.register_claim_id';
const CREATE_NEW_EMPLOYEE = 'INSERT into employees (employee_id,firstname,lastname,phone,email,dob,gender,address,state,city,pincode,country,salary,joinedate,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
const CREATE_EMP_ROLE = 'INSERT INTO employee_roles (role_id,employee_id,reporting) VALUES(?,?,?)'


const combine = `START TRANSACTION;
INSERT into employees (employee_id,firstname,lastname,phone,email,dob,gender,address,state,city,pincode,country,salary,joinedate,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
INSERT INTO employee_roles (role_id,employee_id,reporting) VALUES(?,?,?)
COMMIT;`

const CREATE_ROLE = 'INSERT INTO roles (role_id,role_name,role_description,department,level) VALUES(?,?,?,?,?)'
const CREATE_PERMISSION = 'INSERT INTO permissions (permission_id,permission_name,permission_description) VALUES(?,?,?)';
const GET_ROLES = 'SELECT * FROM roles';
const GET_PERMISSIONS = 'SELECT * FROM permissions ORDER BY permission_name';
const GET_PERMISSION = 'SELECT permission_id, employee_role_id from role_permissions WHERE permission_id = ? AND employee_role_id= ?'
const ADD_PERMISSION = 'INSERT INTO role_permissions (permission_id, employee_role_id) VALUES(?,?)'
const DELETE_PERMISSION = 'DELETE FROM role_permissions WHERE permission_id = ? AND employee_role_id = ?'

const GET_EMPLOYEE_PERMISSIONS = 'SELECT employees.*,roles.department,roles.role_name, employee_roles.employee_role_id, COALESCE(JSON_ARRAYAGG(role_permissions.permission_id), JSON_ARRAY()) AS permissions FROM employees JOIN employee_roles ON employees.employee_id = employee_roles.employee_id JOIN roles on employee_roles.role_id = roles.role_id LEFT JOIN role_permissions ON employee_roles.employee_role_id = role_permissions.employee_role_id GROUP BY employees.employee_id, employee_roles.employee_role_id';

// errors
const INSERT_ERR_LOG = 'INSERT INTO ErrorLogs (ErrorMessage,ErrorType,Severity,ErrorSource,StackTrace,ErrorCode,UserID,IPAddress) VALUES(?,?,?,?,?,?,?,?)'
module.exports = {
    GET_CUSTOMER_PHONE,
    GET_CUSTOMER_DETAILS,
    GET_AGENT_PHONE, GET_EMPLOYEE_PHONE, CREATE_CUSTOMER, CREATE_EMPLOYEE, CREATE_AGENT,
    GET_CUSTOMER_MAX_ID,
    GET_AGENT_MAX_ID,
    GET_EMPLOYEE_MAX_ID,
    GET_CUSTOMER_ID,
    UPDATE_CUSTOMER_BY_ID,
    DELETE_CUSTOMER_BY_ID,
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
    UPDATE_PAYMENT,
    GET_CUSTOMER_ACTIVE_POLICIES,
    GET_CUSTOMER_RENEWAL_POLICIES,
    GET_CUSTOMER_REGISTER_POLICIES,
    CUSTOMER_APPLICATION_QUEUE,
    GET_AGENT_CUSTOMERS,
    GET_AGENT_POLICIES,
    CREATE_AGENT_CUSTOMERS,
    GET_ALL_AGENTS,
    GET_ALL_CUSTOMERS,
    GET_ALL_EMPLOYEES,
    GET_ALL_CLAIMS,
    CREATE_NEW_EMPLOYEE,
    CREATE_EMP_ROLE,
    CREATE_ROLE,
    CREATE_PERMISSION,
    GET_ROLES,
    GET_PERMISSIONS,
    ADD_PERMISSION,
    DELETE_PERMISSION,
    GET_PERMISSION,
    GET_EMPLOYEE_PERMISSIONS,
    INSERT_ERR_LOG,
    GET_APPROVED_CLAIMS,
    GET_COUNT_CUSTOMER_ACTIVE_POLICIES,
    GET_COUNT_CUSTOMER_RENEWAL_POLICIES,
    GET_COUNT_CUSTOMER_APPROVED_CLAIMS,
    GET_COUNT_CUSTOMER_REGISTER_POLICIES
}
