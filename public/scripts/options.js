export default function setUpOptionsFunctions(socket) {
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
}