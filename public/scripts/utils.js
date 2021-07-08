/* Mod que retorna positivo para números negativos */
export const mod = (x, y) => ((y % x) + x) % x

// player.y = Math.max(player.y - 1, 0)
// player.y = Math.min(player.y + 1, state.screen.height - 1)
// player.x = Math.max(player.x - 1, 0)
// player.x = Math.min(player.x + 1, state.screen.width - 1)