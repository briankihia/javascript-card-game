// this will contain the logic for war

// now we do an import statement that is going to import code from our deck.js

import Deck from './deck.js'

// we create card_value_map which is going to be an object which maps between our values
// we are going to convert our values which are in string form to numbers

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14

    // now we can map our values to numbers thus let's go down back to our function isRoundWinner
}

// now we create a brand new deck

// const deck =  new Deck()
// deck.shuffle()
// with this now all of our cards if we check in the console are shuffled
// console.log(deck)

// in here what we want to do is get access to our computer-card-slot in our html

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

// now we take computerCardSlot and append an element inside it
// the 0 here is used to get the first card
// computerCardSlot.appendChild(deck.cards[0].getHtml())

// now we want to make this not just be something to look at but an actual game thus..

let playerDeck, computerDeck, inRound, stop

function startGame() {
    // in here we want to create  and shuffle a new deck

    const deck =  new Deck()
    deck.shuffle()

    // after that we want to split this into two equal pies of cards
    // easiest way to that is to get the midpoint

    const decMidPoint = Math.ceil(deck.numberOfCards / 2)
    // the reason why we have Math.ceil here is for some reason we have a deck of 51 cards,we are going to essentially convert whatever we divide 51 by 2 which is 25 and 1/2,that will be converted to 26
    // on of the decks is going to have 26 cards and the other one 25

    // now we go outside our function and we define two variables so that they can be accessed globally

    // after that we come back here
    // we want our player to get the first 26 cards in our deck
    // what we are going to do is to take our cards and slice them from the first upto 26 which is our deckMidPoint
    // we also want to create a new deck from these cards thus..
    // here it is an object of cards that get stored not a value
    playerDeck = new Deck(deck.cards.slice(0, decMidPoint))
    computerDeck =new Deck(deck.cards.slice( decMidPoint, deck.numberOfCards))
    // the above is going to give us the last 26 cards in the deck
    inRound = false
    // this means that when we are starting the game cards are currently flipped

    stop = false
    // now let's go to our click function to define stop



    // console.log(playerDeck)
    // console.log(computerDeck)

    // now we create a function that return the game to the start when u decide to begin
    cleanBeforeRound()

}

// we call the function immediately our code runs
startGame()

function cleanBeforeRound() {
    // what we want to do here is that we want to separate all our different elements
    // thus we go at the top part of our js and do that 

    text.innerText = ''
    computerCardSlot.innerHTML = ''
    playerCardSlot.innerHTML = ''
    // here in our clean we need to set inRound to false
    inRound = false

    // now we update the count for our cards

    updateDeckCount()

}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
    // this is possible because computerDeck and playerDeck are objects of class Deck()
}


// now we want to make it such that when w e click something happens

// let inRound = false
// inRound means that the card is currently flipped right now because we are in tne middle of a round
// but rather than put it here we put it at top of our page and we call it startGame function

document.addEventListener('click',()=> {
    // essentially we want to build a switch between clicking to flip a card, and clicking to hide a card so we need a variable to do that
    // so we create a global variable(outside our function)

    // so here we define if stop is true we want to restart our game from the beginning to do another game
    if(stop) {
        // if stop is true then we start another game
        startGame()
        return
    }

    // now let's go back to our function flipCards where we had an our if statements and add this at the end


    if(inRound) {
        // if we are in a round we want to clean up that round so ..
        cleanBeforeRound()
        // if inRound is false then we continue flipping the cards
    } else {
        flipCards()
        // this is function we are bout to define
    }

})

function flipCards() {
    // first we need to set inRound to tru because we are in the middle of a round
    inRound = true
    // now in here we want to get the topmost card from the deck

    const playerCard = playerDeck.pop()
    // this will give us the first card(topmost card)

    // we also need to that for our computer

    const  computerCard = computerDeck.pop()
   

    // now what we want to do is render this cards

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    // when we flip we want the deck number to be updated thus we call the update function
    // when we call the update function here,since it is in  this function and as we can a top card has been removed from both deck thus the remaining ones would be less one

    updateDeckCount()

    // after that we want to see who won the round thus at bottom page we create a function isRoundWinner

    // here we are comparing who is the winner.The player card or the computer card
    if(isRoundWinner(playerCard, computerCard)) {
        // this if means the player won thus if that is the case

        text.innerText = 'Win'

        // on top of that we want to add this cards at the bottom of the players deck
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
        // but if the computer wins this is what we want to happen thus in our else if..

    } else  if(isRoundWinner(computerCard,playerCard)) {
        // this if means the player lost thus if that is the case

        text.innerText = 'lose'

        // on top of that we want to add this cards at the bottom of the computer deck
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
        // but if its a draw this is what we want to happen thus in our else..

    } else {
        // this will cater for the draw
        text.innerText = 'Draw'

        // here we want the playerCard to go to it's own deck and the computerCard to go back to its own deck
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
     
        // now we need to check if someone runs completely out of their cards ie lose lets check for that 

    }

    if(isGameOver(playerDeck)) {
        // now lets go to bottom of page and create this isGameOver function
        text.innerText = "You lose!!!"

        // we don't want the game to continue if someone won thus...we go to top page and declare stop
    } else if(isGameOver(computerDeck)){
        // this if else checks if the computer is the loser

        text.innerText= "You Win!!"
        // after that stop should still be true

        stop = true

    }


     // but this pop functions won't yet work because they have  not yet been defined so we work on them
    //  we go back to dock.js in our deck function
}


function isRoundWinner(cardOne, cardTwo) {
    // for the numbers it is easy to compare but for the letters we cant tell who won or lost thus we should take care of that.At the top of our page we declare variable card_value_map

    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
    // what we have done is get the value of cardOne then getting it's actual numeric value and see if it's larger than cardTwo.If so cardOne is the winner
    // lets go back to our function flipCards and put an if statement about this function
}

// if any of the decks runs dry of cards then the game ends thus we only need one argument
function isGameOver(deck) {
    // all this does is return if the deck has no cards
    return deck.numberOfCards === 0

}