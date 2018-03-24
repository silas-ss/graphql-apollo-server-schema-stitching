const linkSchemaDefs = `
  extend type Project {
    tasks: [Task]!
  }

  extend type Task {
    worklogs: [Worklog]!
  }
`;

module.exports = linkSchemaDefs