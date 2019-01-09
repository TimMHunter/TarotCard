/* global $ */

//Hold new instances of the deck.
var cardDeck;

//Hold deck data pulled from JSON file.
var cardData;

//Randomly shuffles the cardDeck array.
function shuffleDeck() {
  var currentIndex = cardDeck.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = cardDeck[currentIndex];
    cardDeck[currentIndex] = cardDeck[randomIndex];
    cardDeck[randomIndex] = temporaryValue;
  }
}

//Shifts card from cardDeck and sets it to website.
function showCards() {
    $("#cards").empty();
    //cardDeck.shift().appendTo("#cards");
    for(var i = 0; i < $('select[id="numOfCards"] option:selected').val(); i++) {
        //Draw card
        var card = cardDeck.shift();
        
        //Build container
        var cardContainer = $("<div>");
        cardContainer.attr({
            'id': "card" + i
        });
        cardContainer.appendTo("#cards");
        
        //Build image
        var img = $("<img>");
        img.attr({
           "id":  card.name,
            "src": card.image,
            "title": card.name + " Image"
        });
        img.appendTo(cardContainer);
        
        var desc = $("<p>");
        desc.html(card.description);
        desc.appendTo(cardContainer);
    } 
}

//Grabs card data and stores it. Makes new copies of card data for cardDeck.
function buildDeck() {
    var def = $.Deferred();
    if(cardData == null){
        $.getJSON(
            'cards/CardData.json', 
            function(data) {
                cardData = data;
                cardDeck = Array.from(data);
            }
         ).done(
            function(){
                def.resolve();
            }
        );
    } else {
        cardDeck = Array.from(cardData);
        def.resolve();
    }
    return def;
}

//Combines other functions into correct order.
function drawCards() {
    buildDeck().done(
        function () {
            shuffleDeck();
            showCards();
        }
    );
}

//Set functions when document is ready.
$(function () {
    $("#drawButton").click(drawCards);
});