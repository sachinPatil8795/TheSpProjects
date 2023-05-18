//Creating array of cards
let cards = [];


let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = " ";

//Creating player object
let player = {
  playerName: "Swasthan",
  playerChip: "1000",
};

const messageEl = document.getElementById("message-el");
const mySum = document.getElementById("sum-el");
const cardEl = document.getElementById("cards-el");
const playerEL = document.getElementById("player-el");

//Creating randomCard function which takes random values for cards
function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 10 + 1);
  return randomNumber;
}

//Render function
function renderGame() {
  if (sum < 21) {
    message = "Do you want to draw a new card? ";
  } else if (sum === 21) {
    message = "WOW! You got a Blackjack";
    messageEl.style.color = "MediumSeaGreen";
    
    hasBlackJack = true;
    playerEL.textContent = player.playerName + `: $${player.playerChip}`;
    // playerEL.style.color = '#57557';
    playerEL.style.marginTop = "20px";
    playerEL.style.fontWeight = "bold";
    playerEL.style.fontSize = "20px";
  } else {
    message = "You are out of the game";
    isAlive = false;
  }
  mySum.textContent = "Sum: " + sum;
  messageEl.textContent = message;

  //rendering cards using for loop
  cardEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardEl.textContent += cards[i] + " ";
  }
}

//startGame function which invokes renderGame
function startGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  sum = firstCard + secondCard;
  cards = [firstCard, secondCard];
  renderGame();
}

//When user clicks on new card button
function newCard() {
  //If exceeds 21 then player should be able to draw card
  if (isAlive === true && hasBlackJack === false) {
    let randCard = getRandomCard();
    sum += randCard;
    cards.push(randCard);
    renderGame();
  } else {
    alert("You cannot draw more cards! Play agian");
    mySum.textContent = "Sum: ";
    cardEl.textContent = "Cards: ";
    messageEl.textContent = "Give another try!";
  }
}

// function playAgain() {
//   messageEl.style.color = "white";
//   sum = 0;
//   mySum.textContent = "Sum: " + sum;
//   cards = 0;
//   cardEl.textContent = "Cards: " + cards;
//   startGame();
// }
