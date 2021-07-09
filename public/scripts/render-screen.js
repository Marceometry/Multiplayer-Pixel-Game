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
        context.fillStyle = `${player.color}bf`
        context.fillRect(player.x, player.y, 1, 1)
    }
    
    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }
    
    for (const bombId in game.state.bombs) {
        const bomb = game.state.bombs[bombId]
        context.fillStyle = 'red'
        context.fillRect(bomb.x, bomb.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    currentPlayer && (
        context.fillStyle = currentPlayer.color,
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
        const { x, y, points, username, color } = game.state.players[playerId]

        playersArray.push({
            playerId,
            x,
            y,
            points,
            username,
            color
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
            <li style="color: ${player.color}"
                class=${player.playerId === currentPlayerId ? 'player current-player' : 'player'}
            >
                ${player.username} ${player.playerId === currentPlayerId ? '(Você)' : ''} | ${player.points}
            </li>
        `
    }
}