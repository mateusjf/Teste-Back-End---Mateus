const express = require('express')
const router = express.Router()

const controller = require('../controller/category.js')

router.get('/category', controller.findAll)

router.get('/category/:id', controller.findOne)

router.post('/category', controller.create)

router.put('/category', controller.update)

router.delete('/category', controller.delete)

module.exports = router