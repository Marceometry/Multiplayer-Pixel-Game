export default function setUpOptionsFunctions(socket) {
    const startButton = document.getElementById("start-button")
    const stopButton = document.getElementById("stop-button")

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

    stopButton.onclick = () => {
        socket.emit('game-stop', { type: 'game-stop' })
    }
}