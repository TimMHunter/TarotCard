/* global $ */

//Hold cards that have not been drawn.
var cardDeck = [];

//Hold cards that have already been drawn.
var drawnDeck = [];

//State check for whether the deck has been built.
var deckBuilt = false;

//Card object holds imported card data.
function Card(name, description, type, terra, sol, luna, mercurius, image) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.terra = terra;
    this.sol = sol;
    this.luna = luna;
    this.mercurius = mercurius;
    this.image = image;
}

//Grabs card data and stores it in cardDeck.
function buildDeck() {
    //Create defer for tracking when data is done being imported
    var def = $.Deferred();
    //Import data from JSON file
    $.getJSON(
        'cards/CardData.json', 
        function(data) {
            for(var i = 0; i < data.length; i++){
                var newCard = new Card(data[i].name, data[i].description, data[i].type, data[i].terra, data[i].sol, data[i].luna, data[i].mercurius, data[i].image);
                cardDeck.push(newCard);
            }
        }
     ).done(
        function(){
            def.resolve();
        }
    );
    return def;
}

//Randomly shuffles the given deck.
function shuffleDeck(deck) {
  var currentIndex = deck.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }
}

//Puts drawnDeck cards back into cardDeck.
function combineDecks() {
    while(drawnDeck.length != 0) {
        cardDeck.push(drawnDeck.pop());
    }
}

//Picks which card mode based on selection.
function selectCards() {
    var i, card;
    
    //Clear card display
    $("#cards").empty();
    
    //Get select value
    var selection = $('select[id="numOfCards"] option:selected').val();
    
    //Mode 1: Draw random cards from entire deck.
    if(selection == 1 || selection == 3 || selection == 8) {
        var template = "";
        for(i = 0; i < selection; i++) {
            template += (100 / selection) + "%";
            card = cardDeck.shift();
            drawnDeck.push(card);
            showCard(card);
        } 
        $("#cards").css("grid-template-columns", template);
        if(selection == 8) {
            $("#cards").css("font-size", "0.75em");
        } else {
            $("#cards").css("font-size", "1em");
        }
    }
    //Mode 2: First 4 are Celestials, then random for the rest.
    if(selection == 12) {
        $("#cards").css("grid-template-columns", "25% 25% 25% 25%");
        $("#cards").css("font-size", "1em");
        
        var celestials = cardDeck.filter(function(card) {return card.type == "Celestial";});
        var nonCelestials = cardDeck.filter(function(card) {return card.type != "Celestial";});
        
        for(i = 0; i < celestials.length; i++) {
            showCard(celestials[i]);
        }
        
        shuffleDeck(nonCelestials);
        for(i = 0; i < selection - celestials.length; i++) {
            showCard(nonCelestials.shift());
        }
    }
    
    if(selection == 24) {
        var mode = $('select[id="mode"] option:selected').val();
        
        //Mode 3, version 1: First 8 are Chakras and the Serpent, then random for the rest.
        if(mode == 1){
            $("#cards").css("grid-template-columns", "12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%");
            $("#cards").css("font-size", "0.75em");

            var findList = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet", "Serpent"];

            for(i = 0; i < findList.length; i++) {
                var findCard = cardDeck.find(function(card) {return card.name == findList[i];});
                showCard(findCard);
            }

            var remaining = cardDeck.filter(function(card){ return !((card.type == "Chakra") || (card.type == "Serpent"));});
            shuffleDeck(remaining);
            for(i = 0; i < selection - findList.length; i++) {
                showCard(remaining.shift());
            }  
        }
        //Mode 3, version 2: All random cards in a 6x4 pattern.
        else if(mode == 2) {
            $("#cards").css("grid-template-columns", "16.6% 16.6% 16.6% 16.6% 16.6% 16.6%");
            $("#cards").css("font-size", "0.75em");
            
            for(i = 0; i < selection; i++) {
                card = cardDeck.shift();
                drawnDeck.push(card);
                showCard(card);
            } 
        }
    }
}

//Draws cards onto the website.
function showCard(card) {
    //Build container
    var cardContainer = $("<div>");
    cardContainer.attr({
        'id': card.name + "Container"
    });
    cardContainer.appendTo("#cards");

    //Build image
    var img = $("<img>");
    img.attr({
       "id":  card.name + "Image",
        "src": card.image,
        "title": card.name + " Image"
    });
    img.appendTo(cardContainer);

    //Build description
    var desc = $("<p>");
    desc.attr({
       "id": card.name + "Description" 
    });
    desc.html(card.description);
    desc.appendTo(cardContainer);
}

//Combines other functions into correct order.
function drawCards() {
    if(!deckBuilt){
        buildDeck().done(
            function () {
                deckBuilt = true;
                shuffleDeck(cardDeck);
                selectCards();
            }
        );
    } else {
        combineDecks();
        shuffleDeck(cardDeck);
        selectCards();
    }
}

//Toggle for 24 card selection mode.
function toggleMode() {
    var selection = $('select[id="numOfCards"] option:selected').val();
    
    if(selection == 24) {
        $("#mode").show();
    } else {
        $("#mode").hide();
    }
}

//Set functions when document is ready.
$(function () {
    $("#drawButton").click(drawCards);
    $("#numOfCards").on("change", toggleMode);
});