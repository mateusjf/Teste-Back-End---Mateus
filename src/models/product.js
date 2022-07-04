const sequelize = require('../database/db')
const { DataTypes } = require('sequelize')

const User = require('./user')
const Category = require('./category')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Product, {
    constraints: true,
    foreignKey: 'user_id'
})

Category.hasMany(Product, {
    constraints: true,
    foreignKey: 'category_id'
})

module.exports = Product