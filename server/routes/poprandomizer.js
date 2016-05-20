var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/assessment1';
var randomNumber = require('../module/random_number');

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM animals', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);

    });
  });
});

router.post('/', function (req, res) {
  var animal = req.body;
  var population = Number(randomNumber(1, 100));
  console.log(animal);
  population.toString();
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO animals (type, population) ' +
                  'VALUES ($1, $2)',
                   [animal.animalType, population],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
  });
});

module.exports = router;
