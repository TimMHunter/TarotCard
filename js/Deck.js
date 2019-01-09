/* global $ */

var cardDeck = [];

function buildDeck() {
    var img;
    img = $('<img />').attr({
            'id': 'Aquarius',
            'src': 'cards/horoscope/Aquarius.png',
            'alt': 'Aquarius',
            'title': 'Aquarius Card Image',
            'width': 250
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Aries',
            'src': 'cards/horoscope/Aries.png',
            'alt': 'Aries',
            'title': 'Aries Card Image',
            'width': 250
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Cancer',
            'src': 'cards/horoscope/Cancer.png',
            'alt': 'Cancer',
            'title': 'Cancer Card Image',
            'width': 250
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Capricorn',
            'src': 'cards/horoscope/Capricorn.png',
            'alt': 'Capricorn',
            'title': 'Capricorn Card Image',
            'width': 250
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Gemini',
            'src': 'cards/horoscope/Gemini.png',
            'alt': 'Gemini',
            'title': 'Gemini Card Image',
            'width': 250
    });
    cardDeck.push(img);
    
    img = $('<img />').attr({
            'id': 'Leo',
            'src': 'cards/horoscope/Leo.png',
            'alt': 'Leo',
            'title': 'Leo Card Image',
            'width': 250
    });
    cardDeck.push(img);
    
    shuffleDeck();
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
    for(var i = 0; i < $('select[name="#numOfCards"] option:selected').val(); i++) {
        cardDeck.shift().appendTo("#cards");
    }
}

$(function () {
    $("#submit").onclick(buildDeck);
    $("#submit").onclick(drawCards);
});