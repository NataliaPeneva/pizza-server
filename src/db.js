const Sequelize = require("sequelize")

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://MyPostgresUser:MyPostgresPassword@0.0.0.0:5432/postgres"

const sequelize = new Sequelize(connectionString)

sequelize
  .sync()
  .then(() => {
    console.log("Success")
  })
  .catch((error) => {
    console.log(error)
  })

module.exports = sequelize
