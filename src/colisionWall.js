import { proporcao } from "./main.js";

export function colisionWall(persona, x, y, maze) {
    const canvasWidth = Math.round(document.querySelector("canvas").offsetWidth);
    const canvasHeight = Math.round(document.querySelector("canvas").offsetHeight);
    const tileSize = proporcao.value;

    const col = Math.floor(persona.x / tileSize);
    const row = Math.floor(persona.y / tileSize);

    if (maze[row][col] === 1 ||
        persona.x > canvasWidth - (proporcao.value / 2) ||
        persona.x <= (proporcao.value / 2) ||
        persona.y > canvasHeight - (proporcao.value / 2) ||
        persona.y <= (proporcao.value / 2)) {
        console.log("%cParede!", 'color:red');
        persona.x = x;
        persona.y = y;
    }
}
