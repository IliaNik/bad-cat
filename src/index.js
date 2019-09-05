import './styles/app.css';
import * as PIXI from 'pixi.js';
import BitchManager from "./components/BitchManager";
import BadCat from "./components/BadCat";
import RocketManager from "./components/RocketManager";
import {hitTestRectangle} from "./CollisionUtils";

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


// The application will create a canvas element for you that you
// can then insert into the DOM

document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x22A7F0;

app.renderer.autoDensity = true;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

let bitchManager;
let player;
let scoreSprite;
let score = 0;
const SCORE = 'SCORE: ';

app.loader.add([
    "assets/bitch.png",
    "assets/bad_cat.png",
    "assets/rocket.png"
]).load(init);

function init()
{
    bitchManager = new BitchManager();
    player = new BadCat();
    scoreSprite = new PIXI.Text(SCORE + 0, {
        fontFamily: 'Charter, Baskerville, Georgia',
        fontSize: 24,
        fill: 0xff1010,
        align: 'center'
    });

    app.stage.addChild(scoreSprite);
    app.render();

    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop() {
    BitchManager.list.forEach(function (bitchSprite) {
        if (hitTestRectangle(bitchSprite, player.sprite)) {
            app.ticker.stop();
        }
    });

    bitchManager.update();
    player.update();

    score++;
    scoreSprite.text = SCORE + score;

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

