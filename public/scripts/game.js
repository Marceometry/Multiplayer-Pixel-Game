import { mod } from './utils.js'

export default function createGame() {
    const state = {
        screen: {
            width: 25,
            height: 25
        },
        players: {},
        fruits: {},
        fruitsConsumedInThisGame: 0,
        bombs: {},
        bombsExplodedInThisGame: 0,
    }

    const observers = []
    let fruitInterval
    let bombInterval
    let gameInterval
    let chronometer

    function resetGameStats() {
        for (const playerId in state.players) {
            const player = state.players[playerId]
            
            player.fruitsConsumedInThisGame = 0
            player.bombsExplodedInThisGame = 0
        }
        state.fruitsConsumedInThisGame = 0
        state.bombsExplodedInThisGame = 0
    }
    
    function startCountdown(command) {
        resetGameStats()
        notifyAll(command)
        command.type = 'game-start'

        let totalIntervalValue = command.gameIntervalValue / 1000
        notifyAll({ type: 'chronometer', totalIntervalValue })

        const countdownInterval = setInterval(() => {
            start(command)
            clearInterval(countdownInterval)
        }, command.countdown)
    }

    function start(command) {
        const { gameIntervalValue, fruitIntervalValue, bombIntervalValue } = command
        let totalIntervalValue = gameIntervalValue / 1000
        
        clearInterval(chronometer)
        clearInterval(gameInterval)
        clearInterval(fruitInterval)
        
        addFruit()
        fruitInterval = setInterval(addFruit, fruitIntervalValue)
        if (bombIntervalValue) {
            bombInterval = setInterval(addBomb, bombIntervalValue)
        }

        gameInterval = setInterval(() => {
            stop()
        }, gameIntervalValue)

        chronometer = setInterval(() => {
            totalIntervalValue --
            if (totalIntervalValue >= 0) {
                notifyAll({ type: 'chronometer', totalIntervalValue })
            }
        }, 1000)

        notifyAll(command)
    }

    function stop() {
        clearInterval(chronometer)
        clearInterval(gameInterval)
        clearInterval(fruitInterval)
        clearInterval(bombInterval)
        notifyAll({ type: 'chronometer', totalIntervalValue: 0 })
        notifyAll({ type: 'game-stop' })
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function changeUsername(command) {
        const { playerId, username } = command
        state.players[playerId].username = username

        notifyAll(command)
    }
    
    function changePlayerColor(command) {
        const { playerId, color } = command
        state.players[playerId].color = color

        notifyAll(command)
    }

    function addPlayer(command) {
        const { playerId } = command
        const username = playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)
        const points = 'points' in command ? command.points : 0

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            points,
            username,
            color: '#cccccc',
            totalFruitsConsumed: 0,
            fruitsConsumedInThisGame: 0,
            totalBombsExploded: 0,
            bombsExplodedInThisGame: 0
        }

        notifyAll({
            type: 'add-player',
            playerId,
            playerX,
            playerY,
            points,
            username
        })
    }

    function removePlayer(command) {
        const { playerId } = command
        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId
        })
    }

    function removeAllPoints(command) {
        for (const playerId in state.players) {
            const player = state.players[playerId]
            player.points = 0
        }

        notifyAll(command)
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height)

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }

        notifyAll({
            type: 'add-fruit',
            fruitId,
            fruitX,
            fruitY
        })
    }

    function removeFruit(command) {
        const { fruitId } = command
        delete state.fruits[fruitId]

        notifyAll(command)
    }

    function removeAllFruits(command) {
        for (const fruitId in state.fruits) {
            delete state.fruits[fruitId]
        }

        notifyAll(command)
    }

    function addBomb(command) {
        const bombId = command ? command.bombId : Math.floor(Math.random() * 10000000)
        const bombX = command ? command.bombX : Math.floor(Math.random() * state.screen.width)
        const bombY = command ? command.bombY : Math.floor(Math.random() * state.screen.height)

        state.bombs[bombId] = {
            x: bombX,
            y: bombY
        }

        notifyAll({
            type: 'add-bomb',
            bombId,
            bombX,
            bombY
        })
    }

    function removeBomb(command) {
        const { bombId } = command
        delete state.bombs[bombId]

        notifyAll(command)
    }

    function removeAllBombs(command) {
        for (const bombId in state.bombs) {
            delete state.bombs[bombId]
        }

        notifyAll(command)
    }

    function movePlayer(command) {
        notifyAll(command)

        const acceptedMoves = {
            ArrowUp(player) {
                player.y = mod(state.screen.height, player.y - 1)
            },
            ArrowDown(player) {
                player.y = mod(state.screen.height, player.y + 1)
            },
            ArrowLeft(player) {
                player.x = mod(state.screen.width, player.x - 1)
            },
            ArrowRight(player) {
                player.x = mod(state.screen.width, player.x + 1)
            }
        }

        const { keyPressed, playerId } = command
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]
        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(player)

            Object.keys(state.bombs).length > 0 && checkForBombCollision(player)
        }
    }

    function checkForFruitCollision(player) {
        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]

            if (player.x === fruit.x && player.y === fruit.y) {
                removeFruit({ type: 'remove-fruit', fruitId })
                state.fruitsConsumedInThisGame ++
                player.totalFruitsConsumed++
                player.fruitsConsumedInThisGame++
                player.points++
            }
        }
    }

    function checkForBombCollision(player) {
        for (const bombId in state.bombs) {
            const bomb = state.bombs[bombId]

            if (player.x === bomb.x && player.y === bomb.y) {
                removeBomb({ type: 'remove-bomb', bombId })
                state.bombsExplodedInThisGame ++
                player.totalBombsExploded++
                player.bombsExplodedInThisGame++
                player.points--
            }
        }
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    return {
        state,
        setState,
        subscribe,
        startCountdown,
        resetGameStats,
        start,
        stop,
        changeUsername,
        changePlayerColor,
        addPlayer,
        removePlayer,
        removeAllPoints,
        addFruit,
        removeFruit,
        removeAllFruits,
        addBomb,
        removeBomb,
        removeAllBombs,
        movePlayer
    }
}