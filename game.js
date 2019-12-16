var friendlyWords = require('friendly-words');

/**
 * Initialize game
 */
exports.initGame = function(io, socket) {
    socket.on('newGame', newGame);
}

/**
 * Create new game
 */
function newGame() {
    /* create game id */
    var gameId = friendlyWords.objects[Math.floor(Math.random()*friendlyWords.objects.length)];
    /* emit game to client */
    this.emit('newGameCreated', {
        gameId,
        socketId: this.id
    });
    /* join game room */
    this.join(gameId);
}