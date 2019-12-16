var socket = io();

/** 
 * Create new game
 */
function newGame() {
    socket.emit('newGame');
}

socket.on('newGameCreated', function(data) {
    var gameId = data.gameId;
    /* hide new game button */
    document.getElementById('newGame').setAttribute('class', 'hidden');
    /* unhide waiting room */
    document.getElementById('waitingForPlayers').setAttribute('class', '');
    /* show game id */
    document.getElementById('gameId').innerText = gameId;
});