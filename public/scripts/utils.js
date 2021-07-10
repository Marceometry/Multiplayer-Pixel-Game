/* Mod que retorna positivo para números negativos */
/* Teletransporta para o lado oposto do mapa */
export const mod = (x, y) => ((y % x) + x) % x

/* Barra o jogador nas bordas do mapa */
// player.y = Math.max(player.y - 1, 0)
// player.y = Math.min(player.y + 1, state.screen.height - 1)
// player.x = Math.max(player.x - 1, 0)
// player.x = Math.min(player.x + 1, state.screen.width - 1)

/* opções de cores */
export const colorOptions = [
    '#f04f4f',
    '#f08f4f',
    '#F0DB4F',
    '#5cf04f',
    '#4ff0d5',
    '#4f8ff0',
    '#674ff0',
    '#ca4ff0',
    '#f04fe3',
    '#f04f9f',
    '#cccccc'
]