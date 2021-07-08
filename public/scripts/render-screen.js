export function setUpOptionsFunctions(startButton, game) {
    // const start = () => {
    //     game.start({ type: 'game-start', frequency: 1000 })
    // }
    startButton.onclick = () => {
        game.stop()
    }
}

export function setUpScreen(canvas, game) {
    const { width, height } = game.state.screen
    canvas.width = width
    canvas.height = height
}

export default function renderScreen(screen, game, currentPlayerId, requestAnimationFrame) {
    const { width, height } = game.state.screen
    const context = screen.getContext('2d')
    context.clearRect(0, 0, width, height)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }
    
    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    currentPlayer && (
        context.fillStyle = '#F0DB4F',
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    )

    renderRanking(game, currentPlayerId)

    requestAnimationFrame(() => {
        renderScreen(screen, game, currentPlayerId, requestAnimationFrame)
    })
}

function renderRanking(game, currentPlayerId) {
    const playersArray = []

    for (const playerId in game.state.players) {
        const { x, y, points } = game.state.players[playerId]

        playersArray.push({
            playerId,
            x,
            y,
            points,
        })
    }
    
    playersArray.sort((a, b) => {
        return b.points - a.points
    })

    const topTen = playersArray.slice(0, 10)

    const ol = document.querySelector('#ranking ol')
    ol.innerHTML = ''

    for (const index in topTen) {
        const player = topTen[index]

        ol.innerHTML += `
            <li class=${player.playerId === currentPlayerId ? 'current-player' : ''}>
                ${player.playerId} ${player.playerId === currentPlayerId ? '(Você)' : ''} | ${player.points} ponto(s)
            </li>
        `
    }
}