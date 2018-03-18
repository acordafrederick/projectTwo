var db = require("../models");

module.exports = function(app) {

  // POST route for saving a new post
  app.post("/api/game", function(req, res) {
    console.log("Req.body:", req.body);
    db.League.create(req.body).then(function(dbLeague) {
      console.log("League Added in Database");
      res.json(dbLeague);
    });
  });

}