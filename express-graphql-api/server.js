require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = process.env.PORT || 8080;

const TaskList = [];

// middlewares
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect('/gql');
});

app.use('/gql', graphqlHTTP({
    schema: buildSchema(`
        type Task{
            id: ID!
            description: String!
            finished: Boolean!
            date: String!
        }

        input TaskInput{
            description:String!
            finished:Boolean!
            date:String!
        }

        type RootQuery{
            task(id:ID!): Task!
            tasks(finished:Boolean): [Task!]!
        }

        type RootMutation{
            createTask(taskinput: TaskInput): Task
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    // resolver functions
    rootValue: {
        task: (args) => {
            if (args.hasOwnProperty('id')) {
                return TaskList.filter(e => args.id === e.id);
            } else {
                return [];
            }
        },
        tasks: (args) => {
            if (args.hasOwnProperty('finished')) {
                return TaskList.filter(e => args.finished === e.finished);
            } else {
                return TaskList;
            }
        },
        createTask: (args) => {
            const task = {
                id: Math.random().toString(),
                description: args.taskinput.description,
                finished: args.taskinput.finished,
                date: args.taskinput.date
            }
            TaskList.push(task);
            return task;
        }
    },
    graphiql: true

}));

// start server
app.listen(PORT, () => {
    console.log(`up and running >${PORT}<`)
})