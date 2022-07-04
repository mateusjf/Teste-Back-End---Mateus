const sequelize = require('../database/db')
const { DataTypes } = require('sequelize')

const Image = sequelize.define('Images', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Image