const express = require('express')
const bodyParser = require('body-parser')
const db = require('./server')
const port = 3001
const app = express()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/post', db.getPosts)
app.post('/create', db.createPost)
app.get('/drop/:tableName', db.dropTable)
app.post('/login', db.loginUser)
app.get('/users', db.getUsers)
app.get('/table/:tableName', db.createTable)
app.post('/adduser', db.registerUser)

app.get('/', (request, response) => {
    response.json({ message: 'Test!'})
})

app.listen(port, () => {
    console.log(`App is running on port ${port}.`)
})