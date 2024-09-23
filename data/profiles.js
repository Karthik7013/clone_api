// profiles
const newCeoProfile = {
    department: "backend",
    dob: "23-09-2022",
    empId: "EMP4834789398",
    firstname: "Karthik",
    lastname: "Tumala",
    gender: "Male",
    joinDate: "29-09-2023",
    sideProps: [
        {
            title: "Analytics",
            path: "analytics",
            icon: "trending_up",
        },
        {
            title: "Revenue",
            path: "revenue",
            icon: "payments",
        },
        {
            title: "Sales",
            path: "sales",
            icon: "sell",
        },
        {
            title: "Income",
            path: "income",
            icon: "currency_rupee_circle",
        },
        {
            title: "Service",
            path: "service",
            icon: "support_agent",
        },

        {
            title: "Employee Management",
            path: "employee-management",
            icon: "supervisor_account",
        },
        {
            title: "Agent Management",
            path: "agent-management",
            icon: "supervisor_account",
        },
        {
            title: "Products",
            path: "products",
            icon: "category",
        },
        {
            title: "Access",
            path: "access-management",
            icon: "checklist_rtl",
        },
        {
            title: "Settings",
            path: "settings",
            icon: "settings",
        },
    ],
    menuProps: [
        {
            icon: "home",
            path: "/",
            title: "Home",
        },
        {
            icon: "account_circle",
            path: "/",
            title: "Profile",
        },
        {
            icon: "settings_account_box",
            path: "/",
            title: "My Account",
        },
    ],
    role: "ceo",
    type: "employee",
};
const newHrProfile = {
    access: [""],
    department: "hiring",
    dob: "11-02-1999",
    empId: "EMP84983478979",
    firstname: "Mia",
    lastname: "Khalifa",
    gender: "Female",
    joinDate: "23-09-2023",
    menuProps: [],
    sideProps: [
        {
            title: "Employee Management",
            path: "employee-management",
            icon: "supervisor_account",
        },
        {
            title: "Access",
            path: "access-management",
            icon: "checklist_rtl",
        },
    ],
    role: "hr",
    type: "employee",
};
const newCustomerProfile = {
    custId: "CUST789294837370",
    dob: "26-11-1999",
    firstname: "karthik",
    lastname: "tumala",
    type: "customer",
    gender: "Male",
    sideProps: [
        {
            title: "Dashboard",
            path: "home",
            icon: "space_dashboard",
            link: ""
        },
        {
            title: "My Policies",
            path: "policies",
            icon: "description",
            link: ""
        },
        {
            title: "Policy Claims",
            path: "claims",
            icon: "policy",
            link: ""
        },
        {
            title: "Register Claims",
            path: "register-claims",
            icon: "edit_note",
            link: ""
        },
        {
            title: "Settings",
            path: "settings",
            icon: "settings",
            link: ""
        },
        {
            title: "Helpline",
            path: "help",
            icon: "call_quality",
            link: ""
        },
    ],
    menuProps: [
        {
            icon: "home",
            path: "/",
            title: "Home",
        },
    ],
};
const newPospProfilePending = {
    dob: "27-09-1999",
    exam: false,
    firstname: "Ravi",
    lastname: "Yar",
    gender: "Male",
    joinDate: "03-09-1997",
    menuProps: [],
    pospId: "POSP3452928094",
    sideProps: [
        {
            title: "Examination",
            path: "examination",
            icon: "checklist_rtl",
        },
        {
            title: "Study Material",
            path: "study-material",
            icon: "menu_book",
        },

        {
            title: "Help-line",
            path: "help",
            icon: "help",
        },
    ],
    type: "posp",
};
const newPospProfile = {
    dob: "27-09-1999",
    exam: true,
    firstname: "Ravi",
    lastname: "Yar",
    gender: "Male",
    joinDate: "03-09-1997",
    menuProps: [],
    pospId: "POSP3452928094",
    sideProps: [
        {
            title: "Overview",
            path: "overview",
            icon: "query_stats",
        },
        {
            title: "Bookings",
            path: "bookings",
            icon: "import_contacts",
        },
        {
            title: "Add Policy",
            path: "add-policy",
            icon: "post_add",
        },
        {
            title: "Policy Claims",
            path: "/dashboard/claims",
            icon: "policy",
        },
        {
            title: "Settings",
            path: "settings",
            icon: "settings",
        },
        {
            title: "Help-line",
            path: "help",
            icon: "help",
        },
    ],
    type: "posp",
};
module.exports = { newCeoProfile, newCustomerProfile, newPospProfile, newHrProfile, newPospProfilePending }