const Sequelize = require('sequelize');

const sequelize = new Sequelize('research', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

const Project = sequelize.define("project", {
  id: { type: Sequelize.UUID, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false }
});

module.exports = {
  db: [sequelize],
  Project
};