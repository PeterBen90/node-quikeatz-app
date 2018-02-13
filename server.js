
'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { Recipe } = require('./models');

const app = express();

const recipesRouter = require('./recipesRouter');


app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/recipe', recipesRouter);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/recipes', (req, res) => {
    res.sendFile(__dirname + '/public/recipes.html');
});

app.get('/recipes/new', (req, res) => {
  res.sendFile(__dirname + '/public/new-recipe.html');
});


app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
