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

});
