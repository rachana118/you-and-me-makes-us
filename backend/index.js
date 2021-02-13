const express = require('express')
const bodyParser = require('body-parser')
const db = require('./server')
const port = 3000
const app = express()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/', (request, response) => {
    response.json({ message: 'Test!'})
})

app.listen(port, () => {
    console.log(`App is running on port ${port}.`)
})