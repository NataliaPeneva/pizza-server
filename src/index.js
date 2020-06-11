// Imports
const express = require("express")
const cors = require("cors")

// Routes
const pizzaRouter = require("./routes/pizzaRoutes")
const servicesRouter = require("./routes/servicesRoutes")
const extrasRouter = require("./routes/extrasRoutes")
const authRouter = require("./routes/authRoutes")

const app = express()
const port = 3000

// Middleware
app.use(express.json())
app.use(cors())

app.use("/order", pizzaRouter)
app.use("/order", servicesRouter)
app.use("/order", extrasRouter)
app.use("/auth", authRouter)

// Server start
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
