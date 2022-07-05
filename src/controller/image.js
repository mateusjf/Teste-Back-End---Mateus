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
                image: []
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
            const newImage = {
                filename: req.file.filename,
                path: req.file.path,
                product_id: req.body.product_id
            }

            
            const [image, created] = await Image.findOrCreate({
                where: { filename: newImage.filename },
                defaults: newImage
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

    async update(req, res) {
        try {
            const image = await Image.findByPk(req.body.id)
            if (image) {
                const keys = Object.keys(req.body)
                keys.forEach(columnName => {
                    if (columnName !== 'id') {
                        image[columnName] = req.body[columnName]
                    }
                })
                image.updatedAt = new Date()

                const result = await image.save()

                const response = {
                    message: 'Imagem atualizada!',
                    image: result,
                    status: 201
                }

                res.status(201).json(response)
            }

            res.status(404).json({
                message: 'Não foi possível encontrar uma imagem com esse nome',
                status: 404,
                imagem: []
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
            const image = await Image.findByPk(req.body.id)
            if (image) {
                await image.destroy()

                return res.status(201).json({
                    message: 'Image deletada!',
                    status: 201,
                })
            }

            res.status(404).json({
                message: 'Não foi possível encontrar uma imagem com esse id',
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