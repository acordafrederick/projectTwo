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
require("./routes/loginsignup-api-routes.js")(app);
require("./routes/game-api-routes.js")(app);
require("./routes/html-routes.js")(app);


// db.sequelize.sync({force:false})
// .then(function(){
//      return db.League.bulkCreate([
//         { leagueName: "2Austinerds", leaguePlayers: ["Vanessa", "Fred", "Matt", "Bob", "Venkat", "Keith", "Doug"],
//           leaguePoints: 85, leagueStanding: "First", leagueCurrentGames: 3, UserId: 4 },

//         { leagueName: "2Cowboys", leaguePlayers: ["Jill", "Jack", "Jim", "Joey", "Joseph", "Jeb"],
//           leaguePoints: 35, leagueStanding: "Second", leagueCurrentGames: 2,  
//           UserId: 2 },

//      ]);
// });


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
