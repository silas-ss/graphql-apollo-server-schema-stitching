const typeDefs = `
	type Query {
  	findAllProjects: [Project]!
  	countProjects: Int!
  }

  type Mutation {
  	newProject(name: String!): Project!
  	deleteProject(id: String!): String!
  	updateProject(project: ProjectInput!): Project!
  }

	type Project {
  	id: String!
  	name: String!
  }

  input ProjectInput {
  	id: String!
  	name: String!
  }

  type Schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;