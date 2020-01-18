/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let score = [0, 0]
let roundscore = 0
let player = 0
let playable = false
let needs = 102
let previous = 0
document.querySelector(".btn-roll").addEventListener('click', function () {
    if (playable) {

        let dicenum1 = Math.floor(Math.random(0, 1) * 6) + 1
        let dicenum2 = Math.floor(Math.random(0, 1) * 6) + 1

        let dice1 = document.querySelector("#dice-1")
        dice1.src = "dice-" + dicenum1 + ".png"
        let dice2 = document.querySelector("#dice-2")
        dice2.src = "dice-" + dicenum2 + ".png"
        if (dicenum1 === 6 || dicenum2 === 6) {
            previous++
            if (previous === 2) {
                score[player] = 0
                roundscore = 0
                document.querySelector('#current-' + player).innerHTML = roundscore
                document.querySelector('#score-' + player).innerHTML = score[player]
                nextPlayer()
            }
        } else previous = 0
        if (dicenum1 != 1 && dicenum2 != 1) {

            roundscore += dicenum1 + dicenum2
            document.querySelector('#current-' + player).innerHTML = roundscore

        } else {
            roundscore = 0
            document.querySelector('#current-' + player).innerHTML = roundscore
            nextPlayer();
        }
    } else alert('Click new game to play!')
})

document.querySelector(".btn-hold").addEventListener('click', function () {
    if (playable) {

        let total = roundscore + score[player]
        score[player] = total
        document.querySelector('#score-' + player).innerHTML = total
        roundscore = 0
        document.querySelector('#current-' + player).innerHTML = roundscore
        winner()
    } else alert('Click new game to play!')

})

document.querySelector(".btn-new").onclick = newgame




function nextPlayer() {
    previous = 0
    document.querySelector('.player-' + player + '-panel').classList.remove('active')
    if (player === 0) player = 1
    else player = 0
    document.querySelector('.player-' + player + '-panel').classList.add('active')
}

function newgame() {
    needs = 101
    if (document.querySelector('.score').value !== '') needs = document.querySelector('.score').value
    let pl = "PLAYER " + (player + 1)
    document.querySelector('.player-' + player + '-panel').classList.remove('winner')
    document.querySelector('#name-' + player).innerHTML = pl
    playable = true
    roundscore = 0
    document.querySelector('.player-' + 0 + '-panel').classList.add('active')
    document.querySelector('.player-' + 1 + '-panel').classList.remove('active')
    for (let i = 0; i < 2; i++) {
        document.querySelector('#score-' + i).innerHTML = 0
        document.querySelector('#current-' + i).innerHTML = roundscore
        score[i] = 0
    }

}

function winner() {
    if (score[player] > needs) {
        playable = false
        document.querySelector('#name-' + player).innerHTML = 'Winner!!!!!!'
        document.querySelector('.player-' + player + '-panel').classList.add('winner')
        document.querySelector('.player-' + player + '-panel').classList.remove('active')
    } else nextPlayer()
}