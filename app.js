const express = require('express')
const portalRoutes = require('./routes/portal')
const userRoutes = require('./routes/user')
const authRoutes = require("./routes/auth")
const jobRoutes = require("./routes/job")
const swagger = require('./config/swagger')
const { cleanUp, analyticsTask } = require("./cron/cleanupSummary")
require("dotenv").config();

const app = express()
app.use(express.json());

cleanUp.start()
analyticsTask.start()
app.use("/api/auth", authRoutes)
app.use("/api/portals", portalRoutes);
app.use('/users', userRoutes);
app.use("/api/jobs", jobRoutes)

swagger(app)
const port = process.env.PORT
app.listen(port, () => {
    console.log('server start')
})