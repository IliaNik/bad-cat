import './styles/app.css';
import * as PIXI from 'pixi.js';
import BitchManager from "./components/BitchManager";
import BadCat from "./components/BadCat";
import RocketManager from "./components/RocketManager";
import {hitTestRectangle} from "./CollisionUtils";
import {ScoreCounter} from "./components/ScoreCount";
import {ShockedDog} from "./components/ShockedDog";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
export const app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
});

const BUTTON_Z_INDEX = 1;
const BACKGROUND_Z_INDEX = 0;

// The application will create a canvas element for you that you
// can then insert into the DOM

document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x008000;

app.renderer.autoDensity = true;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

let bitchManager;
let player;
let startButton;
let shockedDog;

let repeatButton;
let scoreCounter;

app.loader.add([
    "assets/repeat_button.svg",
    "assets/background_grass.jpg",
    "assets/start_button.svg",
    "assets/bitch.png",
    "assets/bad_cat.png",
    "assets/rocket.png",
    "assets/shocked_dog.png"
]).load(init);

let startGame = () => {
    app.stage.removeChild(startButton);

    shockedDog = new ShockedDog();
    bitchManager = new BitchManager();
    player = new BadCat();
    scoreCounter = new ScoreCounter();

    app.ticker.add(delta => gameLoop(delta));
};

let repeatGame = () => {
    app.stage.removeChild(repeatButton);

    bitchManager.clean();
    player.clean();
    scoreCounter.clean();

    app.ticker.start();
};

function initButtons() {
    startButton = new PIXI.Sprite(app.loader.resources["assets/start_button.svg"].texture);
    repeatButton = new PIXI.Sprite(app.loader.resources["assets/repeat_button.svg"].texture);

    startButton.buttonMode = true;
    repeatButton.buttonMode = true;

    startButton.zIndex = BUTTON_Z_INDEX;
    repeatButton.zIndex = BUTTON_Z_INDEX;

    startButton.anchor.set(0.5);
    repeatButton.anchor.set(0.5);
    startButton.width = app.screen.height * 0.3;
    startButton.height = app.screen.height * 0.3;
    repeatButton.width = app.screen.height * 0.3;
    repeatButton.height = app.screen.height * 0.3;

    startButton.position.x = app.stage.width / 2;
    startButton.position.y = app.stage.height / 2;
    repeatButton.position.x = app.stage.width / 2;
    repeatButton.position.y = app.stage.height / 2;
    startButton.interactive = true;
    repeatButton.interactive = true;


    startButton
        .on('tap', startGame)
        .on('click', startGame);

    repeatButton
        .on('tap', repeatGame)
        .on('click', repeatGame);


    app.stage.addChild(startButton);
}

function initBackground() {
    let background = new PIXI.Sprite(app.loader.resources["assets/background_grass.jpg"].texture);
    background.width = app.renderer.width;
    background.height = app.renderer.height;
    background.zIndex = BACKGROUND_Z_INDEX;
    app.stage.addChild(background);
}

function init() {
    initBackground();
    initButtons();
    app.render();
}

function gameLoop() {
    BitchManager.list.forEach(function (bitchSprite) {
        if (hitTestRectangle(bitchSprite, player.sprite)
            || hitTestRectangle(bitchSprite, shockedDog.sprite)) {
            app.ticker.stop();
            // todo cover everything by rectangle
            bitchManager.stopBitchesProducing();
            scoreCounter.showFinal();
            app.stage.addChild(repeatButton);
        }
    });

    bitchManager.update();
    player.update();
    scoreCounter.update();

    RocketManager.list.forEach((rocket, rocketIndex) =>
    {
        let hasCollision = false;
        BitchManager.list.forEach(function (bitchSprite, bitchIndex) {
            if (hitTestRectangle(bitchSprite, rocket.sprite)) {
                app.stage.removeChild(bitchSprite);
                app.stage.removeChild(rocket.sprite);
                BitchManager.list.splice(bitchIndex, 1);
                RocketManager.list.splice(rocketIndex, 1);
                hasCollision = true;
            }
        });
        if (!hasCollision && !rocket.sprite.destroyed) {
            rocket.update();
        }
    });
}

