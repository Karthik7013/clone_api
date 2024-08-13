// profiles
const newCeoProfile = {
    access: [""],
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
            path: "/employee/dashboard",
            icon: "trending_up",
        },
        {
            title: "Revenue",
            path: "/employee/dashboard/revenue",
            icon: "payments",
        },
        {
            title: "Sales",
            path: "/employee/dashboard/sales",
            icon: "sell",
        },
        {
            title: "Income",
            path: "/employee/dashboard/income",
            icon: "currency_rupee_circle",
        },
        {
            title: "Service",
            path: "/employee/dashboard/service",
            icon: "support_agent",
        },

        {
            title: "Employee Management",
            path: "/employee/dashboard/employee-management",
            icon: "supervisor_account",
        },
        {
            title: "Products",
            path: "/employee/dashboard/products",
            icon: "category",
        },
        {
            title: "Access",
            path: "/employee/dashboard/access-management",
            icon: "checklist_rtl",
        },
        {
            title: "Settings",
            path: "/employee/dashboard/settings",
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
            path: "/employee/dashboard/",
            icon: "supervisor_account",
        },
        {
            title: "Access",
            path: "/employee/dashboard/access-management",
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
            path: "/customer/dashboard/",
            icon: "space_dashboard",
        },
        {
            title: "My Policies",
            path: "/customer/dashboard/policies",
            icon: "description",
        },
        {
            title: "Policy Claims",
            path: "/customer/dashboard/claims",
            icon: "policy",
        },
        {
            title: "Register Claims",
            path: "/customer/dashboard/register-claims",
            icon: "edit_note",
        },
        {
            title: "Settings",
            path: "/customer/dashboard/settings",
            icon: "settings",
        },
        {
            title: "Helpline",
            path: "/customer/dashboard/help",
            icon: "call_quality",
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
            path: "/posp/dashboard/",
            icon: "checklist_rtl",
        },
        {
            title: "Study Material",
            path: "/posp/dashboard/study-material",
            icon: "menu_book",
        },

        {
            title: "Help-line",
            path: "/posp/dashboard/help",
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
            title: "Home",
            path: "/",
            icon: "home",
        },
        {
            title: "Dashboard",
            path: "/posp/dashboard/",
            icon: "space_dashboard",
        },
        {
            title: "Bookings",
            path: "/posp/dashboard/bookings",
            icon: "import_contacts",
        },
        {
            title: "Add Policy",
            path: "/posp/dashboard/add-policy",
            icon: "post_add",
        },
        {
            title: "Policy Claims",
            path: "/posp/dashboard/claims",
            icon: "policy",
        },
        {
            title: "Settings",
            path: "/posp/dashboard/settings",
            icon: "settings",
        },
        {
            title: "Help-line",
            path: "/posp/dashboard/help",
            icon: "help",
        },
    ],
    type: "posp",
};
module.exports = { newCeoProfile, newCustomerProfile, newPospProfile, newHrProfile, newPospProfilePending }