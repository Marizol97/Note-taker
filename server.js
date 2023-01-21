const express = require('express')
const uniqid = require('uniqid')
const fs = require('fs')
const allNotes = require('./db.json')

const app = express()
const port = 3000

app.use(express.static(__dirname + "/public"))
app.use(express.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/helloworld', (req, res) => {
    res.send('hello world')
  })

app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  }); 


app.get('/notes', function(req, res){
  res.sendFile(__dirname + '/notes.html');
});

app.get('/api/notes', function(req, res) {
  res.send(allNotes.notes)
})

//Route to save new notes
app.post('/api/notes', function(req, res) {
  //Get the body of the request, which MUST BE a new note with title and text
  const newNote = req.body

  newNote['id'] = uniqid()
  allNotes.notes.push(newNote)

  fs.writeFileSync('./db.json',
    JSON.stringify({'notes': allNotes.notes})
  )

  res.json(newNote)
})

app.delete('/api/notes/:id', function (req, res) {
  const deleteId = req.params.id

  const noteToDelete = allNotes.notes.find((note) => {
    return note.id == deleteId
  })

  const indexToDelete = allNotes.notes.indexOf(noteToDelete)

  if (indexToDelete == -1 || noteToDelete == undefined || noteToDelete == null) {
    res.json(true)
    return
  }

  allNotes.notes.splice(indexToDelete,1);


  fs.writeFileSync('./db.json',
  JSON.stringify({'notes': allNotes.notes})
)

  res.json(true)
})
