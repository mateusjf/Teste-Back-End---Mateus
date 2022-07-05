const express = require('express')
const router = express.Router()
const multer = require('multer')

const controller = require('../controller/image.js')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true)
    }
    callback(null, false)
  }
})

const upload = multer({storage})

//TODAS AS IMAGENS DO PRODUTO
router.get('/images/product/:product_id', controller.findAll)

//UMA IMAGEM ESPECIFICA DE ACORDO COM A URL
router.get('/images/product/uploads/:filename', controller.findOne)

router.post('/images/product', upload.single('images'), controller.create)

//UMa imagem especifica de acordo com a url
router.put('/images/product/uploads/:filename', controller.update)

//UMa imagem especifica de acordo com a url
router.delete('/images/product/uploads/:filename', controller.delete)

module.exports = router