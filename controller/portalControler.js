const Portal = require("../model/portel");
const sequelize = require('../config/db');

const PortalControler = {
    // Create Portal
    createPortal: async (req, res) => {
        try {
            const { name, description, status } = req.body;
            const file = req.file
            const newPortal = await Portal.create({ name, description, status, logo_url: file.path, logo_file_name: file.filename, logo_file_size: file.size });
            res.status(201).json(newPortal);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    },

    // Get All Portals
    getPortals: async (req, res) => {
        try {
            const portals = await Portal.findAll();
            res.status(200).json(portals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get Single Portal
    getPortalById: async (req, res) => {
        try {
            const portal = await Portal.findByPk(req.params.id);
            if (!portal) return res.status(404).json({ error: 'Portal not found' });
            res.status(200).json(portal);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update Portal
    updatePortal: async (req, res) => {
        try {
            const { name, description, status } = req.body;
            const portal = await Portal.findByPk(req.params.id);
            if (!portal) return res.status(404).json({ error: 'Portal not found' });

            await portal.update({ name, description, status });
            res.status(200).json(portal);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete Portal
    deletePortal: async (req, res) => {
        try {
            const portal = await Portal.findByPk(req.params.id);
            if (!portal) return res.status(404).json({ error: 'Portal not found' });

            await portal.destroy();
            res.status(200).json({ message: 'Portal deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //summary of the portal posting there job.
    // thi sis basic summary it cann done as the client requiremnt 
    portalUsageSummary: async (req, res) => {
        try {
            const portalSql = `SELECT 
            j.portal_id,
            jp.name as portal_name,
            COUNT(j.id) AS total_jobs_posted,
            MAX(j.createdAt) AS last_posted_date,
            SUM(CASE WHEN j.createdAt >= DATEADD(DAY, -7, GETDATE()) THEN 1 ELSE 0 END) AS jobs_last_week,
            SUM(CASE WHEN j.createdAt >= DATEADD(DAY, -30, GETDATE()) THEN 1 ELSE 0 END) AS jobs_last_month,
            SUM(CASE WHEN j.createdAt >= DATEADD(DAY, -365, GETDATE()) THEN 1 ELSE 0 END) AS jobs_last_year,
            SUM(CASE WHEN j.status = 'active' THEN 1 ELSE 0 END) AS active_jobs
            FROM Jobs j
            LEFT JOIN job_portals jp ON jp.id = j.portal_id
            GROUP BY j.portal_id, jp.name
            ORDER BY total_jobs_posted DESC;`

            const portal = await sequelize.query(portalSql, { type: sequelize.QueryTypes.SELECT })
            if (!portal) return res.status(404).json({ error: 'Portal not found' });
            res.status(200).json({ portal });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PortalControler