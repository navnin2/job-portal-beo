const express = require('express');
const authControler = require('../controller/authControler')
const router = express.Router();

router.post('/login', authControler.login)

module.exports = router