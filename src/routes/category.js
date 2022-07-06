const express = require('express')
const router = express.Router()
const { autorization } = require('../utils/jwtToken')

const controller = require('../controller/category.js')

router.get('/category', controller.findAll)

router.get('/category/:id', controller.findOne)

router.post('/category', autorization, controller.create)

router.put('/category', autorization, controller.update)

router.delete('/category', autorization, controller.delete)

module.exports = router