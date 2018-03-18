// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/initial-api-routes.js")(app);
require("./routes/createleague-api-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: false }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });
db.sequelize.sync({force:true})
// To insert ONE League
// .then(function(){
//  return db.League.create({
//      leagueName: "Austinerds",
//  });
// })
// To insert MANY Leagues
.then(function(){
     return db.League.bulkCreate([
        { leagueName: "Austinerds", leaguePlayers: ["Vanessa", "Fred", "Matt", "Bob", "Venkat", "Keith", "Doug"],
          leaguePoints: 85, leagueStanding: "First", leagueCurrentGames: 3,
          leagueAdminID: "Vanessa", leaguePassword: "guessit" },
        { leagueName: "Cowboys", leaguePlayers: ["Jill", "Jack", "Jim", "Joey", "Joseph", "Jeb"],
          leaguePoints: 35, leagueStanding: "Second", leagueCurrentGames: 2,
          leagueAdminID: "Bob", leaguePassword: "??abhc/" },
     ]);
})
// .then(function(){
//   return db.GameInfo.bulkCreate([
//     { playerName: "Vanessa", checkedIn: 1, commander: "Freya", assignedTable: 1, points: 5, LeagueId: 1},
//     { playerName: "Matt", checkedIn: 1, commander: "Mogus", assignedTable: 1, points: 6, LeagueId: 1},
//   ]);
// })
.then(function() {
  // app.listen(port);
    app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
