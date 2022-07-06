const express = require('express')
const router = express.Router()

const controller = require('../controller/user.js')

router.get('/user', controller.findAll)

router.get('/user/:id', controller.findOne)

router.post('/user', controller.create)

router.put('/user', controller.update)

router.delete('/user', controller.delete)

router.post('/user/authentication', controller.authentication)

module.exports = router