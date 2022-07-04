const express = require('express')
const app = express()

const userRouter = require('./src/routes/user.js')
const categoryRouter = require('./src/routes/category.js')
const productRouter = require('./src/routes/product.js')

app.use(express.urlencoded( {extended: false} ))
app.use(express.json())

app.use('/', userRouter)
app.use('/', categoryRouter)
app.use('/', productRouter)

module.exports = app