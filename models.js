'use strict';

const mongoose = require('mongoose');

// this is my schema to represent a new recipe post
const newRecipeSchema = mongoose.Schema({
  title: {type: String, required: true},
  type: {type: String, required: true},
  content: {type: String, required: true},
  calories: {type: Number},
  author: {
    firstName: String,
    lastName: String,
  }
});

newRecipeSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()});

newRecipeSchema.methods.serialize = function() {

  return {
    id: this._id,
    title: this.title,
    type: this.type,
    content: this.content,
    calories: this.calories,
    author: this.authorString
  };
}

const Recipe = mongoose.model('Recipe', newRecipeSchema);

module.exports = {Recipe};