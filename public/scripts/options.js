import { colorOptions } from './utils.js'

export default function setUpOptionsFunctions(socket) {
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

    const startButton = document.getElementById("start-button")
    startButton.onclick = () => {
        const gameIntervalInput = document.getElementById("game-interval").valueAsNumber
        const fruitIntervalInput = document.getElementById("fruit-interval").valueAsNumber

        let gameIntervalValue = 20000
        let fruitIntervalValue = 1500

        !isNaN(gameIntervalInput) && gameIntervalInput > 0 && (
            gameIntervalValue = gameIntervalInput
        )
        !isNaN(fruitIntervalInput) && fruitIntervalInput > 0 && (
            fruitIntervalValue = fruitIntervalInput
        )
        
        socket.emit('game-start', {
            type: 'game-start',
            fruitIntervalValue,
            gameIntervalValue
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

    const removeAllPoints = document.getElementById("remove-all-points")
    removeAllPoints.onclick = () => {
        socket.emit('remove-all-points', {
            type: 'remove-all-points'
        })
    }
}