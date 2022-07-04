const express = require('express')
const router = express.Router()
const multer = require('multer')

const controller = require('../controller/product.js')

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

router.get('/product', controller.findAll)

router.get('/product/:id', controller.findOne)

router.post('/product', upload.array('images', 5), controller.create)

router.put('/product', controller.update)

router.delete('/product', controller.delete)

module.exports = router