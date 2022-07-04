const database = require('../database/db.js')
const User = require('../models/user.js')

module.exports = {
    async findAll(req, res) {
        try {
            const allObjects = await User.findAll()
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
            const result = await User.findByPk(id)

            if (result) {
                response = {
                    status: 200,
                    user: result
                }

                res.status(200).json(response)
            }

            res.status(404).json({
                message: 'Object not found!',
                status: 404,
                user: []
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
            const [user, created] = await User.findOrCreate({
                where: { email: req.body.email },
                defaults: req.body
            });

            if (created) {
                const response = {
                    message: 'Usuário cadastrado!',
                    user,
                    status: 201
                }

                return res.status(201).json(response)
            }

            res.status(400).json({
                message: 'Já existe um usuário cadastrado com esse email. Por favor, insira outro email.',
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