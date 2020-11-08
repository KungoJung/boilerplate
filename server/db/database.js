// Can do some of this in a separate file
const Sequelize = require('sequelize')

// substitute boilermaker for the name of the database
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilermaker', {
  logging: false
})

module.exports = db
