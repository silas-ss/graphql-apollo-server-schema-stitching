const typeDefs = `
	type Query {
    findAllTasks(projectId: String!): [Task]!
  }

  type Mutation {
    newTask(task: TaskInput!): Task!
    deleteTask(id: String!): String!
    updateTask(task: TaskInput): Task!
  }

  type Task {
    id: String!
    title: String!
    description: String!
    projectId: String!
  }

  input TaskInput {
    id: String
    title: String!
    description: String!
    projectId: String!
  }

  type Schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;