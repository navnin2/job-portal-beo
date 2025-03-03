const express = require('express')
const router = express.Router();
const jobControler = require("../controller/jobControler")
const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../middleware/fileUpload")

router.use(authMiddleware)
/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Upload a document for a job posting to a specific portal
 *     description: Uploads a document (PDF, DOC, DOCX) associated with a job posting.
 *     tags:
 *       - Jobs
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive, draft]
 *               portal_id:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Job created successfully
 */
router.post('/', jobControler.createJob);
/**
 * @swagger
 * /api/jobs/{id}/documents/{portalId}:
 *   post:
 *     summary: Upload a document for a job posting to a specific portal
 *     description: Uploads a document (PDF, DOC, DOCX) associated with a job posting.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: portalId
 *         required: true
 *         description: Portal ID where the document will be uploaded
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Document file (PDF, DOC, DOCX)
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *       400:
 *         description: Invalid file type or missing document
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If using JWT authentication
 */
router.post('/:id/documents/:portalId', upload.single("document"), jobControler.documentUplaod);
/**
 * @swagger
 * /api/jobs/add-summary/{timeframe}:
 *   get:
 *     summary: Get job summary statistics
 *     description: Retrieve job statistics for a given timeframe (week, month, or year).
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: timeframe
 *         required: true
 *         description: Timeframe for the summary (week, month, or year)
 *         schema:
 *           type: string
 *           enum: [week, month, year]
 *     responses:
 *       200:
 *         description: Successful response with job summary statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   add_count:
 *                     type: integer
 *                     description: Number of job postings added
 *                   closed_add:
 *                     type: integer
 *                     description: Number of job postings closed
 *                   published_add:
 *                     type: integer
 *                     description: Number of job postings published
 *                   drafted_add:
 *                     type: integer
 *                     description: Number of job postings drafted
 *       400:
 *         description: Invalid timeframe provided
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.get('/add-summary/:timeframe', jobControler.addSummary);
/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all job portals
 *     description: Retrieve a list of all job portals.
 *     tags:
 *       - Jobs
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of job portals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     description: Unique identifier for the job portal
 *                   title:
 *                     type: string
 *                     description: Job portal title
 *                   description:
 *                     type: string
 *                     description: Job portal description
 *                   status:
 *                     type: string
 *                     enum: [drafted, published, closed]
 *                     description: Status of the job portal
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time the job portal was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time the job portal was last updated
 *                   portal_id:
 *                     type: string
 *                     format: uuid
 *                     description: ID of the portal associated with the job
 *                   created_by:
 *                     type: string
 *                     format: uuid
 *                     description: User ID of the creator
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.get('/', jobControler.getJobs);
/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get a job portal by ID
 *     description: Retrieve details of a specific job portal by its unique ID.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the job portal
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successfully retrieved the job details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: Unique identifier for the job 
 *                 title:
 *                   type: string
 *                   description: Job  title
 *                 description:
 *                   type: string
 *                   description: Job  description
 *                 status:
 *                   type: string
 *                   enum: [drafted, published, closed]
 *                   description: Status of the job portal
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time the job  was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time the job  was last updated
 *                 portal_id:
 *                   type: string
 *                   format: uuid
 *                   description: ID of the portal associated with the job
 *                 created_by:
 *                   type: string
 *                   format: uuid
 *                   description: User ID of the creator
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.get('/:id', jobControler.getJobById);
/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update a job  by ID
 *     description: Update the details of a specific job  by its unique ID.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the job  to be updated
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Job  title
 *               description:
 *                 type: string
 *                 description: Job  description
 *               status:
 *                 type: string
 *                 enum: [drafted, published, closed]
 *                 description: Status of the job 
 *     responses:
 *       200:
 *         description: Successfully updated the job 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job updated successfully"
 *       400:
 *         description: Invalid request body or missing required fields
 *       404:
 *         description: Job  not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.put('/:id', jobControler.updateJob);
/**
 * @swagger
 * /api/jobs{id}:
 *   delete:
 *     summary: Delete a job  by ID
 *     description: Remove a specific job  by its unique ID.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the job  to be deleted
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successfully deleted the job 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job deleted successfully"
 *       404:
 *         description: Job  not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.delete('/:id', jobControler.deleteJob);

module.exports = router