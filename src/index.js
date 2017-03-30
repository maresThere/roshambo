if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
let playerWins = 0
let playerWinsBouts = 0
let computerWinsBouts = 0
let playerWinsMatches = 0
let compputerWinsMatches = 0
let playerWonMatch = false
let computerNextMove

const handleButtonClick = (event) => {
  const player = event.target.className
  const computer = getComputerMove()
  let playerDidWin
  $('figure.player img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${player}.svg`
  $('figure.computer img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${computer}.svg`
  console.log('hello')

    if (player === 'rock') {
      if (computer === 'paper'){
        computerWins++
        computerNextMove = 'rock'
      }
      if (computer === 'scissors'){
          playerWins++
          computerNextMove = 'rock'
      }
      if (computer === 'rock'){
        computerNextMove = 'paper'
      }
      else if (player === 'paper') {
        if (computer === ' rock') {
          playerWins++
          computerNextMove = 'paper'
        }
        if (computer === 'scissors'){
          computerWins++
          computerNextMove = 'scissors'
        }
        if (computer=== 'paper'){
          computerNextMove = 'scissors'
        }

      } else if (player === 'scissors') {
        if (computer === 'rock'){
          computerWins++
          computerNextMove = 'scissors'
        }
        if (computer === 'paper'){
          playerWins++
          computerNextMove = 'scissors'
        }
        if (computer === 'scissors') {
          computerNextMove = 'rock'
        }
      }

    $('span.player').textContent = playerWins
    $('span.computer').textContent = computerWins
    if(playerWins == 2) {
      playerDidWin = true
      gameOver(playerDidWin)
    }
    if(computerWins == 2) {
      playerDidWin = false
      gameOver(playerDidWin)
    }



  //HINT: Check for win, lose or draw, then call `gameOver()` eventually.
 //

const getComputerMove = () => {
  const moves = ['rock', 'paper', 'scissors']
  if (playerWins === 0 && computerWins == 0) {
  return moves[Math.floor(Math.random() * moves.length)]
} else {
  return computerNextMove
}


// HINT: Try calling `gameOver(true)` in the console.
const gameOver = (playerDidWin) => {
  window.setTimeOut(() => {
  if (playerDidWin) {
    playerWinsBouts++
    if (playerWinsBouts === 2){
      playerWonMatch = true
      matchOver(playerWonMatch)
    } else {
       $('.dialog .whoWon').textContent = `You won the bout!`
       $('.dialog .boutCounter').textContent = `${playerWinsBouts} : ${computerWinsBouts}`
      }
  } else {
    computerWinsBouts++
     if(computerWinsBouts === 2){
      playerWonMatch = false
      matchOver(playerWonMatch)
     }  else {
       $('.dialog .whoWon').textContent = 'You lost the bout!'
       $('.dialog .boutCounter').textContent = `${playerWinsBouts} : ${computerWinsBouts}`
      }
    }

   $('body').className = 'modal'
  }, 25)
}
const matchOver = (playerWonMatch) => {
  resetGame()
  playerWinsBouts = 0
  computerWinsBouts = 0
  if(playerWonMatch) {
    playerWinsMatches++
    $('dialog.whoWon').textContent = `You won the match`
    $('playerMatches').textContent = `${playerWinsMatches}`
    $('dialog.boutCounter').textContent = `Matches: ${playerWinsMatches} | ${compputerWinsMatches}`
  } else {
    computerWinsMatches++
    $('dialog.whoWon').textContent = `You lost the match`
    $('computerMatches').textContent = `${computerWinsMatches}`
    $('dialog.boutCounter').textContent = `Matches: ${playerWinsMatches} | ${compputerWinsMatches}`
  }
}

const resetGame = () => {
  // TODO: Probably need to do more to reset the game here...
  $('figure.player img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('figure.computer img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('body').className = ''
  playerWins = 0
  computerWins = 0
  $('span.player').textContent = playerWins
  $('span.computer').textContent = computerWins
}

const main = () => {
  const buttons = $$('.player-input button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick)
  }
  $('.dialog button').addEventListener('click', resetGame)
}


document.addEventListener('DOMContentLoaded', main)
if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
