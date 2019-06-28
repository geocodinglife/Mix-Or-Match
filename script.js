// const overlays = Array.from(document.getElementsByClassName('overlay-text'));
// const cards = Array.from(document.getElementsByClassName('card'));
// const timer = document.getElementById('time-remaining');
// const ticker = document.getElementById('flips');

class AudioController {
  constructor() {
    self.gameOverSound  = new Audio('Assets/Audio/gameOver.wav');
    self.victorySound    = new Audio('Assets/Audio/victory.wav');
    self.matchSound     = new Audio('Assets/Audio/match.wav');
    self.bgMusic       = new Audio('Assets/Audio/creepy.mp3');
    self.flipSound      = new Audio('Assets/Audio/flip.wav');
  }

  // ****************  in all the followind methods change the name bgMusic ***************,

  startMusic() {
    self.bgMusic.play();

    self.bgMusic.volume = 0.5;
    self.bgMusic.loop   = true;
  }

  stopMusic() {
    self.bgMusic.pause();
    self.bgMusic.currentTime = 0;
  }

  // ****************  in all the followind methods change the name bgMusic ***************

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
    self.stopMusic();
    self.gameOverSound.play();
  }
}

class MixOrMatch {
 constructor(totalTime, cards) {
   self.cardsArray    = cards;
   self.totalTime     = totalTime;
   self.timeRemaining = totalTime;
   self.timer        = document.getElementById('time-remaining');
   self.ticker        = document.getElementById('flips');
   self.audioController = new AudioController;
 }

 startGame() {
   self.cardToCheck  = null;
   self.totalClicks    = 0;
   self.timeRemaining = self.totalTime;
   self.matchedCards  = [];
   self.busy        = true;
 }

 flipCard(card) {
   if(this.canFlipCard(card)) {
     self.audioController.flip();
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
  let game = new MixOrMatch(100, cards)

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      game.startGame()  ;

      let audioController = new AudioController();
      audioController.startMusic();
    });
  });

  cards.forEach(card => {
    card.addEventListener('click', () => {
      game.flipCard(card);
    } );
  });
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
