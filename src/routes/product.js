const express = require('express')
const router = express.Router()

const controller = require('../controller/product.js')

router.get('/product', controller.findAll)

router.get('/product/:id', controller.findOne)

router.post('/product', controller.create)

router.put('/product', controller.update)

router.delete('/product', controller.delete)

module.exports = router