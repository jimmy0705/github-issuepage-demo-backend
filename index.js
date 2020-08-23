const express = require('express')
const app = express()
const moragn = require('morgan')
const port = 9000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

app.use(moragn('tiny'))

app.get('/api/issues', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/issues',(req,res)=>{
    res.send("posted")
})

app.patch('/api/issues/:id',(req,res)=>{
    res.send("edited")
})

app.delete('/api/issues/:id',(req,res)=>{
    res.send("deleted")
})


app.use((req,res)=>{
    //res.status(404).send("sorry")
    res.redirect('/api/issues')
})




