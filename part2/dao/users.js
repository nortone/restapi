var bcrypt = require('bcrypt');
var User = require('../models/user');
var auth = require('../auth/auth');

var users = {

  getAll: function(req, res) {
    // let's load in the users key
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    if (key) {
      // let's see if this user is admin
      auth.isUserAdmin(key ,function (allow,err) {;// The key would be the logged in user's username
        if (allow) {
          User.find(function (err,users) {
            if (err) {
              console.log(err);
            } else {
              res.send(users);
            }
          });  
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
        }
      });
    } else {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid Credentials",
      });
    }
  },

  getOne: function(req, res) {
    var id = req.params.id;
    // let's load in the users key
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    if (key) {
      // let's see if this user is admin
      auth.isUserAdmin(key ,function (allow,err) {;// The key would be the logged in user's username
        if (allow) {
          User.findOne({ username: id }, function (err,user) {
            if (err) {
              console.log(err);
            } else {
              res.send(user);
            }
          });
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
        }
      });
    } else {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid Credentials",
      });
    }
  },

  create: function(req, res) {
    var body = req.body;
    // let's load in the users key
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    if (key) {
      // let's see if this user is admin
      auth.isUserAdmin(key ,function (allow,err) {;// The key would be the logged in user's username
        if (allow) {
          // we'll need to encrypt the password before we store it
          auth.encryptPass(body.password, function(hash) {
            var newuser = new User({
              username: body.username,
              password: hash,
              role: body.role
            });
            newuser.save(function(err,newuser) {
              if (err) {
                return console.error(err);
              } else {
                res.json(newuser);
              }
            });  
          });
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
        }
      });
    } else {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid Credentials",
      });
    }
  },

  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    // let's load in the users key
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    if (key) {
      // let's see if this user is admin
      auth.isUserAdmin(key ,function (allow,err) {;// The key would be the logged in user's username
        if (allow) {
          User.findOneAndUpdate({username:id},updateuser, function (err,user) {
            if (err) {
              console.log(err);
            } else {
              res.json(user);
            }
          });
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
        }
      });
    } else {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid Credentials",
      });
    }
  },

  delete: function(req, res) {
    var id = req.params.id;
    // let's load in the users key
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    if (key) {
      // let's see if this user is admin
      auth.isUserAdmin(key ,function (allow,err) {;// The key would be the logged in user's username
        if (allow) {
          User.remove({username:id}, function (err,user) {
            if (err) {
              console.log(err);
            } else {
              res.json(true);
            }
          });
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
        }
      });
    } else {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid Credentials",
      });
    }
  }
};

module.exports = users;
