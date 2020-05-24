// Imports
const express = require("express")
const cors = require("cors")

// import modules from resources.js. Destructure them in the import itself, instead of fist assigning them to a variable and only after that destructure them.
const {
  pizzaBase,
  pizzaSauce,
  pizzaTopping,
  extras,
  services,
} = require("./resources")

const app = express()
const port = 3000

// Middleware
app.use(express.json())
app.use(cors())

// Endpoints
app.get("/pizza", (req, res) => {
  return res.send({ pizzaBase, pizzaSauce, pizzaTopping })
})

// Server start
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
