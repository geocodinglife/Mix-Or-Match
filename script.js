// class RPS {
//   constructor(human_guess) {
//    this.human_guess = human_guess;
//  }
// 
//   computer_guess() {
//     return [Math.floor(Math.random() * ['rock', 'paper', 'scissors'].length)];
//   }
//
//   rule_engine() {
//     return {
//       'rock': ['scissors'],
//       'paper': ['rock'],
//       'scissors': ['paper']
//     }
//   }
//
//   winner_is() {
//     if this.rule_engine[this.computer_guess.to_sym].include? this.human_guess,
//     console.log('Computer Wins!');
//     else if rule_engine[this.human_guess.to_sym].include? computer_guess,
//     console.log('You Wins!');
//     else
//     console.log('Tie');
//   }
// }
//
// new RPS(human_guess: "Rock").winner_is
// //
// // for (var i=1; i <= 20; i++)
// // {
// //     if (i % 15 == 0)
// //         console.log("FizzBuzz");
// //     else if (i % 3 == 0)
// //         console.log("Fizz");
// //     else if (i % 5 == 0)
// //         console.log("Buzz");
// //     else
// //         console.log(i);
// // }
