const { v4: uuidv4 } = require('uuid');
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
    const table = request.params.tableName;
    console.log(table)
    if(table === 'users') {
        console.log('USERS')
        pool.query("CREATE TABLE users (id varchar(255), email varchar(255), password varchar(255), hashtag varchar(255));", (err, result) => {
            if(err) {
                throw err
            }
            response.status(200).json({message: 'User Table Created!'})
        })
    }
    else if(table === 'posts') {
        console.log('POSTS')
        pool.query("CREATE TABLE posts (id varchar(255), timestamp varchar(255), caption varchar(255), photo varchar(500000));", (err, result) => {
            if(err) {
                throw err
            }
            response.status(200).json({message: 'Posts Table Created!'})
        })
    }
}

const dropTable = (request, response) => {
    const table = request.params.tableName;
    console.log(table)
    pool.query(`DROP TABLE ${table}`, (err, result) => {
        if(err) {
            throw err
        }
        response.status(200).json({ message: `Table ${table} drop.`})
    })
}

const createPost = (request, response) => {
    const id = request.form.id;
    const timestamp = Date.now()
    const caption = request.form.caption
    // const image = request.files
    console.log(id, caption)
    // pool.query(`INSERT INTO users (id, timestamp, caption, image) VALUES ('${id}', '${timestamp}', '${caption}', '${image}');`, (err, result) => {
    //     if(err) {
    //         throw err
    //     }
    //     response.status(200).json({ message: 'Post Created!'})
    // })
}

const loginUser = (request, response) => {
    const email = request.body.email
    const password = request.body.password
    pool.query(`SELECT * from users WHERE email='${email}'`, (err, result) => {
        if(err) {
            throw err
        }
        if(result.rows[0].password===password) {
            response.status(200).json({auth: true, userID: result.rows[0].id})
        } else {
            response.status(200).json({auth: false})
        }
    })
}

const registerUser = (request, response) => {
    const id = uuidv4();
    const email = request.body.email
    const password = request.body.password
    const hashtag = request.body.hashtag
    console.log(id, email, password, hashtag)
    pool.query(`INSERT INTO users (id, email, password, hashtag) VALUES ('${id}', '${email}', '${password}', '${hashtag}');`, (err, result) => {
        if(err) {
            throw err
        }
        response.status(200).json({ message: 'User Created!'})
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

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts', (err, result) => {
        if(err) {
            throw err
        }
        response.status(200).json(result.rows)
    })
}

module.exports = {
  getUsers, createTable, registerUser, dropTable, loginUser, createPost, getPosts
}