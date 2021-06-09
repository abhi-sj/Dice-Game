'use strict';

//Selecting the elemnts
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //since we are using id attribute here better ignore# and use getElementById. Its also bit faster than querySelector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//starting condition

const init = function () {
  scores = [0, 0]; //this array holds the final scores of 2 players and since 0 indexing in array we keep the first player as 0
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden'); //we just define hidden class in css file and then using classList to add the classname 'hidden' to the 'dice' class to make it invisible
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); //if already there JS wont add it..same for remove
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //toggles is best coz if that class has player--active then it will not add..if it does not has then it will add
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate Random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //we access the src of img element unser diceEL class and modify according to the file name using the great template string in JS!!

    //3.Check for rolled
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if 1 switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Updates the final score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check score >=100
    if (scores[activePlayer] >= 100) {
      //finish game
      playing = false; //need to stop paying
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //need to remove the active player by removing the class palyer--active
      diceEl.classList.add('hidden');
    } else {
      //3.Switch Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
