const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const { playground, port } = require('./config');

const schema = require('./app.js');

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: playground,
  }),
);

app.listen(port);

console.log(`Api-gateway is running at ${port}`);
