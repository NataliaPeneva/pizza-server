const express = require("express")
const auth = require("../auth")

// import modules from resources.js. Destructure them in the import itself, instead of fist assigning them to a variable and only after that destructure them.
const { extras } = require("../resources")

const router = express.Router()
router.use(express.json())

router.get("/extras", auth, (req, res) => {
  return res.send({ extras })
})

module.exports = router
