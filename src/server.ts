import express, { Express } from 'express'
import { dbConnection } from './config/dbConnection'
import { applicationRoutes } from './routes/applicationRoutes'
import cors from 'cors'
import dotenv from 'dotenv'

const app: Express = express()
app.use(cors())
app.use(express.json())
dotenv.config()

const port = process.env.PORT || 3006

dbConnection()

app.use('/', applicationRoutes)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
