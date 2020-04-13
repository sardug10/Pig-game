/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores,activePlayer,roundScore,gamePlaying=true;

alert("GAME RULES: 1) The game has 2 players, playing in rounds");
alert("2) In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score");
alert("3) BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn");
alert("4) The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn");
alert("5) The first player to reach 100 points on GLOBAL score wins the game");


init();

//console.log(dice);

//document.querySelector('#current-'+ activePlayer).innerHTML = dice;




//Setting up 'Roll the Dice' button
document.querySelector('.btn-roll').addEventListener('click',function(){

    if(gamePlaying){
        // Random number
        var dice = Math.floor(Math.random()*6)+1;
        
        //Change the image
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'pig game/dice-' + dice + '.png';
        
        //update the score of current player if dice number is not 1
        if(dice !== 1){
            //update the score
            roundScore += dice;
            document.querySelector('#current-'+ activePlayer).textContent = roundScore;
        } else {
            //make the score 0 and change the active player
            nextPlayer();
        }
    }    
});

//Setting up 'Hold' button

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
        // Adding the current score to the global score
        scores[activePlayer] += roundScore;

        // changing it on UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check if the player wins

        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            
        } else{
            //change the active player
            nextPlayer();
        }   
    }     
});


//Setting up 'New Game' button

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    roundScore = 0;
    document.querySelector('#current-'+ activePlayer).textContent = roundScore;
    activePlayer === 1 ? activePlayer =0 : activePlayer = 1;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
};

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';


    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
    

}
