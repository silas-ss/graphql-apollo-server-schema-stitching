const { Project } = require('./database');
const uuid = require('uuid-v4');

const resolvers = {
  Query: {
    findAllProjects () {
      return Project.findAll();
    },
    countProjects () {
      return Project.count();
    }
  },

  Mutation: {
    newProject (_, { name }) {
      const project = Project.create({ id: uuid(), name: name });
      return project;
    },
    deleteProject (_, { id }) {
      Project.destroy({ where: { id } });
      return id;
    },
    updateProject (_, { project }) {
      Project.update(project, { where: { id: project.id } });
      return project;
    }
  }
};

module.exports = resolvers;