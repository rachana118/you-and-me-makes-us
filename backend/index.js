const express = require('express')
const bodyParser = require('body-parser')
const db = require('./server')
const port =  process.env.PORT || 3001 
const app = express()
const cors = require('cors')

//allow OPTIONS on all resources
app.options('*', cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// Handling CORS
app.use(function(req, res, next) {
    console.log('test')
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

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