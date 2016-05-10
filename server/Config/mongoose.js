var mongoose = require('mongoose');
mongoose.set('debug', true);
var fs = require('fs');
var path = require('path');
var connect = mongoose.connect('mongodb://localhost/blog');
var models_path = path.join(__dirname, './../Models');
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
});
exports.mongooseData = {mongoose: mongoose, connect:connect};

//hello
