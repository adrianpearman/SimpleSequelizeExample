const Sequelize = require('sequelize')
const db = new Sequelize('createGig', 'postgres', 'REDbull45!', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

module.exports = db