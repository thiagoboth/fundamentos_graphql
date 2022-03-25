import 'reflect-metadata';

import path from 'path';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './src/resolvers/UserResolver';

async function main() {
 const schema = await buildSchema({
     // resolvers são como controllers no REST, como as rotas da aplicação. 
     resolvers: [
         UserResolver,
     ],
     // emitSchemaFile é onde eu quero salvar o arquivo de schema do graphql;
     emitSchemaFile: path.resolve(__dirname, 'schema.gql')
 })

 const server = new ApolloServer({
     schema,
 })

 const { url } = await server.listen();

 console.log(`Server running on ${url}`);
}

main();