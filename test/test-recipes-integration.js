'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const {Recipe} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

//this function is used to put random documents into the db
function seedRecipeData() {
  console.info('seeding recipe data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateRecipeData());
  }
  // this will return a promise
  return Recipe.insertMany(seedData);
}


// used to generate data to put in db
function generateRecipeType() {
  const recipeTypes = [
    'Entree', 'Appetizer', 'Dessert', 'Cocktail', 'Snack'];
  return recipeTypes[Math.floor(Math.random() * recipeTypes.length)];
}

// generate an object represnting a recipe.
function generateRecipeData() {
  return {
    title: faker.lorem.words(),
    type: generateRecipeType(),
    content: faker.lorem.paragraph(),
    calories: faker.random.number(),
    author: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }
  };
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Recipes API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedRecipeData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {

    it('should return all existing recipes', function() {

      let res;
      return chai.request(app)
        .get('/recipe')
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.recipes).to.have.length.of.at.least(1);
          return Recipe.count();
        })
        .then(function(count) {
          expect(res.body.recipes).to.have.length(count);
        });
    });
  });

  describe('POST endpoint', function() {

    it('should add a new recipe', function() {

      const newRecipe = generateRecipeData();

      return chai.request(app)
        .post('/recipe')
        .send(newRecipe)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id', 'title', 'type', 'content', 'calories', 'author');
          expect(res.body.title).to.equal(newRecipe.title);
          expect(res.body.id).to.not.be.null;
          expect(res.body.type).to.equal(newRecipe.type);
          expect(res.body.content).to.equal(newRecipe.content);
          expect(res.body.calories).to.equal(newRecipe.calories);

          return Recipe.findById(res.body.id);
        })
        .then(function(recipe) {
          expect(recipe.title).to.equal(newRecipe.title);
          expect(recipe.type).to.equal(newRecipe.type);
          expect(recipe.content).to.equal(newRecipe.content);
          expect(recipe.calories).to.equal(newRecipe.calories);
          expect(recipe.author.firstName).to.equal(newRecipe.author.firstName);
          expect(recipe.author.lastName).to.equal(newRecipe.author.lastName);
        });
    });
  });

  describe('PUT endpoint', function() {

    it('should update fields you send over', function() {
      const updateData = {
        title: 'New Recipe',
        content: 'This is a new recipe for all of the foods.'
      };
      return Recipe
        .findOne()
        .then(function(recipe) {
          updateData.id = recipe._id;
          return chai.request(app)
            .put(`/recipe/${recipe._id}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);

          return Recipe.findById(updateData.id);
        })
        .then(function(recipe) {
          expect(recipe.title).to.equal(updateData.title);
          expect(recipe.content).to.equal(updateData.content);
        });
    });
  });


  // describe('DELETE endpoint', function() {

  //   it('delete a recipe by id', function() {

  //     let recipe;

  //     return Recipe
  //       .findOne()
  //       .then(function(_recipe) {
  //         recipe = _recipe;
  //         return chai.request(app).delete(`/recipe/${recipe.id}`);
  //       })
  //       .then(function(res) {
  //         expect(res).to.have.status(204);
  //         return Recipe.findById(recipe.id);
  //       })
  //       .then(function(_recipe) {
  //         expect(_recipe).to.be.null;
  //       });
  //   });
  // });
});







