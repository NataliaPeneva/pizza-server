// Imports
const express = require("express")
const auth = require("../auth")

// import modules from resources.js. Destructure them in the import itself, instead of fist assigning them to a variable and only after that destructure them.
const { pizzaBase, pizzaSauce, pizzaTopping } = require("../resources")

const router = express.Router()
router.use(express.json())

//   Endpoint
router.get("/pizza", auth, (req, res) => {
  return res.send({ pizza: [...pizzaBase, ...pizzaSauce, ...pizzaTopping] })
})

module.exports = router
