const app = require('../src/app');

const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloEngine } = require('apollo-engine');
const cors = require('cors');

const typeDefs = require('../src/typedefs');
const resolvers = require('../src/resolvers');


const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ 
  schema,
  tracing: true,
  cacheControl: true
}));

const engine = new ApolloEngine({
  apiKey: 'service:silas-ss-1884:mFUeBSZcMRnRcxBBLDvTlQ'
});

engine.listen({
  port: 5003,
  expressApp: app
});