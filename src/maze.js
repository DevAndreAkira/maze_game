import { MovingArrowOld } from "./MovingArrow.js";
import { app, proporcao } from "./main.js";

export const mazeWidth = { value: window.innerWidth < 991 ? 11 : 21 };
export const mazeHeight = { value: window.innerWidth < 991 ? 13 : 11 };

export let keyObj = {};
export let doorObj = {};
export let keySprite = {};
export let doorSprite = {};

export function maze() {
    const tileSize = proporcao.value;
    const containerMaze = new PIXI.Container();
    app.stage.addChild(containerMaze);

    // Adicionando tipos de célula para representar a chave e a porta
    const CELL_WALL = 1;
    const CELL_PATH = 0;
    const CELL_KEY = 2;
    const CELL_DOOR = 3;

    function generateRandomMaze(width, height) {
        const maze = Array.from({ length: height }, () => Array.from({ length: width }, () => CELL_WALL));

        function carveMaze(x, y) {
            maze[y][x] = CELL_PATH; // Abre o caminho na posição atual

            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // Direções possíveis: direita, esquerda, baixo, cima
            directions.sort(() => Math.random() - 0.5); // Embaralha as direções

            for (const [dx, dy] of directions) {
                const nx = x + dx * 2;
                const ny = y + dy * 2;

                if (nx >= 0 && nx < width && ny >= 0 && ny < height && maze[ny][nx] === CELL_WALL) {
                    maze[y + dy][x + dx] = CELL_PATH; // Remove a parede entre as células
                    carveMaze(nx, ny); // Move para a próxima célula
                }
            }
        }

        carveMaze(1, 1); // Começa a escavar a partir da posição inicial

        return maze;
    }

    function placeKeyAndDoor(maze) {
        // Encontra todas as células PATH no labirinto
        const pathCells = [];
        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                if (maze[y][x] === CELL_PATH) {
                    pathCells.push({ x, y });
                }
            }
        }

        // Escolhe aleatoriamente uma célula PATH para a chave
        const randomIndexKey = Math.floor(Math.random() * pathCells.length);
        const { x: keyX, y: keyY } = pathCells.splice(randomIndexKey, 1)[0];
        maze[keyY][keyX] = CELL_KEY;

        // Escolhe aleatoriamente outra célula PATH para a porta
        const randomIndexDoor = Math.floor(Math.random() * pathCells.length);
        const { x: doorX, y: doorY } = pathCells[randomIndexDoor];
        maze[doorY][doorX] = CELL_DOOR;
    }

    function drawMaze(maze) {
        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                const wallSprite = PIXI.Sprite.from('./assets/images/block.png');
                const pathSprite = PIXI.Sprite.from('./assets/images/grass.jpg');

                wallSprite.width = tileSize;
                wallSprite.height = tileSize;
                pathSprite.width = tileSize;
                pathSprite.height = tileSize;

                wallSprite.x = x * tileSize;
                wallSprite.y = y * tileSize;
                pathSprite.x = x * tileSize;
                pathSprite.y = y * tileSize;

                containerMaze.addChild(wallSprite); // Adiciona as paredes primeiro
                switch (maze[y][x]) {
                    case CELL_PATH:
                        containerMaze.addChild(pathSprite);
                        break;
                }
            }
        }

        let doorTexture = PIXI.Texture.from('./assets/images/door.png');

        placeKeyAndDoor(maze); // Adiciona a chave e a porta depois do caminho ser gerado
        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                keySprite = PIXI.Sprite.from('./assets/images/key.png');
                doorSprite = PIXI.Sprite.from(doorTexture);

                keySprite.width = tileSize;
                keySprite.height = tileSize;
                doorSprite.width = tileSize;
                doorSprite.height = tileSize;

                keySprite.x = x * tileSize;
                keySprite.y = y * tileSize;
                doorSprite.x = x * tileSize;
                doorSprite.y = y * tileSize;

                switch (maze[y][x]) {
                    case CELL_KEY:
                        containerMaze.addChild(keySprite);
                        getKeyCoordinates(keySprite);

                        break;
                    case CELL_DOOR:
                        containerMaze.addChild(doorSprite);
                        getDoorCoordinates(doorSprite);
                        break;
                }
            }
        }
    }

    function getKeyCoordinates(key) {
        return keyObj = { x: key.x, y: key.y }
    }

    function getDoorCoordinates(door) {
        return doorObj = { x: door.x, y: door.y }
    }

    const keyCoordinates = getKeyCoordinates(maze);
    const doorCoordinates = getDoorCoordinates(maze);

    const randomMaze = generateRandomMaze(mazeWidth.value, mazeHeight.value);
    drawMaze(randomMaze);

    // Passando arrayParedes para MovingArrowOld
    MovingArrowOld({ container: containerMaze, arrayParedes: randomMaze, keyCoordinates, doorCoordinates });
}
