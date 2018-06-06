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
const moveCounter = document.querySelector('.move-count');
const modal = document.querySelector('.modal');
const stars = document.querySelector('.stars');
const moves = document.querySelector('.moves');


//select card elements in the deck
let deck = document.querySelector('.deck');

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

		newList.setAttribute('class', 'card fa ' + cards[i]);
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
	starRating();
	closeModal();
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

// Start timer
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

// Stop timer
function stopTime() {
	clearInterval(timer);
}

// Checks if cards are matched or not
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

// Count the moves
function countMoves() {
	moves.innerText++;

	if (moves.innerText > 15) {
		document.querySelector('.stars li:nth-child(1)').classList.add('star-empty');

	}
	if (moves.innerText > 23) {
		document.querySelector('.stars li:nth-child(2)').classList.add('star-empty');
	}
}

// Check if cards are matched
function matched() {
	openCards[0].classList.add('match');
	openCards[1].classList.add('match');
	endGame++;

	if (endGame === 8) {
		clearInterval(timer);
		modalMsg();
	}
}

// Check if cards are not matched
function notMatched() {
	openCards[0].classList.add('no-match');
	openCards[1].classList.add('no-match');
	setTimeout(function() {
		openCards[0].classList.remove('open', 'show', 'no-match');
		openCards[1].classList.remove('open', 'show', 'no-match');
		openCards = [];
	}, (1000));
}

// Star rating
function starRating() {
	document.querySelector(".stars li:nth-child(1)").classList.remove("star-empty");
	document.querySelector(".stars li:nth-child(2)").classList.remove("star-empty");
}

// Modal message
function closeModal() {
	const panel = document.querySelector(".score-panel");
	modal.style.display = "none";
    restart.appendChild(timer);
    panel.prepend(stars);
    panel.appendChild(time);
    panel.appendChild(moveCounter);
    panel.appendChild(restart);
}

function modalMsg() {
	const winMessage = document.querySelector(".modal-message");
	modal.style.display = "block";
	winMessage.appendChild(restart);
	winMessage.appendChild(stars);
	winMessage.appendChild(timer);
	winMessage.appendChild(moveCounter);
}