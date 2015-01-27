var mongoose = require('mongoose');

var beerSchema = mongoose.Schema({
  beerid: String,
  beer: String,
  brewery: String,
  abv: String,
  year: String,
  cellardate: Date,
  style: String,
  description: String,
  notes: String,
  total: Number
});

module.exports = mongoose.model('Beer', beerSchema);
