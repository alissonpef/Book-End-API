require('dotenv').config()
const express = require('express')
const authRouter = require('./src/routes/auth')
const apiRouter = require('./src/routes/api')
const errorMiddleware = require('./src/middlewares/error-middleware')

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/api', apiRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}`))