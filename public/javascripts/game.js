var socket = io();

/** 
 * Create new game
 */
function newGame() {
    socket.emit('newGame');
}

/**
 * Join existing game
 */
function joinGame() {
    var gameId = prompt('Game ID')
    socket.emit('joinGame', {
        gameId,
    })
}

socket.on('newGameCreated', function(data) {
    var gameId = data.gameId;
    /* hide landing */
    document.getElementById('landing').setAttribute('class', 'hidden');
    /* unhide waiting room */
    document.getElementById('waitingForPlayers').setAttribute('class', '');
    /* show game id */
    document.getElementById('gameId').innerText = gameId;
});

socket.on('showCountdown', function() {
    /* hide landing */
    document.getElementById('landing').setAttribute('class', 'hidden');
    /* hide waiting room */
    document.getElementById('waitingForPlayers').setAttribute('class', 'hidden');
    /* show countdown */
    document.getElementById('gameCountdown').setAttribute('class', '');
})

socket.on('startGame', function() {
    /* hide countdown */
    document.getElementById('gameCountdown').setAttribute('class', 'hidden');
})

socket.on('error2', function(message) {
    alert(message);
})