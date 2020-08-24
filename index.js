const express = require('express')
const app = express()
const moragn = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const issue = require('./models/issues');
//const port = 9000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

//connecting to mongodb
const dbUrl='mongodb+srv://user:user@githubissue.iofo7.mongodb.net/githubissue?retryWrites=true&w=majority';

mongoose.connect(dbUrl,{useUnifiedTopology: true,useNewUrlParser: true})
.then((result)=>{
    console.log("connected to db")
    app.listen(process.env.port || 9000, () => {
        console.log(`server is running`)
      })
})
.catch((err)=>{
   console.log(err)
})




  //middlewires gooes here


//app.use(express.urlencoded({ extended: true }));
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
   // console.log(req.query.offset);
   // console.log(issue.find( { status: false } ));
    issue.find()
    .then(result => {
      res.send(result);
      //res.redirect('/api/issues');
    })
    .catch(err => {
      console.log(err);
      //res.send("not posted")
    });

})

app.post('/api/issues',(req,res)=>{
   // res.send("posted")
   console.log(req.body.issueData);

  //res.send(req.body)

   const Issue = new issue({
    title: req.body.issueData.title,
    status: false,
    createdBy:req.body.issueData.createdBy,
    body: req.body.issueData.body

  })

  Issue.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      //res.send("not posted")
    });

    
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




