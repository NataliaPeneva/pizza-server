// Imports
const express = require("express")

const router = express.Router()
router.use(express.json())

const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const { toJWT } = require("../helpers")

// Endpoints

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
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

module.exports = router
