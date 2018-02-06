const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Recipe} = require('./models');

router.get('/', (req, res) => {
  Recipe
    .find()
    .then(recipes => {
      res.json({
        recipes: recipes.map(
          (recipe) => recipe.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});



module.exports = router;