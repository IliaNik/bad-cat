import * as PIXI from 'pixi.js';
import {PLAYGROUND_WIDTH_RATIO} from "./components/ControllerPanel";
import {app} from "./index";

let timeCount = 0;
let loveDogSprite;
let loveCatSprite;
let silentFilmTextBackground;
let silentFilmEffect;
let textSprite;
let heart1;
let heart2;
let heart3;
let heart4;
let heart5;
let stoppingHearts = false;
let heartsStopped = false;
let bitchList = [];
let heartsRotation = 0;
let finishAnimation = false;

let bubble_sound1 = document.getElementById("cartoon_bubble1");
let bubble_sound2 = document.getElementById("cartoon_bubble2");
let bubble_sound3 = document.getElementById("cartoon_bubble3");
let bubble_sound4 = document.getElementById("cartoon_bubble4");
let bubble_sound5 = document.getElementById("cartoon_bubble5");
let explosionSound = document.getElementById("explosion");


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
    silentFilmTextBackground.zIndex = 500;
    app.stage.addChild(silentFilmTextBackground);
}

function addSilentFilmEffect() {
    silentFilmEffect = new PIXI.Sprite(app.loader.resources["assets/prologue/old_film_effect.jpg"].texture);
    silentFilmEffect.width = app.screen.width * PLAYGROUND_WIDTH_RATIO;
    silentFilmEffect.height = app.screen.height;
    silentFilmEffect.zIndex = 400;
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
    textSprite.zIndex = 600;
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

function stopHearts() {
    stoppingHearts = true;
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
    // heart1 = addHeart(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.25, app.screen.height * 0.55);
    // console.log("ddf");
    // return true;
    showHeartsAnimation();
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
            return false;
        }
        case 340 : {
            bubble_sound1.play();
            return false;
        }
        case 350 : {
            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.52, app.screen.height * 0.2);
            return false;
        }
        case 370 : {
            stopHearts();
            return false;
        }
        case 430 : {
            loveDogSprite.texture = app.loader.resources["assets/prologue/confused_dog.png"].texture;
            loveCatSprite.texture = app.loader.resources["assets/prologue/confused_cat.png"].texture;
            return false;
        }
        case 470 : {

            addSilentFilmTextBackground();
            addText(`
          CУКИ`, Math.trunc(app.screen.width * 0.1));
            return false;
        }
        case 570 : {
            app.stage.removeChild(silentFilmTextBackground);
            app.stage.removeChild(textSprite);

            return false;
        }
        case 630 : {
            bubble_sound2.play();

            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.1, app.screen.height * 0.35);
            return false;
        }
        case 660 : {
            bubble_sound3.play();

            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.3, app.screen.height * 0.25);
            return false;
        }
        case 690 : {
            bubble_sound4.play();

            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.7, app.screen.height * 0.25);
            return false;
        }
        case 720 : {
            bubble_sound5.play();

            addBitch(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.9, app.screen.height * 0.35);
            return false;
        }
        case 770 : {
            loveDogSprite.texture = app.loader.resources["assets/shocked_dog.png"].texture;
            return false;
        }
        case 840 : {
            loveCatSprite.texture = app.loader.resources["assets/bad_cat.png"].texture;
            return false;
        }
        default: {
            return finishAnimation;
        }
    }
};

function showHeartsAnimation() {
    if (!heartsStopped) {
        if (timeCount % 40 === 1) {
            app.stage.removeChild(heart1);
            app.stage.removeChild(heart2);
            app.stage.removeChild(heart3);
            app.stage.removeChild(heart4);
            app.stage.removeChild(heart5);
            heart1 = addHeart(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.25, app.screen.height * 0.55, 2.1 + 3.15);
            heart2 = addHeart(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.38, app.screen.height * 0.47, 2.6 + 3.15);
            heart3 = addHeart(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.52, app.screen.height * 0.45, 3.15 + 3.15);
            heart4 = addHeart(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.66, app.screen.height * 0.47, -2.6 + 3.15);
            heart5 = addHeart(app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.78, app.screen.height * 0.55, -2.1 + 3.15);
            if (stoppingHearts) {
                heartsStopped = true;
            }
        } else {
            moveToCoordinatesDirectly(heart1, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.1, app.screen.height * 0.35);
            moveToCoordinatesDirectly(heart2, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.3, app.screen.height * 0.25);
            moveToCoordinatesDirectly(heart3, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.52, app.screen.height * 0.2);
            moveToCoordinatesDirectly(heart4, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.7, app.screen.height * 0.25);
            moveToCoordinatesDirectly(heart5, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.9, app.screen.height * 0.35);
        }
    }
    if (timeCount >= 900) {
        rotateHeartsAndKillBitches();
    }

}

function moveToCoordinatesDirectly(element, toX, toY, customSpeed) {
    let speed = customSpeed ? customSpeed : app.screen.width / 300;
    let xCathetus = Math.abs(element.position.x - toX);
    let yCathetus = Math.abs(element.position.y - toY);
    let hypotenuse = Math.sqrt(Math.pow(xCathetus, 2) + Math.pow(yCathetus, 2));

    let yDiff = (speed * yCathetus) / hypotenuse;
    let xDiff = (speed * xCathetus) / hypotenuse;

    element.position.y -= yDiff;
    if (toX > element.position.x) {
        element.position.x += xDiff;
    } else {
        element.position.x -= xDiff;
    }

}

function rotateHeartsAndKillBitches() {
    let rotationSpeed = app.screen.width * 0.0001;
    heartsRotation += rotationSpeed;
    if (heartsRotation >= 3.15) {
        let speed = app.screen.width / 100;
        moveToCoordinatesDirectly(heart1, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.1, app.screen.height * 0.35, speed);
        moveToCoordinatesDirectly(heart2, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.3, app.screen.height * 0.25, speed);
        moveToCoordinatesDirectly(heart3, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.52, app.screen.height * 0.2, speed);
        moveToCoordinatesDirectly(heart4, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.7, app.screen.height * 0.25, speed);
        moveToCoordinatesDirectly(heart5, app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.9, app.screen.height * 0.35, speed);
        if (heart1.x <= app.screen.width * PLAYGROUND_WIDTH_RATIO * 0.18) {
            explosionSound.play();
            app.stage.removeChild(heart1);
            app.stage.removeChild(heart2);
            app.stage.removeChild(heart3);
            app.stage.removeChild(heart4);
            app.stage.removeChild(heart5);
            cleanBitchList();
            finishAnimation = true;
        }
    } else {
        heart1.rotation += rotationSpeed;
        heart2.rotation += rotationSpeed;
        heart3.rotation += rotationSpeed;
        heart4.rotation += rotationSpeed;
        heart5.rotation += rotationSpeed;
    }
}


function addHeart(x, y, rotation) {
    let heart = new PIXI.Sprite(app.loader.resources["assets/emoji_heart.png"].texture);

    heart.width = app.screen.width * 0.05;
    heart.height = app.screen.width * 0.05;
    heart.anchor.set(0.5, 0.5);
    heart.position.set(x, y);
    heart.zIndex = 4;
    heart.rotation = rotation;

    app.stage.addChild(heart);

    return heart;
}

//2, 2.5, 3.15, -2, -2.5

function cleanBitchList() {
    bitchList.forEach((element) => app.stage.removeChild(element));
}

export let cleanAnimationSprites = () => {
    app.stage.removeChild(silentFilmTextBackground);
    app.stage.removeChild(textSprite);
    app.stage.removeChild(loveDogSprite);
    app.stage.removeChild(loveCatSprite);
    app.stage.removeChild(silentFilmEffect);
};