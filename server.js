import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import createGame from './public/scripts/game.js'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

app.get('/admin-options', function (req, res) {
    res.sendFile(`${process.cwd()}/public/game-admin.html`)
})

server.listen(8000, () => {
    console.log('> Server listening on port 8000 (http://localhost:8000)')
})


// game //

const game = createGame()

game.subscribe(command => {
    sockets.emit(command.type, command)
})

sockets.on('connection', socket => {
    const playerId = socket.id

    game.addPlayer({ playerId })
    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({ playerId })
    })

    socket.on('game-start', command => {
        game.start(command)
    })

    socket.on('game-stop', () => {
        game.stop()
    })

    socket.on('move-player', command => {
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })

    socket.on('change-username', command => {
        command.playerId = playerId
        command.type = 'change-username'

        game.changeUsername(command)
    })

    socket.on('change-player-color', command => {
        command.playerId = playerId
        command.type = 'change-player-color'

        game.changePlayerColor(command)
    })

    socket.on('remove-all-fruits', command => {
        game.removeAllFruits(command)
    })

    socket.on('remove-all-bombs', command => {
        game.removeAllBombs(command)
    })

    socket.on('remove-all-points', command => {
        game.removeAllPoints(command)
    })
})