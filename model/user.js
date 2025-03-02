const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const userCredentials = require('../model/user_credentials')

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

User.hasOne(userCredentials, { foreignKey: 'user_id', as: 'userCredential', onDelete: 'CASCADE' });

module.exports = User;