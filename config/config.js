require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET 
const MONGO_URI = process.env.MONGO_URI 
const Admin_role = "668a87bdd73a9dd9b2a2042a"

module.exports = {
    JWT_SECRET,
    MONGO_URI,
    Admin_role
}