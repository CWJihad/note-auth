import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET
const CLIENT_URL = process.env.CLIENT_URL
const BACKEND_URL = process.env.BACKEND_URL
const NODE_ENV = process.env.NODE_ENV
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL
const BREVO_API_KEY = process.env.BREVO_API_KEY
const MAIL_FROM = process.env.MAIL_FROM

if (!PORT) {
    throw new Error("PORT is not defined");
}
if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}
if (!MAIL_USER) {
    throw new Error("MAIL_USER is not defined");
}
if (!MAIL_PASS) {
    throw new Error("MAIL_PASS is not defined");
}
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
if (!CLIENT_URL) {
    throw new Error("CLIENT_URL is not defined");
}
if (!BACKEND_URL) {
    throw new Error("BACKEND_URL is not defined");
}
if (!NODE_ENV) {
    throw new Error("NODE_ENV is not defined");
}
if (!RECEIVER_EMAIL) {
    throw new Error("RECEIVER_EMAIL is not defined");
}
if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not defined");
}
if (!MAIL_FROM) {
    throw new Error("MAIL_FROM is not defined");
}



export {
    PORT,
    MONGO_URI,
    MAIL_USER,
    MAIL_PASS,
    JWT_SECRET,
    CLIENT_URL,
    BACKEND_URL,
    NODE_ENV,
    RECEIVER_EMAIL,
    BREVO_API_KEY,
    MAIL_FROM
}