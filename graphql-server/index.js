const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql(fs.readFileSync("./schema.grapql", { encoding: 'utf8'}));
const resolvers = require('./resolvers');
const server = new ApolloServer({typeDefs, resolvers});

server.listen({port: 5000}).then(({url}) => console.log(`Server is running at ${url}`));