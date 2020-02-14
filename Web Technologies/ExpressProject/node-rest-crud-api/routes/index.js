var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// connection configurations
var dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bhargav'
});
// connect to database
dbConn.connect(); 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Retrieve all users 
router.get('/users', function (req, res) {
  dbConn.query('SELECT * FROM users', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'users list.' });
  });
});

// Retrieve user with id 
router.get('/user/:id', function (req, res) {
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
router.post('/user', function (req, res) {
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
router.put('/user', function (req, res) {
  
  let user = req.body;
  if (!user.id || !user.name) {
    return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
  }
  dbConn.query("UPDATE users SET name = ? WHERE id = ?", [user.name, user.id], function (error, results) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
   });
  });

  //  Delete user
router.delete('/user', function (req, res) {
  let user_id = req.body.id;
  if (!user_id) {
      return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
  });
  }); 

module.exports = router;
