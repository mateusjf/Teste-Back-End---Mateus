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
                message: 'Usuário não encontrado',
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

    async update(req, res) {
        try {
            const user = await User.findByPk(req.body.id)
            if (user) {
                const keys = Object.keys(req.body)
                keys.forEach(columnName => {
                    if (columnName !== 'id') {
                        user[columnName] = req.body[columnName]
                    }
                })
                user.updatedAt = new Date()

                const result = await user.save()

                const response = {
                    message: 'Usuário atualizado!',
                    user: result,
                    status: 201
                }

                res.status(201).json(response)
            }

            res.status(404).json({
                message: 'Não foi possível encontrar o produto com esse id',
                status: 404,
                user: []
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
            const user = await User.findByPk(req.body.id)
            if (user) {
                await User.destroy()

                return res.status(201).json({
                    message: 'Usuário deletado!',
                    status: 201,
                })
            }

            res.status(404).json({
                message: 'Não foi possível encontrar um usuário com esse id',
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