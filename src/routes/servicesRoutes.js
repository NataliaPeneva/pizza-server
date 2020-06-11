const express = require("express")
const auth = require("../auth")

// import modules from resources.js. Destructure them in the import itself, instead of fist assigning them to a variable and only after that destructure them.
const { services } = require("../resources")

const router = express.Router()
router.use(express.json())

router.get("/services", auth, (req, res) => {
  return res.send({ services })
})

module.exports = router
