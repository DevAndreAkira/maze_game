import { app, proporcao } from "./main.js";
import { colisionWall } from "./colisionWall.js";
import { doorObj, doorSprite, keyObj, keySprite, maze } from "./maze.js";
// import { protagonistaChar } from "./protagonista.js";

let ultimoPasso;
let chave = false;
let porta = false;

export function MovingArrowOld({ container, arrayParedes }) {

    const protagonista = PIXI.Sprite.from('https://devandreakira.github.io/static/media/mee.a3fc03ed48d4a6483210.png');
    protagonista.anchor.set(0.5);
    protagonista.width = proporcao.value;
    protagonista.height = proporcao.value;
    protagonista.x = (proporcao.value + proporcao.value / 2);
    protagonista.y = (proporcao.value + proporcao.value / 2);
    container.addChild(protagonista);

    console.log(protagonista.width);

    document.addEventListener('keydown', function (e) {
        if (!protagonista.transform) {
            return;
        }
        else {
            ultimoPasso = {
                positionX: protagonista.x,
                positionY: protagonista.y
            }
        }
        if (e.key === "ArrowRight" || e.key === "d") {
            protagonista.x += proporcao.value;
        }
        if (e.key === "ArrowLeft" || e.key === "a") {
            protagonista.x -= proporcao.value;
        }
        if (e.key === "ArrowUp" || e.key === "w") {
            protagonista.y -= proporcao.value;
        }
        if (e.key === "ArrowDown" || e.key === "s") {
            protagonista.y += proporcao.value;
        }
        console.log("Char", protagonista.x, protagonista.y);

        if (protagonista.x === (keyObj.x + proporcao.value / 2) && protagonista.y === (keyObj.y + proporcao.value / 2) && !chave) {
            console.log("Pegou a chave");
            if (!chave) {
                keySprite.destroy(true);
                chave = true;
                console.log(doorSprite.texture);
                const novaTextura = PIXI.Texture.from('../assets/images/door-op.png');
                doorSprite.texture.baseTexture = novaTextura;
                console.log(doorSprite.texture);
            }
        }
        if (protagonista.x === (doorObj.x + proporcao.value / 2) && protagonista.y === (doorObj.y + proporcao.value / 2) && chave) {
            container.destroy(true);
            chave = false;
            maze();
        }
        else {
            colisionWall(protagonista, ultimoPasso.positionX, ultimoPasso.positionY, arrayParedes);
        }

    })
}