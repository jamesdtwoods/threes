
//card variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = [
  "Ace",
  "King",
  "Queen",
  "Jack",
  "Ten",
  "Nine",
  "Eight",
  "Seven",
  "Six",
  "Five",
  "Four",
  "Three",
  "Two"
];
let piles = ['playerDownHidden',
  'playerDownShown',
  'playerHand',
  'computerDownHidden',
  'computerDownShown',
  'computerHand',
  'draw',
  'discard',
  'play']
//dom variables
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("draw-button");
let stayButton = document.getElementById("stay-button");

//Game Variables
let gamesStarted = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];
let dealerDownHiddenCards = [];
let dealerDownShownCards = [];
let playerCards = [];
let playerDownHiddenCards = [];
let playerDownShownCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];

let playCardButton = `
    <button onclick="playCard(event)">Play Card</button>
`;

hitButton.style.display = "none";
stayButton.style.display = "none";

newGameButton.addEventListener("click", function () {
  gamesStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerDownHiddenCards = [getNextCard('dealerDownHidden'), getNextCard('dealerDownHidden'), getNextCard('dealerDownHidden')];
  dealerDownShownCards = [getNextCard('dealerDownShown'), getNextCard('dealerDownShown'), getNextCard('dealerDownShown')];
  dealerCards = [getNextCard('dealerHand'), getNextCard('dealerHand'), getNextCard('dealerHand')];
  playerDownHiddenCards = [getNextCard('playerDownHidden'), getNextCard('playerDownHidden'), getNextCard('playerDownHidden')];
  playerDownShownCards = [getNextCard('playerDownShown'), getNextCard('playerDownShown'), getNextCard('playerDownShown')];
  playerCards = [getNextCard('playerHand'), getNextCard('playerHand'), getNextCard('playerHand')];
  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  console.log('player hand in new game', playerCards);
  console.log('player down hidden hand in new game', playerDownHiddenCards);
  console.log('player down shown hand in new game', playerDownShownCards);
  showStatus(playerCards, dealerCards, playerDownShownCards, playerDownHiddenCards);
});

hitButton.addEventListener("click", function () {
  playerCards.push(getNextCard('playerHand'));
  console.log('player hand in hit button', playerCards);
  console.log('player down hidden hand in hit button', playerDownHiddenCards);
  console.log('player down shown hand in hit button', playerDownShownCards);
  checkForEndOfGame();
  showStatus(playerCards, dealerCards, playerDownShownCards, playerDownHiddenCards);
});

stayButton.addEventListener("click", function () {
  gameOver = true;
  checkForEndOfGame();
  showStatus(playerCards, dealerCards, playerDownShownCards, playerDownHiddenCards);
});

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx],
        text: `${values[valueIdx]} of ${suits[suitIdx]}`
      };
      deck.push(card);
    }
  }
  return deck;
}

function showStatus(playerCards, dealerCards, playerDownShownCards, playerDownHiddenCards) {
  // if (!gamesStarted) {
  //   textArea.innerText = "Welcome to BlackJack";
  //   return;
  // }

  document.getElementById('player-hand').innerHTML = ''
  for (let i = 0; i < playerCards.length; i++) {
    document.getElementById('player-hand').innerHTML += playerCards[i].text + "\n";
  }

  document.getElementById('player-down-shown').innerHTML = ''
  for (let i = 0; i < playerDownShownCards.length; i++) {
    document.getElementById('player-down-shown').innerHTML += playerDownShownCards[i].text + "\n";
  }

  document.getElementById('player-down-hidden').innerHTML = ''
  for (let i = 0; i < playerDownHiddenCards.length; i++) {
    document.getElementById('player-down-hidden').innerHTML += playerDownHiddenCards[i].text + "\n";
  }

  document.getElementById('dealer-hand').innerHTML = ''
  for (let i = 0; i < dealerCards.length; i++) {
    document.getElementById('dealer-hand').innerHTML += dealerCards[i].text + "\n";
  }

  updateScores();

  if (gameOver) {
    if (playerWon) {
      textArea.innerText += "You Win!";
    } else {
      textArea.innerText += "Dealer Wins!";
    }
    newGameButton.style.display = "inline";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
  }
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
  return card.value + " of " + card.suit;
}

function getNextCard(pile) {
  let nextCard = deck.shift()
  nextCard.pile = pile
  console.log('next card', nextCard);
  return nextCard
}

function getCardNumericValue(card) {
  switch (card.value) {
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    case "Jack":
      return 11;
    case "Queen":
      return 12;
    case "King":
      return 13;
    case "Ace":
      return 14;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
  }
  return score;
}

function updateScores() {
  // dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
  //   updateScores();
  //   if (gameOver) {
  //     //let the dealer take cards
  //     while (
  //       dealerScore < playerScore &&
  //       playerScore <= 21 &&
  //       dealerScore <= 21
  //     ) {
  //       dealerCards.push(getNextCard());
  //       updateScores();
  //     }
  //   }

  // if (playerDownHiddenCards.length = 0) {
  //   playerWon = true;
  //   gameOver = true;
  // } else if (playerDownHiddenCards.length = 0) {
  //   playerWon = false;
  //   gameOver = true;
  // }
  // newGameButton.style.display = "inline";
  // hitButton.style.display = "none";
  // stayButton.style.display = "none";
  //   }
}
