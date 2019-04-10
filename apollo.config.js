module.exports = {
  client: {
    service: {
      name: 'gestion',
      url: 'http://localhost:3001/graphql'
      // localSchemaFile: './graphql/schema.json'
    },
    includes: ['./src/graphql/*.gql', './src/graphql/*.graphql']
  }
}
