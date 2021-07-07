import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()
game.addPlayer({playerId:'player1', x:3, y:6})
game.addFruit({fruitId:'fruit1', x:5, y:3})

sockets.on('connection', socket => {
    const playerId = socket.id
})

server.listen(8000, () => {
    console.log('> Server listening on port 8000')
})