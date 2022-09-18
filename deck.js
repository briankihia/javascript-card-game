// now we create a full deck of 52 cards.To do that we need to get all our different suits and all our different values for each one of our cards
// thus we create some variables to store that info

// We put the suits in all caps so that it can represent a global constant variable

const SUITS = ['♣','♠','♥','♦']
const VALUES= ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

// now we have all different values and suits and we can now combine this to have 52 unique cards




// a deck is a packet of cards

export default class Deck {
    // cards = freshDeck() because if we don't pass in a set limit of cards eg 26 cards,it will create us a brand new deck of every single card
    constructor(cards = freshDeck()) {
        // our deck is going to contain some different variables
        // we create where our card is going to be

        this.cards = cards

    }

    // here we create a simple function that is going to shuffle our cards

    // the get syntax binds an object property to a function that will be called when that property is looked up

    get numberOfCards() {
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
        // what shift does is that it takes the top element(first element in our array),it takes it of and returns it to us
        // pop return the last element in our array
    }

    // while we are here we add another function called push

    push(card) {
        // this function adds a card to the bottom of our deck
        this.cards.push(card)

    }


    shuffle(){
        // in here what we need to do is take our cards and set them to shuffled version of our card
        // so we just want to loop around and move all of our cards around
        // we could use the sort function but it would not work how we want
        // this is because the sort function is meant to sort things in an actual order and not a random order
        //  this.cards.sort((a,b) => Math.random() * .5)
        // this would not give us a perfectly randomised order.U just cant use random inside of the sorting function
        // thus we will need to write our own sorting function to make this 100% accurate
        // in order to do that we just need to create a simple loop to loop through our cards and then flip them with other cards inside our array

        // for ( let i = this.cards.length)
        // we would have started with that but we are going to constantly access the this.card.length  which will be a bit cumbersome thus we need to create it in it's own getter

        for (let i= this.numberOfCards -1; i>0; i--) {
            // in our for we are starting out with our last card ie this.numberOfCards -1 thus what we need to do is check while i>0 since we don't need to flip the final card .
            // if we flip all the cards in the deck instead of the last one eventually that one is going to get flipped around as well
            // we don't need to worry about flipping that
            // essentially all we are doing is going from the back of our list of cards all the way to the front 
            // and we are constantly taking whatever card we are currently on and flipping it with another card that comes earlier in the deck that we haven't got to yet

            // what we want to do is to get the new index for where we  are going to put this card
            // so we are going to get a random index that is earlier in the deck of cards than where we currently are
            // so what we do is...take a random number ie Math.random() and multiply this by i here which is our current index +1
            
            // const newIndex = Math.random() * (i + 1)

            // essentially this going to give us a placement inside of our deck that is somewhere else(any number inside the index that we haven't yet accessed inside the loop)
            // but to make sure it is an integer use Math.floor

            const newIndex = Math.floor(Math.random() * (i + 1))

            // eg if i=30 , newIndex is going to be a number btw 0 and 30 that we haven't yet accessed
            // then what I want to do is that I want to flip the values at the new index with the current index
            // to do that we need to get the oldValue such as the value that is at our new index currently
            // it will be card that is at our newIndex

            const oldValue = this.cards[newIndex]

            // we needed to have the oldValue before we overwrite it 
            // now we want to take the card that is at our i index and put it where our newIndex is

            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue

            // this function is going to be giving us a random shuffle every single time
            // anytime we refresh our page our cards are shuffled
        } 


    }
}

// we create a class for each of our cards

class Card {
    // a card has a suit eg. spade,diamond,heart and then a value eg 10 thus
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    // here we create a getter which returns color based on the type of suit
    // it returns black if it's either of those suits and red if otherwise
    get color() {
        return this.suit === "♠" || this.suit === "♣" ? "black" : "red"
    }

    // we want a function  to dynamically render our cards
    // this function is going to return to us a html element



    getHTML() {
        // first we create our element
        const cardDiv = document.createElement("div")
        // now we take our element created and access our innerText
        cardDiv.innerText = this.suit
        // the above part adds the center sign eg hearts
        // now we add a class to our element
        cardDiv.classList.add("card", this.color)
        // now we want to set our data-attribute in our div thus..

        cardDiv.dataset.value = `${this.value} ${this.suit}`
        // now if we return our cardDiv we will now have access to our html

        return cardDiv
        
    }




    // the above creates some like this 
    // <div class="card red" data-value="9 ♥">
    // ♥
    // </div>
}


// now down here we create a function freshDeck which is going create us a brand new deck of cards with all 52 cards one for each suit and value combination

function freshDeck() {
    // inside this function we want to loop through all the suits and values and then combine them all together inside one array.
    // and a really easy way to do that is by using the map function as well as the flatMap function
    // what flatMap does is that it works the same exact way as the map function inside of the javascript but it takes all of your arrays condensing them to one
    // rather than having eg 2 arrays ,they combined ino one eg [2,3] [4,5] it becomes [2,3,4,5]

    // The flatMap() method first maps each element in an array using a mapping function and then flattens the results into a new array.

    return SUITS.flatMap(suit => {
        // in here we loop through all of our values and map them into an array
        // if we used map 4 different arrays with a value of 13 each would have been created and we don't want that
        return VALUES.map(value => {
            // this is going to be for each one of our values
            // what this going to do is to create a new card by default
            // each suit is given values from the VALUES array
            return new Card(suit, value)
        })
        // the flatMap is going to return an array of arrays but it is going to condense them into one


    })
}