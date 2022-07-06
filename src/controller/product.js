const Product = require('../models/product.js')
const Image = require('../models/image.js')


asyncSaveDatabase = (newImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Image.create(newImage)
            resolve(result)
        } catch (error) {
            throw error
        }
    })
}

module.exports = {
    async findAll(req, res) {
        try {
            const allObjects = await Product.findAll()
            const response = {
                status: 200,
                objects: allObjects
            }

            res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({
                error: error,
                status: 500
            })
        }
    },

    async findOne(req, res) {
        try {
            const { id } = req.params
            const result = await Product.findByPk(id)

            if (result) {
                response = {
                    status: 200,
                    product: result
                }

                res.status(200).json(response)
            }

            res.status(404).json({
                message: 'Não foi possível encontrar o produto com esse id',
                status: 404,
                product: []
            })

        } catch (error) {
            return res.status(500).json({
                error: error,
                status: 500
            })
        }
    },

    async create(req, res) {
        try {
            req.body.user_id = req.user.id

            const [product, created] = await Product.findOrCreate({
                where: { name: req.body.name },
                defaults: req.body
            });

            if (created) {
                const response = {
                    message: 'Produto cadastrado!',
                    product,
                    status: 201
                }

                if (req.files) {
                    const images = req.files.map(image => {
                        const newImage = {
                            filename: image.filename,
                            path: image.path,
                            product_id: product.id
                        }

                        return asyncSaveDatabase(newImage)
                    })

                    await Promise.all(images)
                }
                return res.status(201).json(response)
            }

            res.status(400).json({
                message: 'Já existe um produto cadastrado com esse nome. Por favor, insira outro nome.',
                status: 400,
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message,
                status: 500
            })
        }
    },

    async update(req, res) {
        try {
            const product = await Product.findByPk(req.body.id)
            if (product) {
                const keys = Object.keys(req.body)
                keys.forEach(columnName => {
                    if (columnName !== 'id') {
                        product[columnName] = req.body[columnName]
                    }
                })
                product.updatedAt = new Date()

                const result = await product.save()

                const response = {
                    message: 'Produto atualizado!',
                    product: result,
                    status: 201
                }

                res.status(201).json(response)
            }

            res.status(404).json({
                message: 'Não foi possível encontrar um produto com esse id',
                status: 404,
                product: []
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message,
                status: 500
            })
        }
    },

    async delete(req, res) {
        try {
            const product = await Product.findByPk(req.body.id)
            if (product) {
                await product.destroy()

                return res.status(201).json({
                    message: 'Produto deletado!',
                    status: 201,
                })
            }

            res.status(404).json({
                message: 'Não foi possível encontrar um produto com esse id',
                status: 404,
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message,
                status: 500
            })
        }
    }
}