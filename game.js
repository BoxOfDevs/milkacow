var friendlyWords = require('friendly-words');

var sio;

/**
 * Initialize game
 */
exports.initGame = function(io, socket) {
    sio = io;
    socket.on('newGame', newGame);
    socket.on('joinGame', joinGame)
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

/**
 * Join existing game
 */
function joinGame(data) {
    var gameId = data.gameId;
    var rooms = this.adapter.rooms;

    /* check if room exists */
    if (!rooms[gameId]) {
        /* room doesn't exist */
        return;
    }

    /* check if room is full (max 2 players) */
    if (Object.keys(rooms[gameId].sockets).length >= 2) {
        /* room is full */
        return;
    }

    /* join game */
    this.join(gameId);

    /* start game */
    startGame(gameId);
}

/**
 * Start game
 */
function startGame(gameId) {
    /* notify players that game is starting soon */
    sio.in(gameId).emit('showCountdown')
    /* count down and start game */
    setTimeout(function() {
        sio.in(gameId).emit('startGame')
    }, 3000);
}