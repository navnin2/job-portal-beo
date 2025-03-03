const Job = require("../model/job")
const job_documents = require('../model/jobDocuments')
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { Op } = require("sequelize");
const moment = require("moment");

const JobControler = {
    // Create Job
    createJob: async (req, res) => {
        try {
            const { title, description, status, portal_id } = req.body;
            console.log(req.user)
            const newPortal = await Job.create({ title, description, status, portal_id, created_by: req.user.userId });
            res.status(201).json(newPortal);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    },

    // Get All Job
    getJobs: async (req, res) => {
        try {
            const portals = await Job.findAll();
            res.status(200).json(portals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get Single Job
    getJobById: async (req, res) => {
        try {
            const portal = await Job.findByPk(req.params.id);
            if (!portal) return res.status(404).json({ error: 'Portal not found' });
            res.status(200).json(portal);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update Job
    updateJob: async (req, res) => {
        try {
            const { name, description, status } = req.body;
            const portal = await Job.findByPk(req.params.id);
            if (!portal) return res.status(404).json({ error: 'Portal not found' });

            await portal.update({ name, description, status });
            res.status(200).json(portal);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete Job
    deleteJob: async (req, res) => {
        try {
            const portal = await Job.findByPk(req.params.id);
            if (!portal) return res.status(404).json({ error: 'Portal not found' });

            await portal.destroy();
            res.status(200).json({ message: 'Portal deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //uplaod the douments on of the job
    documentUplaod: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            }

            const ext = req.file.originalname.split('.').pop();
            let extractedText = '';

            if (ext === 'pdf') {
                //featching the data from the file for pdf
                const dataBuffer = fs.readFileSync(req.file.path);
                const pdfData = await pdfParse(dataBuffer);
                extractedText = pdfData.text;
            } else if (ext === 'docx' || ext === 'doc') {
                //featching the data from the file for doc and docx
                const docxData = await mammoth.extractRawText({ path: req.file.path });
                extractedText = docxData.value;
            } else {
                return res.status(400).json({ success: false, message: 'Unsupported file format' });
            }
            const formattedText = extractedText.replace(/\s+/g, ' ').replace(/\n{2,}/g, '\n').trim();
            const data = {
                file_size: req.file.size,
                file_name: req.file.originalname,
                file_type: ext,
                file_url: req.file.path,
                extracted_text: formattedText,
                job_id: req.params.id,
                portal_id: req.params.portalId
            }
            const job_document = await job_documents.create(data);
            res.status(201).json(job_document);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    },

    //summary of teh job posted based on time line like week, year and month
    addSummary: async (req, res) => {
        try {
            const { timeframe } = req.params;
            let startDate

            //checking the time line is correct
            if (!["year", "month", "week"].includes(timeframe)) {
                return res.status(400).json({ error: "Invalid timeframe. Use 'year', 'month', or 'week'." });
            }

            //get the start date based on the time line
            switch (timeframe) {
                case "year":
                    startDate = moment().startOf("year").toDate();
                    break;

                case "month":
                    startDate = moment().startOf("month").toDate();
                    break;

                case "week":
                    startDate = moment().startOf("week").toDate();
                    break;

                default:
                    return res.status(400).json({ error: "Invalid timeframe." });
            }
            //geting data beased on the time line start date
            const jobs = await Job.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: startDate,
                    },
                },
                raw: true
            })
            if (!jobs) return res.status(404).json({ error: 'No job found' });

            // seeting up job summary and providing the count to admin about the job post
            // it can be update based on the client requrement thi sis just a baisc
            const data = {
                add_count: jobs.length,
                closed_add: jobs.filter(job => job.status === 'closed').length,
                published_add: jobs.filter(job => job.status === 'published').length,
                drafted_add: jobs.filter(job => job.status === 'draft').length
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = JobControler