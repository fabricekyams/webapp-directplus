// Generated by CoffeeScript 1.4.0
var dsn, mongoose;

mongoose = require('mongoose');

dsn = "mongodb://localhost/test";

mongoose.connect(dsn, function(err) {
  if (err) {
    return console.log('Houston we have a probleme', err);
  } else {
    return console.log('it seems to be cool with ', mongoose);
  }
});
