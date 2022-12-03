const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/helloworld', (req, res) => {
    res.send('hello world')
  })

app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})

app.get('/api/notes', (req, res) => {
    res.sendFile('.', options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
  })