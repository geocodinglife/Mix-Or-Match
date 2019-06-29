class AudioController {
  constructor() {
    self.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
    self.victorySound = new Audio('Assets/Audio/victory.wav');
    self.matchSound = new Audio('Assets/Audio/match.wav');
    self.bgMusic = new Audio('Assets/Audio/creepy.mp3');
    self.flipSound = new Audio('Assets/Audio/flip.wav');
  }

  startMusic() {
    self.bgMusic.play();

    self.bgMusic.volume = 0.5;
    self.bgMusic.loop = true;
  }

  stopMusic() {
    self.bgMusic.pause();
    self.bgMusic.currentTime = 0;
  }

  flip() {
    self.flipSound.play();
  }

  match() {
    self.victory.play();
  }

  victory() {
    self.stopMusic();
    self.victory.play();
  }

  gameOver() {
    this.stopMusic();
    self.gameOverSound.play();
  }
}

class MixOrMatch {
  constructor(totalTime, cards) {
    self.cardsArray = cards;
    self.totalTime = totalTime;
    self.timeRemaining = totalTime;
    self.timer = document.getElementById('time-remaining');
    self.ticker = document.getElementById('flips');
    self.audioController = new AudioController;
  }

  startGame() {
    self.cardToCheck = null;
    self.totalClicks = 0;
    self.timeRemaining = self.totalTime;
    self.matchedCards = [];
    self.busy = true;

    setTimeout(() => {
      self.audioController.startMusic();
      this.shuffleCards();
      self.countDown = this.startCountDown();
      self.busy = false;

    }, 500);
      this.hideCards();
      self.timer.innerText = self.timeRemaining;
      self.ticker.innerText = self.totalClicks;
  }

  hideCards() {
    self.cardsArray.forEach(card => {
      card.classList.remove('visible');
      card.classList.remove('matched');
    });
  }

  flipCard(card) {
    if (this.canFlipCard(card)) {
      self.audioController.flip();
      self.totalClicks++;
      self.ticker.innerText = self.totalClicks
      card.classList.add('visible');
    }
  }

  startCountDown() {
    return setInterval(() => {
      self.timeRemaining--;
      self.timer.innerText = self.timeRemaining;

      if (self.timeRemaining === 0)
        this.gameOver();
    }, 1000);
  }

  gameOver() {
    clearInterval(self.countDown);
    self.audioController.gameOver();
    document.getElementById('game-over-text').classList.add('visible');
  }

  // shuffle algorithm
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

  shuffleCards() {
    for (let number = self.cardsArray.length - 1; number > 0; number--) {
      let randomIndex = Math.floor(Math.random() * (number * 1));
      self.cardsArray[randomIndex].style.order = number;
      self.cardsArray[number].style.order = randomIndex;
    }
  }

  canFlipCard(card) {
    return true;
    // return (!self.busy && !self.matchedCards.includes(cards) && card !== self.cardToCheck)
  }
};

  function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(5, cards)

    overlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
        overlay.classList.remove('visible')
        game.startGame();

        let audioController = new AudioController();
        audioController.startMusic();
      });
    });

    cards.forEach(card => {
      card.addEventListener('click', () => {
        game.flipCard(card);
      });
    });
  }

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
