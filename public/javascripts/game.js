var socket = io();

/** 
 * Create new game
 */
function newGame() {
    socket.emit('newGame')
}