import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import orderRouter from './routers/orderRouter.js'
import uploadRouter from './routers/uploadRouter.js'

dotenv.config() //para que acepte las variables en .env

const app = express()
app.use(morgan('short'))

app.use(express.json()) //para convertir el body de una peticion a json
app.use(express.urlencoded({ extended: true }))
// 'mongodb://localhost/amazona', {}

mongoose.connect(process.env.MONGODB_URL),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  } //'mongodb://localhost/amazona'
const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/uploads', uploadRouter)
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.get('/', (req, res) => {
  res.send('server is ready')
})
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server at http: localhost:${port}`)
})
