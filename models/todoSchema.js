const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name:String
  });
  
  const todo = mongoose.model('ToDo', todoSchema);
  
  module.exports = todo;

