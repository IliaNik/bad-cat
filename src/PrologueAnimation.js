import * as PIXI from 'pixi.js';
import {PLAYGROUND_WIDTH_RATIO} from "./components/ControllerPanel";
import {app} from "./index";

let timeCount = 0;
let loveDogSprite;
let loveCatSprite;
let silentFilmTextBackground;
let silentFilmEffect;
let textSprite;
let bitchList = [];

let bubble_sound = document.getElementById("cartoon_bubble");


function addLoveDog() {
    loveDogSprite = new PIXI.Sprite(app.loader.resources["assets/prologue/love_dog.png"].texture);

    loveDogSprite.anchor.set(0.5, 0.5);
    loveDogSprite.position.set(app.screen.width * 0.35, app.screen.height * 0.7);
    loveDogSprite.width = app.screen.width * 0.15;
    loveDogSprite.height = app.screen.width * 0.15;
    loveDogSprite.zIndex = 2;

    app.stage.addChild(loveDogSprite);

}

function addLoveCat() {
    loveCatSprite = new PIXI.Sprite(app.loader.resources["assets/prologue/love_cat.png"].texture);

    loveCatSprite.anchor.set(0.5, 0.5);
    loveCatSprite.position.set(app.screen.width * 0.55, app.screen.height * 0.7);
    loveCatSprite.width = app.screen.width * 0.15;
    loveCatSprite.height = app.screen.width * 0.15;
    loveCatSprite.zIndex = 2;

    app.stage.addChild(loveCatSprite);
}

function addSilentFilmTextBackground() {
    silentFilmTextBackground = new PIXI.Sprite(app.loader.resources["assets/prologue/silent_film_text.jpg"].texture);
    silentFilmTextBackground.width = app.screen.width * PLAYGROUND_WIDTH_RATIO;
    silentFilmTextBackground.height = app.screen.height;
    silentFilmTextBackground.zIndex = 1;
    app.stage.addChild(silentFilmTextBackground);
}

function addSilentFilmEffect() {
    silentFilmEffect = new PIXI.Sprite(app.loader.resources["assets/prologue/old_film_effect.jpg"].texture);
    silentFilmEffect.width = app.screen.width * PLAYGROUND_WIDTH_RATIO;
    silentFilmEffect.height = app.screen.height;
    silentFilmEffect.zIndex = 1000;
    silentFilmEffect.alpha = 0.5;
    app.stage.addChild(silentFilmEffect);
}

function addText(text, fontSize) {
    textSprite = new PIXI.Text(text, {
        fontFamily: 'Courier New',
        fontSize: (fontSize ? fontSize : Math.trunc(app.screen.width * 0.08)) + "px",
        fill: 0xFFFFFF,
        align: 'center'
    });
    textSprite.anchor.set(0.5, 0.5);
    textSprite.position.set(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.17, app.screen.height * 0.4);
    textSprite.zIndex = 500;
    app.stage.addChild(textSprite);
}

function addBitch(x, y) {
    let bitch = new PIXI.Sprite(app.loader.resources["assets/bitch.png"].texture);
    bitch.anchor.set(0.5, 0.5);
    bitch.position.set(x, y);
    bitch.width = app.screen.width * 0.13;
    bitch.height = app.screen.width * 0.13;
    bitch.zIndex = 3;
    app.stage.addChild(bitch);
    bitchList.push(bitch);
}

/*
* Function which responds for the prologue animation flow
* If animation not finished - returns false
* If animation finished - returns true
*
*
* */
export let prologueAnimation = () => {

    timeCount++;
    switch (timeCount) {
        case 1 : {
            addSilentFilmTextBackground();
            addText(`
            Это история
            о крепкой любви`);
            return false;
        }
        case 100 : {
            app.stage.removeChild(silentFilmTextBackground);
            app.stage.removeChild(textSprite);
            addSilentFilmEffect();
            addLoveDog();
            addLoveCat();
            return false;
        }
        case 200 : {
            app.stage.removeChild(loveDogSprite);
            app.stage.removeChild(loveCatSprite);
            app.stage.removeChild(silentFilmEffect);
            addSilentFilmTextBackground();
            addText(`
            В которую 
            вмешались
            какие-то...`);
            return false;
        }
        case 300 : {
            app.stage.removeChild(silentFilmTextBackground);
            app.stage.removeChild(textSprite);
            addSilentFilmEffect();
            addLoveDog();
            addLoveCat();
            return false;
        }
        case 330 : {
            bubble_sound.play();
            return false;
        }
        case 350 : {
            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.52, app.screen.height * 0.2);
            return false;
        }
        case 390 : {
            loveDogSprite.texture = app.loader.resources["assets/prologue/confused_dog.png"].texture;
            loveCatSprite.texture = app.loader.resources["assets/prologue/confused_cat.png"].texture;
            return false;
        }
        case 470 : {
            app.stage.removeChild(loveDogSprite);
            app.stage.removeChild(loveCatSprite);
            app.stage.removeChild(silentFilmEffect);
            cleanBitchList();

            addSilentFilmTextBackground();
            addText(`
          CУКИ`, Math.trunc(app.screen.width * 0.1));
            return false;
        }
        case 570 : {
            app.stage.removeChild(silentFilmTextBackground);
            app.stage.removeChild(textSprite);

            addSilentFilmEffect();
            app.stage.addChild(loveDogSprite);
            app.stage.addChild(loveCatSprite);
            addBitchList();
            return false;
        }
        case 630 : {
            let myBubble_sound = bubble_sound.cloneNode();
            myBubble_sound.play();
            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.1, app.screen.height * 0.35);
            return false;
        }
        case 660 : {
            let myBubble_sound = bubble_sound.cloneNode();
            myBubble_sound.play();

            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.3, app.screen.height * 0.25);
            return false;
        }
        case 690 : {
            let myBubble_sound = bubble_sound.cloneNode();
            myBubble_sound.play();
            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.7, app.screen.height * 0.25);
            return false;
        }
        case 720 : {
            let myBubble_sound = bubble_sound.cloneNode();
            myBubble_sound.play();
            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.9, app.screen.height * 0.35);
            return false;
        }
        default: {
            return false;
        }
    }
};

function cleanBitchList() {
    bitchList.forEach((element) => app.stage.removeChild(element));
}

function addBitchList() {
    bitchList.forEach((element) => app.stage.addChild(element));
}

export let cleanAnimationSprites = () => {
    app.stage.removeChild(silentFilmTextBackground);
    app.stage.removeChild(textSprite);
    app.stage.removeChild(loveDogSprite);
    app.stage.removeChild(loveCatSprite);
    app.stage.removeChild(silentFilmEffect);

    cleanBitchList();
};