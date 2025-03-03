const express = require("express");
const portalControler = require('../controller/portalControler')
const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../middleware/fileUpload")
const router = express.Router();

router.use(authMiddleware)
/**
 * @swagger
 * /api/portals:
 *   post:
 *     summary: Create a new portal
 *     description: Create a new job portal with an optional logo upload.
 *     tags:
 *       - Portals
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the portal
 *                 example: "naukri"
 *               description:
 *                 type: string
 *                 description: Description of the portal
 *                 example: "This is a job portal"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 description: Status of the portal
 *                 example: "active"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 required: true
 *                 description: Optional logo image file upload
 *     responses:
 *       201:
 *         description: Successfully created the portal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 portal_id:
 *                   type: string
 *                   format: uuid
 *                   description: Unique identifier for the portal
 *                 portal_name:
 *                   type: string
 *                   description: Name of the portal
 *                 total_jobs_posted:
 *                   type: integer
 *                   description: Total number of jobs posted on this portal
 *                 last_posted_date:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   description: Date and time of the last job posted
 *                 jobs_last_week:
 *                   type: integer
 *                   description: Number of jobs posted in the last week
 *                 jobs_last_month:
 *                   type: integer
 *                   description: Number of jobs posted in the last month
 *                 jobs_last_year:
 *                   type: integer
 *                   description: Number of jobs posted in the last year
 *                 active_jobs:
 *                   type: integer
 *                   description: Number of currently active jobs
 *       400:
 *         description: Invalid input data or missing required fields
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.post('/', upload.single("logo"), portalControler.createPortal);
/**
 * @swagger
 * /api/portals/portal-usage-summary:
 *   get:
 *     summary: Get portal usage summary
 *     description: Retrieve a summary of job postings across different portals.
 *     tags:
 *       - Portals
 *     responses:
 *       200:
 *         description: Successfully retrieved the portal usage summary
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   portal_id:
 *                     type: string
 *                     format: uuid
 *                     description: Unique identifier of the portal
 *                   portal_name:
 *                     type: string
 *                     description: Name of the job portal
 *                   total_jobs_posted:
 *                     type: integer
 *                     description: Total number of jobs posted on this portal
 *                   last_posted_date:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                     description: Date and time of the last job posted on this portal
 *                   jobs_last_week:
 *                     type: integer
 *                     description: Number of jobs posted in the last week
 *                   jobs_last_month:
 *                     type: integer
 *                     description: Number of jobs posted in the last month
 *                   jobs_last_year:
 *                     type: integer
 *                     description: Number of jobs posted in the last year
 *                   active_jobs:
 *                     type: integer
 *                     description: Number of currently active job postings
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.get('/portal-usage-summary', portalControler.portalUsageSummary)
/**
 * @swagger
 * /api/portals:
 *   get:
 *     summary: Get all portals
 *     description: Retrieve a list of all portals.
 *     tags:
 *       - Portals
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of portals
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
 *                     description: Unique identifier for the portal
 *                   name:
 *                     type: string
 *                     description: Portal name
 *                   description:
 *                     type: string
 *                     description: Portal description
 *                   status:
 *                     type: string
 *                     enum: [active, inactive]
 *                     description: Status of the portal
 *                   logo_url:
 *                     type: string
 *                     nullable: true
 *                     description: URL of the portal's logo
 *                   logo_file_name:
 *                     type: string
 *                     nullable: true
 *                     description: File name of the uploaded logo
 *                   logo_file_size:
 *                     type: integer
 *                     nullable: true
 *                     description: File size of the uploaded logo (in bytes)
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time the portal was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time the portal was last updated
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.get('/', portalControler.getPortals);
/**
 * @swagger
 * /api/portals/{id}:
 *   get:
 *     summary: Get a portal by ID
 *     description: Retrieve details of a specific portal by its unique ID.
 *     tags:
 *       - Portals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the portal
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successfully retrieved the portal details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: Unique identifier for the portal
 *                 name:
 *                   type: string
 *                   description: Portal name
 *                 description:
 *                   type: string
 *                   description: Portal description
 *                 status:
 *                   type: string
 *                   enum: [active, inactive]
 *                   description: Status of the portal
 *                 logo_url:
 *                   type: string
 *                   nullable: true
 *                   description: URL of the portal's logo
 *                 logo_file_name:
 *                   type: string
 *                   nullable: true
 *                   description: File name of the uploaded logo
 *                 logo_file_size:
 *                   type: integer
 *                   nullable: true
 *                   description: File size of the uploaded logo (in bytes)
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time the portal was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time the portal was last updated
 *       404:
 *         description: Portal not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.get('/:id', portalControler.getPortalById);
/**
 * @swagger
 * /api/portels/{id}:
 *   put:
 *     summary: Update a portal by ID
 *     description: Update the details of a specific portal by its unique ID.
 *     tags:
 *       - Portals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the portal to be updated
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
 *               name:
 *                 type: string
 *                 description: Name of the portal
 *               description:
 *                 type: string
 *                 description: Portal description
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 description: Status of the portal
 *               logo_url:
 *                 type: string
 *                 nullable: true
 *                 description: URL of the portal's logo
 *               logo_file_name:
 *                 type: string
 *                 nullable: true
 *                 description: File name of the uploaded logo
 *               logo_file_size:
 *                 type: integer
 *                 nullable: true
 *                 description: File size of the uploaded logo (in bytes)
 *     responses:
 *       200:
 *         description: Successfully updated the portal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Portal updated successfully"
 *       400:
 *         description: Invalid request body or missing required fields
 *       404:
 *         description: Portal not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.put('/:id', portalControler.updatePortal);
/**
 * @swagger
 * /api/portels/{id}:
 *   delete:
 *     summary: Delete a job portal by ID
 *     description: Remove a specific job portal by its unique ID.
 *     tags:
 *       - Portals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the job portal to be deleted
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successfully deleted the job portal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Portal deleted successfully"
 *       404:
 *         description: Job portal not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: [] # If authentication is required
 */
router.delete('/:id', portalControler.deletePortal);

module.exports = router;