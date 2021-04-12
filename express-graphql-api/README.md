# Express Graphql App

Simple expree

## Modules used:

`nodemon`,`express`,`express-graphql`,`graphql`

## Run server

- with nodemon: `npm run dev`

- without nodemon: `npm run start`

## Example Usage

- mutation

to create a new Task

```graphql
mutation{
    createTask(taskInput:{description:"demo task",finished:false,date:"12/12/12"}){
        id
        description
        finished
        date
    }
}
```

- query

to list all the tasks

```graphql
query{
    tasks{
        id
        description
        finished
        date
    }
}
```
or

to list all unfinished tasks

```graphql
query{
    tasks(finished:false){
        id
        description
        finished
        date
    }
}

```
