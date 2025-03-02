const express = require('express')
const portalRoutes = require('./routes/portal')
const userRoutes = require('./routes/user')
const authRoutes = require("./routes/auth")
const jobRoutes = require("./routes/job")
require("dotenv").config();
const swagger = require('./config/swagger')

const app = express()
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/portals", portalRoutes);
app.use('/users', userRoutes);
app.use("/api/jobs", jobRoutes)

swagger(app)
const port = process.env.PORT
app.listen(port, () => {
    console.log('server start')
})