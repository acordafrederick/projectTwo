$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var userData;
  var leagueData;
  var leagueId;

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    console.log(data)
    userData = data.id;
  });

  // var leagueForm = $("#league");
  var games = $("#numberOfGames");
  // var name = $("#name");

  var leaguePlayers;
  var gameSize = [];
  var notPlaying = [];

  getLeagueData(userData);

  var url = window.location.search;
  var gameId;


  $(".addPlayer").click("#name", function() {
    console.log("NEW PLAYER")
    if (!name.val().trim()) {
      return;
    }
    var playerData = {
      playerName: name.val().trim(),
      checkedIn: false,
      commander: "none",
      assignedTable: 0,
      points: 0,
      LeagueId: leagueId
    };
    submitPlayer(playerData);
  });

  function submitPlayer(stats) {
    $.post("/api/gameInfo", stats, function(){
      console.log("data sent");
      location.reload();
    });
  };

  // get data of league that matches userId in the Leagues Table
  function getLeagueData(id) {
    $.get("/api/leagues/" + id, getPlayerData);
  }

  // get all players where LeagueId matches id of league
  function getPlayerData(leagueInfo) {
    leagueData = leagueInfo;
    console.log(leagueData);
    leagueId = leagueData.id;
    $.get("/api/gameInfo/" + leagueId, renderPlayerList);
  }

//=============== DYNAMIC PLAYERLIST CREATION ===========
  function renderPlayerList(data) {
    console.log(data);
    console.log(data.length);
    var leagueTitle = leagueData.leagueName;
    console.log(leagueTitle);
    var currentLeague = $("<h3>"+leagueTitle+"</h3>");
    $("#leagueName").append(currentLeague);
    for (var i = 0; i < data.length; i++) {
      var newRow = $("<div class='row'>")
      var player = $("<div class='col-md-4 form-check teamMember'>");
      var inputElement = $("<input id=" + data[i].id + " class='form-check-input checkbox position-static' type='checkbox'>");

      // add h6 tag as well
      var labelElement = $("<label for='leagueName'><h6>"+data[i].playerName+"</h6></label>")
      player.append(inputElement);
      player.append(labelElement);

      var commander = $("<input type='text' class='col-md-3 form-control cmdr' value=" + data[i].commander + " readonly /><button class='col-md-1  btn btn-outline-secondary editCmdr' type='button'>Edit</button></div>");

      var playerPoints = $("<div class='col-md-4'>"+data[i].points+"<span><button class='btn btn-outline-secondary' type='button'>Edit</button></span></div>");
      // $("#points").append(playerPoints);
      $(newRow).append(player);
      $(newRow).append(commander);
      $(newRow).append(playerPoints);
      $(".dynamicPlayers").append(newRow);
    };
  }
  // adds and removes check property when clicked
  $("#playerList").click(function() {
    $(this).prop("checked");
  });

  // $('.cmdr').toggle('readonly');
  $('.editCmdr').click(function () {
    console.log("readonly");
    $(this).prop(this.disabled)
  });
//================ When START GAME is clicked ==============
  $(".start").click(function(event) {
    event.preventDefault();
    // store the number of games selected into the gameCount variable
    var gameCount = $("#exampleFormControlSelect1").val().trim();
    // clear local storage
    localStorage.clear();
    // store the the gameCount amount into an object with a key of gameCount
    localStorage.setItem("gameCount", gameCount);
    activePlayers();
  });


  // iterate through all the elements with the checkbox class to see if they are checked
  function activePlayers() {
    $(".checkbox").each(function(){
      if ($(this).prop("checked")) {
        // if checked assign the element id to the key "id" with an addtional key value of checkedIn as true, then push into the gameSize array...each key-value pair will be called during the PUT Ajax request
        gameSize.push({
          "id": $(this).attr("id"),
          "checkedIn": true
        });
      } else {
        notPlaying.push({
          "id": $(this).attr("id"),
          "checkedIn": false,
          "assignedTable": 0
        });
      }
    });
    checkGame(gameSize)
  }

  function checkGame(gameSize) {

    // possibly put an else statement with to make checkedIn false and tableAssignment null

    if (gameSize.length <= 1) {
      console.log("must be more than one")
      return;
    } else {
      console.log("more than 1", gameSize);
      var shuffleGame = shuffle(gameSize);
    }
    tableAssignment(shuffleGame);
  };

//=============== Player Array Shuffle ===================
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

//================= Assign Tables ====================
  function tableAssignment(gameLayout) {
    var numOfTables;
    var counter = 1;
    var gamers = gameLayout.length;

    if (gamers < 4) {
      numOfTables = 1;
    } else {
      numOfTables = Math.floor(gamers / 4);
      var overflow = gamers % 4;
      if (gamers < 11 && overflow == 2) {
        numOfTables += 1;
      } else if (overflow > 2) {
        numOfTables += 1;
      };
    };

    for (var i = 0; i < gamers; i++) {
      // has to have more than 5 people to generate more than 1 table
      gameLayout[i].assignedTable = counter;
      counter ++;
      if (counter > numOfTables) {
        counter = 1;
      };
    };
    console.log(gameLayout);
    updateTables(gameLayout, notPlaying);
  }

  function updateTables(assignments, notPlaying) {
    console.log("assignments", assignments);
    var newAssign = [];
    assignments.forEach(function(players) {
      $.ajax({
        method: "PUT",
        url: "/api/gameInfo",
        data: players
      })
      .then(function(newValues) {
        console.log("newValues", newValues);
      });
    });
    notPlaying.forEach(function(nonPlayer) {
      $.ajax({
        method: "PUT",
        url: "/api/gameInfo",
        data: nonPlayer
      })
      .then(function(results) {
        console.log("absent", results);
      });
    });
  }
});