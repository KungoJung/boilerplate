const db = require("./database")

// define or require all Sequelize models here, if they are defined in separate files
const User = require("./User")

// Establish associations between models

// export database and all models
module.exports = {
  db,
  User
}
