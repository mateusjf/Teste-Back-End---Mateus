const express = require('express')
const app = express()

app.use('/uploads', express.static(__dirname + '/uploads'))

const userRouter = require('./src/routes/user.js')
const categoryRouter = require('./src/routes/category.js')
const productRouter = require('./src/routes/product.js')
const imageRouter = require('./src/routes/image.js')

app.use(express.urlencoded( {extended: false} ))
app.use(express.json())

app.use('/', userRouter)
app.use('/', categoryRouter)
app.use('/', productRouter)
app.use('/', imageRouter)

module.exports = app