export default function createGame() {
    const state = {
        screen: {
            width: 10,
            height: 10
        },
        players: {},
        fruits: {}
    }

    const observers = []
    let interval = null

    function start(command) {
        const frequency = command.frequency

        interval = setInterval(addFruit, frequency)

        console.log('game start')

        // notifyAll(command)
    }

    function stop() {
        // clearInterval(interval)
        // notifyAll({ type: 'game-stop' })
        console.log('stop')
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }
    
    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const { playerId } = command
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)
        const points = 'points' in command ? command.points : 0

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            points
        }

        notifyAll({
            type: 'add-player',
            playerId,
            playerX,
            playerY,
            points
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

        notifyAll({
            type: 'remove-fruit',
            fruitId
        })
    }

    function movePlayer(command) {
        notifyAll(command)

        const acceptedMoves = {
            ArrowUp(player) {
                player.y = Math.max(player.y - 1, 0)
            },
            ArrowDown(player) {
                player.y = Math.min(player.y + 1, state.screen.height - 1)
            },
            ArrowLeft(player) {
                player.x = Math.max(player.x - 1, 0)
            },
            ArrowRight(player) {
                player.x = Math.min(player.x + 1, state.screen.width - 1)
            }
        }

        const { keyPressed, playerId } = command
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]
        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(player)
        }
    }

    function checkForFruitCollision(player) {
        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]

            if (player.x === fruit.x && player.y === fruit.y) {
                removeFruit({ fruitId })
                player.points++
            }
        }
    }

    return {
        state,
        setState,
        subscribe,
        start,
        stop,
        addPlayer,
        addFruit,
        removeFruit,
        removePlayer,
        movePlayer
    }
}