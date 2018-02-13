'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/recipe-database';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-recipes-database';
exports.PORT = process.env.PORT || 8080;