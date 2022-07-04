const req = require('express/lib/request')
const database = require('../database/db.js')
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
            const [category, created] = await Category.findOrCreate({
                where: { name: req.body.name},
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

    async update() {

    },

    async delete() {

    }
}