var async = require('async');
var { Pool } = require('pg');
const dotenv = require('dotenv')
dotenv.config()

var config = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    ssl: {
        ca: '',
        key: '',
        cert: ''
    }
};

const pool = new Pool(config);

const createTable = (request, response) => {
    pool.query("CREATE TABLE users (id int, email varchar(255), password varchar(255), hashtag varchar(255));", (err, result) => {
        if(err) {
            throw err
        }
        response.status(200).json(result.rows)
    })
}

const registerUser = (request, response) => {
    pool.query("INSERT INTO users (id, email, password, hashtag) VALUES (1, 'devarsh@gmail.com', 'test@123', '#LetsWin');", (err, result) => {
        if(err) {
            throw err
        }
        response.status(200).json(result.rows)
    })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if(err) {
            throw err
        }
        response.status(200).json(result.rows)
    })
}

module.exports = {
  getUsers, createTable, registerUser
}