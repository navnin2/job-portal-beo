const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const userCredentials = sequelize.define('user_credentials', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    password: { type: DataTypes.STRING, allowNull: false },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'user_credentials' });

module.exports = userCredentials;