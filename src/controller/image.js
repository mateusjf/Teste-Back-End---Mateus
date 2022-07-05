const Image = require('../models/image.js')

module.exports = {
    async findAll(req, res) {
        try {
            const allObjects = await Image.findAll({
                where: {
                    product_id: req.params.product_id
                }
            })
            const response = {
                status: 200,
                images: allObjects
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
            const { filename } = req.params
            const result = await Image.findOne({
                where: {
                    filename
                }
            })

            if (result) {
                response = {
                    status: 200,
                    image: result
                }

                res.status(200).json(response)
            }

            res.status(404).json({
                message: 'Object not found!',
                status: 404,
                category: []
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
            const [image, created] = await Image.findOrCreate({
                where: { filename: req.body.filename },
                defaults: req.body
            });

            if (created) {
                const response = {
                    message: 'Imagem cadastrada!',
                    image,
                    status: 201
                }

                return res.status(201).json(response)
            }

            res.status(400).json({
                message: 'Já existe uma categoria cadastrada com esse nome. Por favor, insira outro nome.',
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