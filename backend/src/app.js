import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import noteRouter from './routes/note.route.js'
import profileRouter from './routes/profile.route.js'
import feedbackRouter from './routes/feedback.route.js'
import {CLIENT_URL} from './config/config.js'

// in app.js — add this middleware

const app = express()

// middlewares
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({limit: '5mb', extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = [
            CLIENT_URL
        ]
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))

// routes
app.use('/api/auth', authRouter)
app.use('/api/notes', noteRouter)
app.use('/api/profile', profileRouter)
app.use('/api/feedback', feedbackRouter)


app.get('/', (req, res) => {

    res.send('Server is running')
    
}) 

export default app