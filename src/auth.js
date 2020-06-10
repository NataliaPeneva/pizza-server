const User = require("./models/userModel")
const { toData } = require("./helpers")

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const authHeaderSplit = authHeader.split(" ")

    const token = authHeaderSplit[1]
    const jwtData = toData(token)

    const userId = jwtData.userId
    const user = await User.findByPk(userId)

    if (!user || !user.dataValues) {
      return res.send({ error: "User is not authenticated" })
    }

    next()
  } catch (error) {
    return res.send({ error: "User is not authenticated" })
  }
}

module.exports = auth
