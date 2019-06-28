class AudioController {
  constructor() {
    bgMusic = new Audio('Assets/Audio/creepy.mp3');
    flipSound = new Audio('Assets/Audio/flip.wav');
    matchSound = new Audio('Assets/Audio/match.wav');
    victorySound = new Audio('Assets/Audio/victory.wav');
    gameOverSound = new Audio('Assets/Audio/gameOver.wav');
    bgMusic.volume = 0.5;
    bgMusic.loop = true;
    }
    startMusic() {
      bgMusic.play();
    }
    stopMusic() {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
    flip() {
      flipSound.play();
    }
    match() {
      matchSound.play();
    }
    victory() {
      stopMusic();
      victorySound.play();
    }
    gameOver() {
      stopMusic();
      gameOverSound.play();
    }
}

class MixOrMatch {
  constructor(totalTime, cards) {
  cardsArray = cards;
  totalTime = totalTime;
  timeRemaining = totalTime;
  timer = document.getElementById('time-remaining')
  ticker = document.getElementById('flips');
  audioController = new AudioController();
  }

  startGame() {
    totalClicks = 0;
    timeRemaining = self.totalTime;
    cardToCheck = null;
    matchedCards = [];
    busy = true;
      setTimeout(() => {
        audioController.startMusic();
          shuffleCards(self.cardsArray);
            countdown = self.startCountdown();
            busy = false;
        }, 500)
      hideCards();
        timer.innerText = self.timeRemaining;
        ticker.innerText = self.totalClicks;
    }

    startCountdown() {
      return setInterval(() => {
        timeRemaining--;
        timer.innerText = timeRemaining;
          if(timeRemaining === 0)
            gameOver();
          }, 1000);
    }

    gameOver() {
      clearInterval(countdown);
        audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory() {
      clearInterval(countdown);
        audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }

    hideCards() {
      cardsArray.forEach(card => {
        card.classList.remove('visible');
          card.classList.remove('matched');
      });
    }

    flipCard(card) {
      if(canFlipCard(card)) {
        audioController.flip();
        totalClicks++;
        ticker.innerText = self.totalClicks;
        card.classList.add('visible');

          if(cardToCheck) {
            checkForCardMatch(card);
          } else {
            cardToCheck = card;
        }
      }
    }

    checkForCardMatch(card) {
      if(getCardType(card) === getCardType(self.cardToCheck))
        cardMatch(card, cardToCheck);
      else
        cardMismatch(card, cardToCheck);

      cardToCheck = null;
    }

    cardMatch(card1, card2) {
      matchedCards.push(card1);
      matchedCards.push(card2);
      card1.classList.add('matched');
      card2.classList.add('matched');
      audioController.match();
        if(matchedCards.length === cardsArray.length)
          victory();
    }

    cardMismatch(card1, card2) {
      busy = true;
      setTimeout(() => {
        card1.classList.remove('visible');
        card2.classList.remove('visible');
        busy = false;
      }, 1000);
    }

    shuffleCards(cardsArray) { // Fisher-Yates Shuffle Algorithm.
      for (let i = cardsArray.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        cardsArray[randIndex].style.order = i;
        cardsArray[i].style.order = randIndex;
      }
    }

    getCardType(card) {
      return card.getElementsByClassName('card-value')[0].src;
    }

    canFlipCard(card) {
      return !self.busy && !self.matchedCards.includes(card) && card !== self.cardToCheck;
    }
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName('overlay-text'));
  let cards = Array.from(document.getElementsByClassName('card'));
  let game = new MixOrMatch(100, cards);

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
        game.startGame();
    });
  });

  cards.forEach(card => {
    card.addEventListener('click', () => {
      game.flipCard(card);
    });
  });
}
