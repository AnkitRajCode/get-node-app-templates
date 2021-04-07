require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use('/gql', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery{
            events: [String!]!,
        }

        type RootMutation{
            createEvent(name: String): String
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true

}));

// start server
app.listen(PORT, () => {
    console.log(`up and running >${PORT}<`)
})