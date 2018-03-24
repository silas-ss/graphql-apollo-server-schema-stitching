const Sequelize = require('sequelize');

const sequelize = new Sequelize('tasks', 'root', 'toor', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

const Task = sequelize.define("task", {
  id: { type: Sequelize.UUID, primaryKey: true },
  title: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: true },
  projectId: { type: Sequelize.UUID, allowNull: false }
});

module.exports = {
  db: [sequelize],
  Task
};