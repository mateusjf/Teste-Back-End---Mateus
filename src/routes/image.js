const express = require('express')
const router = express.Router()
const multer = require('multer')
const { autorization } = require('../utils/jwtToken')

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

router.get('/images/product/:product_id', controller.findAll)

router.get('/images/product/uploads/:filename', controller.findOne)

router.post('/images/product', upload.single('images'), autorization, controller.create)

router.put('/images/product/uploads/:filename', autorization, controller.update)

router.delete('/images/product/uploads/:filename', autorization, controller.delete)

module.exports = router