const express = require('express')
const router = express.Router()

const controller = require('../controller/image.js')

//TODAS AS IMAGENS DO PRODUTO
router.get('/images/product/:product_id', controller.findAll)

//UMA IMAGEM ESPECIFICA DE ACORDO COM A URL
router.get('/images/product/uploads/:filename', controller.findOne)

router.post('/images/', controller.create)

//UMa imagem especifica de acordo com a url
router.put('/images/:path', controller.update)

//UMa imagem especifica de acordo com a url
router.delete('/images/:path', controller.delete)

module.exports = router