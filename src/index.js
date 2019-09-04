import './styles/app.css';
import * as PIXI from 'pixi.js';
import BitchManager from "./components/BitchManager";
import BadCat from "./components/BadCat";
import Rocket from "./components/Rocket";

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

let cloudManager;
let player;

app.loader.add([
    "assets/bitch.png",
    "assets/bad_cat.png",
    "assets/rocket.png"
]).load(init);

function init()
{
    cloudManager = new BitchManager();
    player = new BadCat();

    app.render();

    loop();
}

function loop()
{
    cloudManager.update();
    player.update();

    Rocket.list.map((element) =>
    {
        element.update();
    });

    requestAnimationFrame(loop);
    app.render();
}

