// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for creating a new character at the start of a game
  app.post("/api/game", function(req, res) {
    db.Character.create({
      character: req.body.character,
      knowlege: req.body.knowlege,
      sanity: req.body.sanity,
      power: req.body.power
    }).then(function(dbCharacter) {
      res.json(dbCharacter);
    })
      .catch(function(err) {
        res.json(err);
      });
  });

  // PUT route for recording a choice at a step in the game 
  app.put("/api/step", function(req, res) {
    console.log("update character with chosen values");
    db.Character.update({
      knowlege: req.body.knowlege,
      sanity: req.body.sanity,
      power: req.body.power
    }, {
      where: {
        id: req.character.id
      }
    }).then(function(dbCharacter) {
      res.json(dbCharacter);
    })
      .catch(function(err) {
        res.json(err);
      });
  });
};
