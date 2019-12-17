var socket = io();

socket.on('connect', function() {
    /* add socket id to state */
    state.me = socket.id;
})

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
    /* get game id */
    var gameId = prompt('Game ID')
        .toLowerCase()
        .trim()
    /* emit join game */
    socket.emit('joinGame', {
        gameId,
    })
    /* add game id to state */
    state.gameId = gameId
}

socket.on('newGameCreated', function(data) {
    var gameId = data.gameId;
    /* hide landing */
    document.getElementById('landing').setAttribute('class', 'hidden');
    /* unhide waiting room */
    document.getElementById('waitingForPlayers').setAttribute('class', '');
    /* show game id */
    document.getElementById('gameId').innerText = gameId;
    /* add game id to state */
    state.gameId = gameId
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
    /* show game */
    document.getElementById('game').setAttribute('class', '');
})

socket.on('error2', function(message) {
    alert(message);
})

socket.on('otherPlayerMilked', function() {
    alert('other player milked the cow');
})

function milkCow() {
    /* notify server that cow has been milked */
    socket.emit('milkCow', {
        gameId: state.gameId,
        socketId: state.me
    })
}