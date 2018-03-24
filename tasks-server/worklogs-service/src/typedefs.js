const typeDefs = `
	type Query {
  	findAllWorklogs(taskId: String!): [Worklog]!
  }

  type Mutation {
  	newWorklog(worklog: WorklogInput!): Worklog!
    deleteWorklog(id: String!): String!
    updateWorklog(worklog: WorklogInput): Worklog!
  }

  type Worklog {
    id: String!
    description: String!
    hours: Float!
    date: Date!
    taskId: String!
  }

  input WorklogInput {
    id: String
    description: String!
    hours: Float!
    date: Date!
    taskId: String!
  }

  type Schema {
    query: Query
    mutation: Mutation
  }

  scalar Date
`;

module.exports = typeDefs;