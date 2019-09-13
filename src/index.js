import './styles/app.css';
import * as PIXI from 'pixi.js';
import BitchManager from "./components/BitchManager";
import BadCat from "./components/BadCat";
import RocketManager from "./components/RocketManager";
import {hitTestRectangle} from "./CollisionUtils";
import {ScoreCounter} from "./components/ScoreCount";
import {ShockedDog} from "./components/ShockedDog";
import {ControllerPanel} from "./components/ControllerPanel";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
export const app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: window.devicePixelRatio,
    scaleMode: PIXI.SCALE_MODES.LINEAR
});
const BACKGROUND_Z_INDEX = 0;

document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x008000;

app.renderer.autoDensity = true;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

let bitchManager;
let player;
let shockedDog;
let controllerPanel;
let scoreCounter;

app.loader.add([
    "assets/repeat_button.svg",
    "assets/emoji_heart.png",
    "assets/background_grass.jpg",
    "assets/start_button.svg",
    "assets/bitch.png",
    "assets/bad_cat.png",
    "assets/sad_cat.png",
    "assets/rocket.png",
    "assets/dead_dog.png",
    "assets/shocked_dog.png"
]).load(init);

export let startGame = () => {
    controllerPanel.startGame();
    shockedDog = new ShockedDog();
    bitchManager = new BitchManager();
    player = new BadCat();
    scoreCounter = new ScoreCounter();

    controllerPanel.setPlayer(player);

    app.ticker.add(delta => gameLoop(delta));
};

export let repeatGame = () => {
    controllerPanel.startGame();
    bitchManager.clean();
    player.clean();
    scoreCounter.clean();
    shockedDog.makeDogShoсked();

    app.ticker.start();
};


function initBackground() {
    let background = new PIXI.Sprite(app.loader.resources["assets/background_grass.jpg"].texture);
    background.width = app.renderer.width;
    background.height = app.renderer.height;
    background.zIndex = BACKGROUND_Z_INDEX;
    app.stage.addChild(background);
}

function init() {
    app.stage.sortableChildren = true;
    initBackground();
    controllerPanel = new ControllerPanel();
    app.render();
}

function gameLoop() {
    BitchManager.list.forEach(function (bitchSprite) {
        if (hitTestRectangle(bitchSprite, shockedDog.sprite)) {
            app.ticker.stop();
            // todo cover everything by rectangle
            bitchManager.stopBitchesProducing();
            scoreCounter.showFinal();
            controllerPanel.stopGame()
            player.makeCatSad();
            shockedDog.makeDogDead();
        }
    });

    bitchManager.update();
    player.update();
    scoreCounter.update();
    controllerPanel.update();

    RocketManager.list.forEach((rocket, rocketIndex) =>
    {
        let hasCollision = false;
        BitchManager.list.forEach(function (bitchSprite, bitchIndex) {
            if (hitTestRectangle(bitchSprite, rocket.sprite)) {
                app.stage.removeChild(bitchSprite);
                app.stage.removeChild(rocket.sprite);
                BitchManager.list.splice(bitchIndex, 1);
                RocketManager.list.splice(rocketIndex, 1);
                scoreCounter.increaseScore();
                hasCollision = true;
            }
        });
        if (!hasCollision && !rocket.sprite.destroyed) {
            rocket.update();
        }
    });
}

