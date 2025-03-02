const users = require('../model/user')
const userCredentials = require("../model/user_credentials")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require("dotenv").config();


const authControler = {
    // api to login for user using email and password
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            // populated userCredential as the password is stored in other table called userCredential
            const user = await users.findOne({ where: { email: username }, include: [{ model: userCredentials, as: 'userCredential' }], raw : true })
            if (!user) {
                return res.status(401).json({ error: 'Authatication failed' })
            }
            
            const matchPassword = await bcrypt.compare(password, user['userCredential.password'])
            if (!matchPassword) {
                return res.status(401).json({ error: 'Authatication failed' })
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.status(200).json({ token, user })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'login failed' })
        }
    }
}

module.exports = authControler