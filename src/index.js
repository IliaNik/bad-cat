import './styles/app.css';
import * as PIXI from 'pixi.js';
import BitchManager from "./components/BitchManager";
import BadCat from "./components/BadCat";
import RocketManager from "./components/RocketManager";
import {hitTestRectangle} from "./CollisionUtils";
import {ScoreCounter} from "./components/ScoreCount";
import {ShockedDog} from "./components/ShockedDog";
import {ControllerPanel} from "./components/ControllerPanel";
import {cleanAnimationSprites, prologueAnimation} from "./PrologueAnimation";

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
let prologueSound = document.getElementById("prologue_sound");
let gameSound = document.getElementById("game_sound");
let finalSadSound = document.getElementById("final_sad_song");
let ohMySound = document.getElementById("oh_my");
let startSerenaSound = document.getElementById("start_serena");
ohMySound.volume = 1.0;
finalSadSound.volume = 0.1;

let bitchManager;
let player;
let shockedDog;
let controllerPanel;
let scoreCounter;

app.loader.add([
    "assets/buttons/play_button.svg",
    "assets/buttons/pause_button.svg",
    "assets/buttons/start_button.svg",
    "assets/buttons/repeat_button.svg",
    "assets/prologue/confused_cat.png",
    "assets/prologue/confused_dog.png",
    "assets/prologue/love_cat.png",
    "assets/prologue/love_dog.png",
    "assets/prologue/silent_film_text.jpg",
    "assets/emoji_heart.png",
    "assets/background_grass.jpg",
    "assets/bitch.png",
    "assets/bad_cat.png",
    "assets/sad_cat.png",
    "assets/rocket.png",
    "assets/dead_dog.png",
    "assets/prologue/old_film_effect.jpg",
    "assets/shocked_dog.png"
]).load(init);


export let playPrologue = () => {
    prologueSound.play();
    app.ticker.add(prologueAnimationLoop);
};

export let pausePrologue = () => {
    prologueSound.pause();
    app.ticker.remove(prologueAnimationLoop);
};

let prologueAnimationLoop = () => {
    let isAnimationFinished = prologueAnimation();
    if (isAnimationFinished) {
        prologueSound.pause();
        controllerPanel.makeReadyToStartGame();
        app.ticker.remove(prologueAnimationLoop);
    }
};

export let startGame = () => {
    cleanAnimationSprites();
    prologueSound.pause();
    startSerenaSound.play();
    gameSound.play();

    controllerPanel.startGame();
    shockedDog = new ShockedDog();
    bitchManager = new BitchManager();
    player = new BadCat();
    scoreCounter = new ScoreCounter();

    controllerPanel.setPlayer(player);

    app.ticker.add(gameLoop);
};

export let repeatGame = () => {
    startSerenaSound.play();
    gameSound.play();

    controllerPanel.startGame();
    bitchManager.clean();
    player.clean();
    scoreCounter.clean();
    shockedDog.makeDogShocked();

    app.ticker.start();
};


function initBackground() {
    let background = new PIXI.Sprite(app.loader.resources["assets/background_grass.jpg"].texture);
    background.width = app.screen.width;
    background.height = app.screen.height;
    background.zIndex = BACKGROUND_Z_INDEX;
    app.stage.addChild(background);
}

function init() {
    app.stage.sortableChildren = true;
    initBackground();
    controllerPanel = new ControllerPanel();
    app.render();
}

let gameLoop = () => {
    BitchManager.list.forEach(function (bitchSprite) {
        if (hitTestRectangle(bitchSprite, shockedDog.sprite)) {
            app.ticker.stop();
            bitchManager.stopBitchesProducing();
            scoreCounter.showFinal();
            controllerPanel.stopGame();
            player.makeCatSad();
            shockedDog.makeDogDead();
            gameSound.pause();
            ohMySound.play();
            finalSadSound.play();
            gameSound.currentTime = 0;
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
};

