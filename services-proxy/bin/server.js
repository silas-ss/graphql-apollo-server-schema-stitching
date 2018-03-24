const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeRemoteExecutableSchema, mergeSchemas, introspectSchema } = require('graphql-tools');
const { createApolloFetch } = require('apollo-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createHttpLink } = require('apollo-link-http');
const fetcth = require('node-fetch');

const linkSchemaDefs = require('../src/linkschema');
const linkResolvers = require('../src/linkresolvers');

async function run () {
  try {
    const createRemoteSchema = async (uri) => {
      const fetcher = createHttpLink({ uri, fetch });
      return makeRemoteExecutableSchema({
        schema: await introspectSchema(fetcher),
        link: fetcher
      });
    };

    const projectSchema = await createRemoteSchema('http://localhost:5001/graphql');
    const taskSchema = await createRemoteSchema('http://localhost:5002/graphql');
    const worklogSchema = await createRemoteSchema('http://localhost:5003/graphql');
    
    const schema = mergeSchemas({ 
      schemas: [projectSchema, taskSchema, worklogSchema, linkSchemaDefs],
      resolvers: linkResolvers
    });

    const app = express();
    app.use(cors());
    
    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

    app.use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: '/graphql',
      }),
    );

    app.listen(5000);
    console.log('Escutando em http://localhost:5000/graphql');
  } catch (e) {
    console.error(e);
  }
  
}


run();
