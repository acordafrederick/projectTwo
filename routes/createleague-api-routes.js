var db = require("../models");

module.exports = function(app) {

  // POST route for saving a new post
  app.post("/api/createleague", function(req, res) {
    console.log("Req.body:", req.body);
    db.League.create(req.body).then(function(dbLeague) {
      console.log("League Added in Database");
      res.json(dbLeague);
      // res.json("/initial");
      // res.redirect("/initial");
      // res.redirect("/api/gameInfo")
    });
  });

}


