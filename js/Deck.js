/* global $ */

var cardDeck = [];

function buildDeck() {
    var img;
    cardDeck = []; //Clear array
    
    img = $('<img />').attr({
            'id': 'Aquarius',
            'src': 'cards/horoscope/Aquarius.png',
            'alt': 'Aquarius',
            'title': 'Aquarius Card Image'
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Aries',
            'src': 'cards/horoscope/Aries.png',
            'alt': 'Aries',
            'title': 'Aries Card Image'
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Cancer',
            'src': 'cards/horoscope/Cancer.png',
            'alt': 'Cancer',
            'title': 'Cancer Card Image'
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Capricorn',
            'src': 'cards/horoscope/Capricorn.png',
            'alt': 'Capricorn',
            'title': 'Capricorn Card Image'
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Gemini',
            'src': 'cards/horoscope/Gemini.png',
            'alt': 'Gemini',
            'title': 'Gemini Card Image'
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Leo',
            'src': 'cards/horoscope/Leo.png',
            'alt': 'Leo',
            'title': 'Leo Card Image'
    });
    cardDeck.push(img);
}

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

function drawCards() {
    $("#cards").empty();
    //cardDeck.shift().appendTo("#cards");
    for(var i = 0; i < $('select[id="numOfCards"] option:selected').val(); i++) {
        $("<div />").attr({'id': "card" + i}).appendTo("#cards");
        cardDeck.shift().appendTo("#card" + i);
    } 
}

$(function () {
    $("#drawButton").click(buildDeck);
    $("#drawButton").click(shuffleDeck);
    $("#drawButton").click(drawCards);
});