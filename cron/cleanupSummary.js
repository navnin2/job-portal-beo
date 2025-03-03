const cron = require('node-cron');
const Jobs = require("../model/job")
const moment = require("moment");
const sendEmail = require("../config/smtp")

//At 01:00 on day-of-month 1.
const cleanUp = cron.schedule('0 1 1 * *', async () => {
    let lastDate = moment().subtract(30, 'days').calendar();
    await Jobs.delete({
        where: {
            craetedAt: {
                [Op.lte]: lastDate
            },
            status: 'closed'
        }
    })
});

const analyticsTask = cron.schedule('0 1 * * 1', async () => {
    const portalSql = `SELECT 
    j.portal_id,
    COUNT(j.id) AS total_jobs_posted,
    MAX(j.createdAt) AS last_posted_date,
    SUM(CASE WHEN j.createdAt >= DATEADD(DAY, -7, GETDATE()) THEN 1 ELSE 0 END) AS jobs_last_week,
    SUM(CASE WHEN j.status = 'active' THEN 1 ELSE 0 END) AS active_jobs
    FROM Jobs j
    GROUP BY j.portal_id
    ORDER BY total_jobs_posted DESC;`

    const portal = await sequelize.query(portalSql, { type: sequelize.QueryTypes.SELECT })
    try {
        await sendEmail(email, "Weekly Analysit of job Portals", "analysit", { tableData: portal });

        console.log("Email sent successfully!")
    } catch (error) {
        console.log("Email sending failed!");
    }

})



module.exports = { cleanUp, analyticsTask }