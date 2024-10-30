const emailRegex = {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    format: 'example@example.com',
    rules: [
        {
            description: 'Must contain one "@" symbol.',
            example: 'user@example.com'
        },
        {
            description: 'Must contain at least one period (.) after the "@" symbol.',
            example: 'user@example.com'
        },
        {
            description: 'Cannot contain spaces or special characters except for ".", "@", and "_".',
            example: 'user.name@example.com'
        },
        {
            description: 'Domain name must not be empty and should consist of valid characters.',
            example: 'user@domain.com'
        }
    ]
};
const phoneRegex = {
    pattern: /^(?:\+91[-.\s]?)?[789]\d{9}$/,
    format: 'e.g., 9876543210 or +91 9876543210',
    rules: [
        {
            description: 'Must be a 10-digit mobile number.',
            example: '9876543210'
        },
        {
            description: 'Must start with 7, 8, or 9.',
            example: '9876543210'
        },
        {
            description: 'Country code (+91) is optional and can be followed by a space, dash, or dot.',
            example: '+91 9876543210 or +91-9876543210'
        }
    ]
}

const nameRegex = {
    pattern:'',
    format:'',
    rules:[

    ]
}