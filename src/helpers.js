const jwt = require("jsonwebtoken")

const secret = "aljfaohhgbv'pFWH"

const toJWT = (data) => {
  return jwt.sign(data, secret, { expiresIn: "1d" })
}

const toData = (token) => {
  return jwt.verify(token, secret)
}

module.exports = { toData, toJWT }
