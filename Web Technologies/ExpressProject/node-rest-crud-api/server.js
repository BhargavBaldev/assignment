var mysql = require('mysql');
var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));
 // default route
 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });
 // set port
 app.listen(3050, function () {
     console.log('Node app is running on port 3050');
 });
 module.exports = app;

 // connection configurations
 var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bhargav'
});
// connect to database
dbConn.connect(); 

// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

// Retrieve user with id 
app.get('/user/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
     return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'users list.' });
    });
});

// Add a new user  
app.post('/user', function (req, res) {
    let user = req.body;
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
      }
    dbConn.query("INSERT INTO users (name,email,created_at) VALUES (?,?,?) ",  [user.name,user.email,user.created_at], function (error, results, fields) {
        if (error) throw error;
          return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
          });
 
});

//  Update user with id
app.put('/user', function (req, res) {
    
    let user = req.body;
    if (!user.id || !user.name) {
      return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
    dbConn.query("UPDATE users SET name = ? WHERE id = ?", [user.name, user.id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
     });
    });

    //  Delete user
 app.delete('/user', function (req, res) {
    let user_id = req.body.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
    }); 
