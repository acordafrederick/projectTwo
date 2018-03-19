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

// db.sequelize.sync({force:true})

//To insert commanders
// .then(function(){
//        return db.Commander.bulkCreate([
//           { commanderName: "Freya", url:"https://img.scryfall.com/cards/large/en/cma/111.jpg?1519869364"},
//           { commanderName: "Yahenni", url:"https://img.scryfall.com/cards/large/en/aer/75.jpg?1517813031"},
//           { commanderName: "Atraxa", url:"https://img.scryfall.com/cards/large/en/c16/28.jpg?1517813031"},
//           { commanderName: "Nekusar", url:"https://img.scryfall.com/cards/large/en/c13/201.jpg?1517813031"},
//           { commanderName: "Kaalia", url:"https://img.scryfall.com/cards/large/en/cma/180.jpg?1519870270"},
//           { commanderName: "Zur", url:"https://img.scryfall.com/cards/normal/en/mm3/204.jpg?1517813031"},
//           { commanderName: "Jhoira", url:"https://img.scryfall.com/cards/normal/en/dds/1.jpg?1517813031"},
//           { commanderName: "Leovold", url:"https://img.scryfall.com/cards/normal/en/cn2/77.jpg?1517813031"},
//           { commanderName: "Maelstrom Wanderer", url:"https://img.scryfall.com/cards/large/en/pca/101.jpg?1517813031"},
//           { commanderName: "Karador", url:"https://img.scryfall.com/cards/large/en/cmd/207.jpg?1517813031"},
//           { commanderName: "Derevi", url:"https://img.scryfall.com/cards/large/en/cma/176.jpg?1519870219"},
//           { commanderName: "Uril", url:"https://img.scryfall.com/cards/normal/en/arb/124.jpg?1517813031"}      
//        ]);
//   })

// To insert ONE League
// .then(function(){
// 	return db.League.create({
// 		leagueName: "Austinerds",
// 	});
// })

// To insert MANY Leagues
// .then(function(){
//      return db.League.bulkCreate([
//         { leagueName: "Austinerds", leaguePlayers: ["Vanessa", "Fred", "Matt", "Bob", "Venkat", "Keith", "Doug"],
//           leaguePoints: 85, leagueStanding: "First", leagueCurrentGames: 3,  
//           leagueAdminID: "Vanessa", leaguePassword: "guessit" },

//         { leagueName: "Cowboys", leaguePlayers: ["Jill", "Jack", "Jim", "Joey", "Joseph", "Jeb"],
//           leaguePoints: 35, leagueStanding: "Second", leagueCurrentGames: 2,  
//           leagueAdminID: "Bob", leaguePassword: "??abhc/" },

//      ]);
// })

// .then(function(){
//   return db.Gameinfo.bulkCreate([
//     { playerName: "Vanessa", checkedIn: 1, commander: "Freya", assignedTable: 1, points: 5, LeagueId: 1},
//     { playerName: "Matt", checkedIn: 1, commander: "Mogus", assignedTable: 1, points: 6, LeagueId: 1},
//   ]);
// })

// .then(function() {
//   // app.listen(port);
//     app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});