const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Recipe} = require('./models');

//GET all recipes
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

//GET recipes by ID
router.get('/:id', (req, res) => {
  Recipe
    .findById(req.params.id)
    .then(recipe => res.json(recipe.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.post('/', (req, res) => {

  const requiredFields = ['title', 'type', 'content', 'calories'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Recipe
    .create({
      title: req.body.title,
      type: req.body.type,
      content: req.body.content,
      calories: req.body.calories,
      author: req.body.author
    })
    .then(recipe => res.status(201).json(recipe.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.put('/:id', (req, res) => {

  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = ['title', 'type', 'content', 'calories', 'author'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Recipe
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(recipe => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.delete('/:id', (req, res) => {
  Recipe
    .findByIdAndRemove(req.params.id)
    .then(recipe => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});


module.exports = router;