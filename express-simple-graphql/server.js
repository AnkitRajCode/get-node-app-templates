require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
// const monogConnect = require('./config/dbconnect');

const app = express();
const PORT = process.env.PORT || 8080;

const EventsList = [];

// middlewares
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect('/gql');
});

app.use('/gql', graphqlHTTP({
    schema: buildSchema(`
        type Event{
            _id: ID!
            title:String!
            description:String!
            price:Float!
            date:String!
        }

        input EventInput{
            title:String!
            description:String!
            price:Float!
            date:String!
        }

        type RootQuery{
            events: [Event!]!
        }

        type RootMutation{
            createEvent(eventInput: EventInput): Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    // resolver functions
    rootValue: {
        events: () => {
            return EventsList;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            }
            EventsList.push(event);
            return event;
        }
    },
    graphiql: true

}));

/* mongoDB atlas clusterURL along with Username and password
example: 
const mongouser=process.env.MONGO_USER
const mongopass=process.env.MONGO_PASS
const clusterUrl = `mongodb+srv://${mongouser}:${mongopass}@cluster0.p3sq4.mongodb.net/myFirstDB?retryWrites=true&w=majorit`
*/
// const mongouser = process.env.MONGO_USER
// const mongopass = process.env.MONGO_PASS
// const clusterUrl = `...`;

// wait till it connects
// (async () => {
//     await monogConnect(clusterUrl);
// })();

// start server
app.listen(PORT, () => {
    console.log(`up and running >${PORT}<`)
})