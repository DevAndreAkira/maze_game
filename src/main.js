import { maze, mazeHeight, mazeWidth } from "./maze.js";

export const proporcao = { value: 50 };

export let app = new PIXI.Application({
    backgroundColor: 0xf2c3b2,
    // backgroundAlpha: 0.05,
    antialias: true,
    width: mazeWidth.value * proporcao.value,
    height: mazeHeight.value * proporcao.value
});
document.body.appendChild(app.view);

maze();