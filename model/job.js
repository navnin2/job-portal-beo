
const { DataTypes } = require('sequelize');
const JobPortals = require("../model/portel")
const sequelize = require('../config/db');

const Job = sequelize.define('Jobs', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('draft', 'published', 'closed'), defaultValue: 'draft' },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    portal_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Portals', key: 'id' }
    },
    created_by: { type: DataTypes.UUID, allowNull: false }
});

module.exports = Job;