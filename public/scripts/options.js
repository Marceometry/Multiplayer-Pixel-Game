import { colorOptions } from './utils.js'

export function playerOptions(socket) {
    const changeUsername = document.getElementById("change-username")
    changeUsername.onclick = () => {
        const username = document.getElementById("username").value

        if (username.length > 20 || username.length < 3) {
            alert('Nome inválido')
            return
        }

        socket.emit('change-username', {
            type: 'change-username',
            playerId: socket.id,
            username
        })
    }

    const colorOptionsContainer = document.getElementById('color-options-container')
    for (let i = 0; i < colorOptions.length; i++) {
        const color = colorOptions[i]
        
        const button = document.createElement('button')
        colorOptionsContainer.appendChild(button)
        button.classList.add('color-option')
        button.style.background = color

        button.onclick = () => {
            socket.emit('change-player-color', {
                type: 'change-player-color',
                playerId: socket.id,
                color
            })
        }
    }
}

export function adminOptions(socket) {
    const startButton = document.getElementById("start-button")
    startButton.onclick = () => {
        const gameIntervalInput = document.getElementById("game-interval").valueAsNumber
        const fruitIntervalInput = document.getElementById("fruit-interval").valueAsNumber
        const bombIntervalInput = document.getElementById("bomb-interval").valueAsNumber

        let gameIntervalValue = 30000
        let fruitIntervalValue = 1500
        let bombIntervalValue = 0

        !isNaN(gameIntervalInput) && gameIntervalInput > 0 && (
            gameIntervalValue = gameIntervalInput
        )
        !isNaN(fruitIntervalInput) && fruitIntervalInput > 0 && (
            fruitIntervalValue = fruitIntervalInput
        )
        bombIntervalInput >= 500 && (
            bombIntervalValue = bombIntervalInput
        )

        const countdown = 3000

        socket.emit('start-countdown', {
            type: 'start-countdown',
            countdown,
            fruitIntervalValue,
            gameIntervalValue,
            bombIntervalValue
        })
    }

    const stopButton = document.getElementById("stop-button")
    stopButton.onclick = () => {
        socket.emit('game-stop', { type: 'game-stop' })
    }

    const removeAllFruits = document.getElementById("remove-all-fruits")
    removeAllFruits.onclick = () => {
        socket.emit('remove-all-fruits', {
            type: 'remove-all-fruits'
        })
    }

    const removeAllBombs = document.getElementById("remove-all-bombs")
    removeAllBombs.onclick = () => {
        socket.emit('remove-all-bombs', {
            type: 'remove-all-bombs'
        })
    }

    const removeAllPoints = document.getElementById("remove-all-points")
    removeAllPoints.onclick = () => {
        socket.emit('remove-all-points', {
            type: 'remove-all-points'
        })
    }
}