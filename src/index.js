// Imports
const express = require("express")
const cors = require("cors")
const User = require("./models/userModel")

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
  return res.send({ pizza: [...pizzaBase, ...pizzaSauce, ...pizzaTopping] })
})
app.get("/extras", (req, res) => {
  return res.send({ extras })
})
app.get("/services", (req, res) => {
  return res.send({ services })
})
app.post("/register", async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  try {
    const user = await User.create({ username, password })
    if (!user) {
      return res.send("Saving a new user is unsuccessful.")
    }
    // console.log("user????", user.dataValues)
    return res.send({ success: "Saving a new user is successful." })
  } catch (error) {
    return res.send("Saving a new user is unsuccessful.")
  }
})

// Server start
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
