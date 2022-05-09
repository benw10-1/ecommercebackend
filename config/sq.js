const sq = require("mysql2")
require('dotenv').config();

let db = sq.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    multipleStatements: true,
    database: ""
})

module.exports = db