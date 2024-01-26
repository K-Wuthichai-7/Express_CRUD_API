var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// var cors = require('cors')
const mysql = require('mysql2');




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



// app.use(cors())
// app.use(express.json())

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb',
});

connection.connect(function (err, connection) {
    if (err) {
        console.log(err)
    } else {
        console.log("Connect complete..")
    }
})



app.get('/users', function (req, res, next) {
    // A simple SELECT query
    connection.query(
        'SELECT * FROM `users` ',
        function (err, results) {
            res.json(results)
            console.log(results); // results contains rows returned by server

        }
    );
})

app.get('/users/:id', function (req, res, next) {
    const id = req.params.id;

    // Using placeholders
    connection.query(
        'SELECT * FROM `users` WHERE `id` = ?',
        [id],
        function (err, results) {
            const data = results;
            res.json(data);
            console.log(data)
        }
    );
});


app.post('/users', function (req, res, next) {

    const id = req.body.id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username
    const password = req.body.password
    const avatar = req.body.avatar

    connection.query(
        'INSERT INTO `users` (`id`, `fname`, `lname`, `username`, `password`, `avatar`) VALUES (?,?, ?, ?, ?, ?)',
        [id, fname, lname, username, password, avatar],
        function (err, results) {
            res.json(results);


        }
    );

})


app.put('/users', function (req, res, next) {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username
    const password = req.body.password
    const avatar = req.body.avatar
    const id = req.body.id

    connection.query(
        'UPDATE `users`  SET `fname`= ? ,`lname`= ?, `username`= ? ,`password`=? ,`avatar`= ? WHERE id = ?',
        [fname, lname, username, password, avatar, id],
        function (err, results) {
            res.json(results);
            console.log(results);


        }
    );

})


app.delete('/users', function (req, res, next) {
    console.log(req.url)
    const id = req.body.id
    connection.query(
        'DELETE FROM `users`  WHERE id = ?',
        [id],
        function (err, results) {
            res.json(results);
            console.log(results);
        }
    );

})

app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
})