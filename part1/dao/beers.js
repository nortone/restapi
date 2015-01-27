var Beer = require('../models/beer');
var beers = {

  getAll: function(req, res) {
    Beer.find(function (err,beers) {
      if (err) {
        console.log(err);
      } else {
        res.send(beers);
      }
    });
  },

  getOne: function(req, res) {
    var id = req.params.id;
    Beer.findOne({ beerid: id }, function (err,beer) {
      if (err) {
        console.log(err);
      } else {
        if (beer) {
          res.send(beer);
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  },

  create: function(req, res) {
    var body = req.body;
    Beer.findOne({ beerid: body.beerid }, function (err,beer) {
      if (err) {
        console.log(err);
      } else {
        if (beer) {
          res.status(409);
          res.json({
            "status": 409,
            "message": "Beer already exists."
          });
        } else {
          var newBeer = new Beer({
            beerid: body.beerid,
            beername: body.beername,
            brewery: body.brewery,
            abv: body.abv,
            year: body.year,
            cellardate: body.cellardate,
            style: body.style,
            description: body.description,
            notes: body.notes,
            total: body.total
          });
          newBeer.save(function(err,newBeer) {
            if (err) {
              return console.error(err);
            } else {
              res.json(newBeer);
            }
          });
        }
      }
    });
  },

  update: function(req, res) {
    var body = req.body;
    var id = req.params.id;
    
    Beer.findOne({ beerid: id }, function (err,beer) {
      if (err) {
        console.log(err);
      } else {
        if (beer) {
          Beer.findOneAndUpdate({beerid:id},body, function (err,updatedbeer) {
            if (err) {
              console.log(err);
            } else {
              res.json(updatedbeer);
            }
          });
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
    
  },

  delete: function(req, res) {
    var id = req.params.id;
    Beer.findOne({ beerid: id }, function (err,beer) {
      if (err) {
        console.log(err);
      } else {
        if (beer) {
          Beer.remove({beerid: id}, function (err,beer) {
            if (err) {
              console.log(err);
            } else {
              // normally we would return a 'true' or 'false' to our client, but let's output a status
              // for illustration purposes
              res.status(200);
              res.json({
                "status": 200,
                "message": "delete of " + id + " succeeded."
              });
            }
          });
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  }
};

module.exports = beers;
