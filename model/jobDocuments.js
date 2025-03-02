const { DataTypes } = require('sequelize');
const Job = require("../model/job")
const Portal = require("../model/portel")
const sequelize = require('../config/db');

const JobDocument = sequelize.define('job_documents', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    job_id: { type: DataTypes.UUID, allowNull: false },
    portal_id: { type: DataTypes.UUID, allowNull: false },
    file_url: { type: DataTypes.STRING, allowNull: false },
    file_type: { type: DataTypes.STRING, allowNull: false },
    file_name: { type: DataTypes.STRING, allowNull: false },
    file_size: { type: DataTypes.NUMBER },
    extracted_text: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

JobDocument.belongsTo(Job, { foreignKey: 'job_id', as: "job", onDelete: 'CASCADE' });
JobDocument.belongsTo(Portal, { foreignKey: 'portal_id', as: "Portal", onDelete: 'CASCADE' });

module.exports = JobDocument;