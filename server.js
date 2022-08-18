import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from "cors"
import { errorHandler } from './middleware/errorMiddleware.js'
import postRoutes from './routes/postsRoutes.js'
import userRoutes from './routes/usersRoutes.js'

dotenv.config()

const PORT = process.env.PORT || 5000


const CONNECTION_URL = process.env.MONGODB_CONNECTION

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use(errorHandler)




