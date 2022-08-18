const dotenv = require('dotenv').config({ path: './.env' });
module.exports = {
    APP_PORT: process.env.APP_PORT,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    GARAGE_REMOTE_BASE_URL: process.env.GARAGE_REMOTE_BASE_URL,
    ALLOWED_USERS: process.env.ALLOWED_USERS.split(' ')
}
