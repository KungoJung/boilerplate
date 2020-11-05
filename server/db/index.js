// Can do some of this in a separate file
const Sequelize = require('sequelize')

// substitute boilermaker for the name of the database
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilermaker', {
  logging: false
})

// define or require all Sequelize models here, if they are defined in separate files
const ExampleModel = db.define("example-model", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// Establish associations between models

// export database and all models
module.exports = {
  db,
  ExampleModel
}
