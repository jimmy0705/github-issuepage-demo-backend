const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
   
    title:{
        type: String,
        require:true
    },
    status:{
        type: Boolean,
        require:true
    },
    createdBy:{
        type: String,
        require:true
    },
    body:{
        type: String,
        require:true
    }
    


},{timestamps:true});


const issue = mongoose.model('issue',issueSchema)

module.exports= issue;