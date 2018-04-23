/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];


let openCards = []; // Stores matched cards
let endGame = 0;

let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
let timer;
let resetTimer = 0;

const restart = document.querySelector('.restart');

//select card elements in the deck
let deck = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(cards);
newDeck();

// Create new deck, loop through each card and create its HTML
function newDeck() {
	for (let i = 0; i < cards.length; i++) {
		const newList = document.createElement('li');

		newList.setAttribute('class', 'card fa fa-' + cards[i]);
		deck.appendChild(newList);
	}
}

// Start the game
function newGame() {
	deck.innerHTML = "";
	shuffle(cards);
	newDeck();
	endGame = 0;
	moves.innerText = 0;
	resetTimer = 0;
	seconds.innerText = 0;
	minutes.innerText = 0;
	stopTime();
	newRaiting();
	resetModal();
}

// Event listener for a card click
restart.addEventListener("click", newGame);
deck.addEventListener("click", openCard);

// Open card and display it's symbol
function openCard(event) {
	if(resetTimer === 0) {
		startTime();
		resetTimer = 1;
	}
	if (openCards.length > 1) {
		return;
	}

if (event.target.tagName === 'LI') {
	turnCard(event);
	openCards.push(event.target);
if (openCards.length === 2) {
	checkCards();
	countMoves();
		}
	}
}

function turnCard(event) {
	event.target.classList.add('open');
	event.target.classList.add('show');
}

function startTime() {
	timer = setInterval(function() {
		seconds.innerText++;
		if(seconds.innerText == 60) {
			minutes.innerText++;
            seconds.innerText = 0;

		}
	},(1000));
	return timer;
}

function stopTime() {
	clearInterval(timer);
}

function checkCards() {

	if (openCards[0].classList.value === openCards[1].classList.value) {
		setTimeout(function() {
			matched();
			openCards = [];
		}, (500));

} else {
	notMatched();
	}
}

function countMoves() {
	moves.innerText++;

	if (moves.innerText > 15) {
		document.querySelector('.stars li:nth-child(1)').classList.add('star-empty');

	}
	if (moves.innerText > 23) {
		document.querySelector('.stars li:nth-child(2)').classList.add('star-empty');
	}
}

function matched() {
	openCards[0].classList.add('match');
	openCards[1].classList.add('match');
	endGame++;

	if (endGame === 8) {
		clearInterval(timer);
		modal();
	}
}

function notMatched() {
	openCards[0].classList.add('no-match');
	openCards[1].classList.add('no-match');
	setTimeout(function() {
		openCards[0].classList.remove('open', 'show', 'no-match');
		openCards[1].classList.remove('open', 'show', 'no-match');
		openCards = [];
	}, (1000));
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
