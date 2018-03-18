
window.onload = function () {

    var supplementalCardsDiv = document.getElementById("supplementalCardsDiv");

    var gameCount = window.location.href.split("?gameCount=")[1];
    if (!gameCount) {
        gameCount = 1;
    } else {
        gameCount = parseInt(gameCount);
    }
    if (isNaN(gameCount)) {
        gameCount = 1;
    }
    console.log(gameCount)
    Array.prototype.randsplice = function () {
        var randomCard = Math.floor(Math.random() * this.length);
        var randomSplice = this.splice(randomCard, 1);

        return randomSplice[0];
    }

    var cards = ["ArmyOfTheFaceless.png", "BoundlessRealms.png", "Braingeyser.png", "BurnItAll.png", "CrumblingSanctuary.png", "Earthquake.png", "EnchantedForVictory.png", "EquippedForBattle.png", "GeneralDeath.png", "HealingHand.png", "InstantDeath.png", "LegendsRule.png", "Masochist.png", "Necropotence.png", "Prolific.png", "ResourceManagement.png", "SadButTrue.png", "Sharing.png", "SuperFriends.png", "Survivor.png", "TheWorldSpell.png", "ThirdTimesTheCharm.png", "ToMountDoom.png", "TurnAside.png", "Twenty-One.png"];

    var newDeck = [];
    var gameDecks = {};
    // gameDecks['chris'] = 22;
    // gameDecks['josh'] = 'cat';
    // gameDecks['rob'] = ['cat','dog'];
    // console.log(gameDecks);

    for (var j = 0; j < gameCount; j++) {
        gameDecks[j] = [];
        for (var i = 0; i < 5; i++) {
            // newDeck.push(cards.randsplice());
            gameDecks[j].push(cards.randsplice());
        }
    }
    console.log(gameDecks);

    let str = `<h4 class="card-title">Supplemental Cards</h4>
            <br>`;
    for (var j = 0; j < gameCount; j++) {
        str += `<div class="card-deck">`;
        for (var i = 0; i < gameDecks[j].length; i++) {
            str += `
  <div class="card w3-hover-shadow">
    <img class="card-img-top" src="images/${gameDecks[j][i]}" alt="image">
  </div>
`
        }
        str += `</div><br>`;
    }
    supplementalCardsDiv.innerHTML = str;

    // console.log(newDeck);
    //   console.log(cards);


    var commanderCardsArray = ["Atraxa, Praetors' Voice","Freya"];
    var commanderCardsImageArray = [];

    const getImageURLs = () => {
        const promises = [];
        var queryURL = [];

        for (let index = 0; index < commanderCardsArray.length; index++) {
            queryURL[index] = "https://api.deckbrew.com/mtg/cards?name=" + commanderCardsArray[index];
            // queryURL = "https://scryfall.com/search?q=%22Atraxa%2C+Praetors%27+Voice%22+OR+%22Freya%22&unique=cards&as=grid&order=name";
            promises.push(new Promise((resolve, reject) => {
                $.ajax({
                    url: queryURL[index],
                    method: "GET"
                })
                .then(function(response) {
                    commanderCardsImageArray[index] = response[0].editions[0].image_url;
                })
            })) //promises.push
        } //for (let index =
        return Promise.all(promises);
    }; //const getImageURLs


    const imageContents = getImageURLs().then(contents => {
        console.log(contents)
    })
    .catch(err => console.error(err));
};  //window.onload





    // magicSearch(queryURL);



    // for (let index = 0; index < commanderCardsArray.length; index++) {
    //     var cardName = commanderCardsArray[index];
    //     var magicSearch = function(cardName) {
    //         var queryURL = "https://api.deckbrew.com/mtg/cards?name=" + cardName;
    //         $.ajax({
    //             url: queryURL,
    //             method: "GET"
    //         })
    //         .then(function(response) {
    //             return response[0].editions[0].image_url;
    //         });
    //     };
    //     console.log(magicSearch);
    //     commanderCardsImageArray[index] = magicSearch;
    // }
    // console.log(commanderCardsImageArray);



// Provide the image URL for a selected Commander Card
// function magicSearch() {
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//     .then(function(response) {
//         console.log(queryURL);
//         var result = response[0].editions[0].image_url;
//         console.log(result);
//     });
// }

    //   console.log(commanderCardImageURL);

      // Constructing HTML containing the artist information

    //   var artistImage = $("<img>").attr("src", response[0].editions[0].image_url)