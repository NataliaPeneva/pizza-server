// Imports
const express = require("express")
const cors = require("cors")
const User = require("./models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const secret = "aljfaohhgbv'pFWH"

const toJWT = (data) => {
  return jwt.sign(data, secret, { expiresIn: "1d" })
}

const toData = (token) => {
  return jwt.verify(token, secret)
}

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
  try {
    const username = req.body.username
    const password = req.body.password

    const isExistingUser = await User.findOne({ where: { username } })

    if (
      isExistingUser &&
      isExistingUser.dataValues &&
      isExistingUser.dataValues.id
    ) {
      return res.send({ warning: "Username already exists. Please log in." })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const isCreatedUser = await User.create({
      username,
      password: hashedPassword,
    })

    if (!isCreatedUser) {
      return res.send({ error: "Saving a new user is unsuccessful." })
    }

    return res.send({ success: "Saving a new user is successful." })
  } catch (error) {
    return res.send({ error })
  }
})

app.post("/login", async (req, res) => {
  try {
    const registeredUserUsername = req.body.username
    const password = req.body.password

    const isExistingUser = await User.findOne({
      where: { username: registeredUserUsername },
    })

    if (
      !isExistingUser &&
      !isExistingUser.dataValues &&
      !isExistingUser.dataValues.id
    ) {
      return res.send({ warning: "The username is not registered." })
    }

    const hashedPass = isExistingUser.dataValues.password
    const userId = isExistingUser.dataValues.id

    // compare incoming password with hashed password.
    if (bcrypt.compareSync(password, hashedPass)) {
      // if password is correct => make a jwt token and return to client.
      const token = toJWT({ userId })
      return res.send({ success: token })
    }
    // if password is wrong, return an error.
    return res.send({ error: "You are not authorised for this endpoint." })
  } catch (error) {
    return res.send({ error })
  }
})

// Server start
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)

// DONE authregister component
// DONE authlogin component

// DONE both class, both local state, local state has username and pass. Functions: handleChange, handleSubmit
// DONE in the render: display 2 text field components - 1 username and 1 password. display a submit button.

//???? import both components in App.jsx. Add to routing with respective names: "/auth/register" and "/auth/login"
// DONE connect both components to redux with the connect function on the bottom

// in the actions file create 2 thunk functions: authRegisterAction and authLoginAction, and 2 const for the action types: AUTH_REGISTER and AUTH_LOGIN

// in the reducer make a new reducer function for authReducer
