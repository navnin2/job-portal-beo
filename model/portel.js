const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Job = require("../model/job")

const JobPortals = sequelize.define('job_portals', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
    logo_url: { type: DataTypes.STRING },
    logo_file_name: { type: DataTypes.STRING },
    logo_file_size: { type: DataTypes.NUMBER },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

JobPortals.hasMany(Job, { foreignKey: 'portal_id', as: 'job', onDelete: 'CASCADE' })

module.exports = JobPortals