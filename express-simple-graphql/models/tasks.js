const mongoose = require('mongoose')
const Schema=mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        reqired: true
    },
    description:{
        type:String,
        reqired: false
    },
    finished:{
        type: Boolean,
        defaut: false
    }
});

mongoose.model(taskSchema);