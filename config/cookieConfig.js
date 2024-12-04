const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'PRODUCTION', // Use secure cookies in production
    secure: false, // Use secure cookies in production
    sameSite: 'None', // Allow cross-origin requests to include the cookie
    maxAge: 3600000, // Set max age (1 hour in milliseconds)
}


export { cookieConfig }