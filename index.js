
import  dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import passport from './middleware/auth.js'
import expressRouter from './routes/authRoutes.js'
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRoute.js'
import connecteDB from './config/db.js'
const app =express()
const PORT=  process.env.PORT || 3000
connecteDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use('/api/v1/product', productRouter)
app.use('/api/v1/category',categoryRouter)
app.use(expressRouter)

app.listen(PORT, console.log(`The server is running in ${process.env.NODE_ENV} on  ${PORT}`))