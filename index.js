const express = require('express')
const app = express()
const moragn = require('morgan')
const parser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const issue = require('./models/issues');
const port = 9000

//connecting to mongodb
const dbUrl='mongodb+srv://user:user@githubissue.iofo7.mongodb.net/githubissue?retryWrites=true&w=majority';

mongoose.connect(dbUrl,{useUnifiedTopology: true,useNewUrlParser: true})
.then((result)=>{
    console.log("connected to db")
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })
})
.catch((err)=>{
   console.log(err)
})




  //middlewires gooes here
app.use(moragn('tiny'))

//routes goes here



app.get('/api/issues/:id',(req,res)=>{
    issue.findById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
})


app.get('/api/issues', (req, res) => {

    issue.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      //res.send("not posted")
    });

})

app.post('/api/issues',(req,res)=>{
    res.send("posted")

    
})

app.patch('/api/issues/:id',(req,res)=>{
    res.send("edited")
})

app.delete('/api/issues/:id',(req,res)=>{
    const id = req.params.id;
  
  issue.findByIdAndDelete(id)
    .then(result => {
      res.redirect('/api/issues');
    })
    .catch(err => {
      console.log(err);
    });
})


app.use((req,res)=>{
    //res.status(404).send("sorry")
    res.redirect('/api/issues')
})




