var jwt = require('jwt-simple');
var getUser = require('./auth').getUser;
var config = require('../config/config');


module.exports = function(req, res, next) {

  // let's load in the values of the access token and the access key from our headers
  var token = req.headers['x-access-token'];
  var key = req.headers['x-key'];

  // let's check to see if user has valid token or key
  if (token || key) {
    try {
      var decoded = jwt.decode(token, config.jwtsecret);
      
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
      
      // Authorize the user for access
      getUser(key ,function (dbUser,err) { /** The key would be the logged in user's username */
          // this checks to make sure we get a user object
          if (dbUser) {
              next(); // user exists, move on
          } else {
            /**
             * No user with this name exists, respond back with a 401
             *(this error could also mean there was a problem retrieving the user object from the db)
             *
             */
            res.status(401);
            res.json({
              "status": 401,
              "message": "Invalid User"
            });
            return;
          }
      }); // end getUser()
  
    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Token Error."
      });
    }
  } else {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid Token or Key"
      });
    return;
  }
};
