const express = require('express');
const authControler = require('../controller/authControler')
const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Login the user using email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: email
 *                 example: "ajay@yopmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eykjahdahsnkajshdnkasdhnkasjdhkjas"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "e48b2a45-5dfb-48a8-97f9-6146a04cda0d"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "ajay@yopmail.com"
 *                     first_name:
 *                       type: string
 *                       example: "ajay"
 *                     last_name:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-29T17:39:26.748Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-29T17:39:26.748Z"
 *                     userCredential:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: "83668b12-f3a2-4dea-903c-b1cf3f2dccfd"
 *                         password:
 *                           type: string
 *                           example: "$2b$10$TxWrLuyOLd3SpZ0iEFGP5Oj5Gr.DC/a254InkSE7I0c8dbhAl6bae"
 *                         user_id:
 *                           type: string
 *                           format: uuid
 *                           example: "e48b2a45-5dfb-48a8-97f9-6146a04cda0d"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-01-29T17:39:27.396Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-01-29T17:39:27.396Z"
 *       400:
 *         description: Invalid request (missing or incorrect email/password)
 *       401:
 *         description: Unauthorized (incorrect credentials)
 *       500:
 *         description: Internal server error
 */
router.post('/login', authControler.login)

module.exports = router