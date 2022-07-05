const Category = require('../models/category.js')

module.exports = {
    async findAll(req, res) {
        try {
            const allObjects = await Category.findAll()
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
            const result = await Category.findByPk(id)

            if (result) {
                response = {
                    status: 200,
                    category: result
                }

                res.status(200).json(response)
            }

            res.status(404).json({
                message: 'Categoria não encontrada!',
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
            const [category, created] = await Category.findOrCreate({
                where: { name: req.body.name },
                defaults: req.body
            });

            if (created) {
                const response = {
                    message: 'Categoria cadastrada!',
                    category,
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
            const category = await Category.findByPk(req.body.id)
            if (category) {
                const keys = Object.keys(req.body)
                keys.forEach(columnName => {
                    if (columnName !== 'id') {
                        category[columnName] = req.body[columnName]
                    }
                })
                category.updatedAt = new Date()

                const result = await category.save()

                const response = {
                    message: 'Categoria atualizada!',
                    category: result,
                    status: 201
                }

                res.status(201).json(response)
            }

            res.status(404).json({
                message: 'Não foi possível encontrar uma categoria com esse id',
                status: 404,
                category: []
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
            const category = await Category.findByPk(req.body.id)
            if (category) {
                await category.destroy()

                return res.status(201).json({
                    message: 'Produto deletado!',
                    status: 201,
                })
            }

            res.status(404).json({
                message: 'Não foi possível encontrar uma categoria com esse id',
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