const database = require('../database/db.js')
const Product = require('../models/product.js')

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
                message: 'Object not found!',
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

                return res.status(201).json(response)
            }

            res.status(400).json({
                message: 'Já existe um produto cadastrado com esse nome. Por favor, insira outro nome.',
                status: 400,
            })
        } catch (error) {
            return res.status(500).json({
                error: error,
                status: 500
            })
        }
    },

    async update() {

    },

    async delete() {

    }
}