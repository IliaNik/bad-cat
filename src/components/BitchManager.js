import {app} from "../index";
import * as PIXI from 'pixi.js';
import {PLAYGROUND_WIDTH_RATIO} from "./ControllerPanel";
import {LevelCount} from "./LevelCount";

let _list = [];

const BITCH_Z_INDEX = 100;
const INITIAL_TIMEOUT = 2000;

export default class BitchManager
{
    static get list() {
        return _list;
    }

    static set list(value) {
        _list = value;
    }

    constructor()
    {
        this.timeFrameCounter = 0;
        this.timeout = INITIAL_TIMEOUT;
        this.interval = window.setInterval(this.produceBitch(), this.timeout);
        this.speed = Math.trunc(app.screen.width / 200);
        this.levelCount = new LevelCount();
    }

    update()
    {
        this.timeFrameCounter++;

        if (this.timeFrameCounter / 1000 > 1) {
            this.timeFrameCounter = 0;
            this.levelCount.increaseLevel();
            this.levelCount.update();
            clearInterval(this.interval);
            this.timeout *= 0.8;
            this.speed *= 1.2;
            this.interval = window.setInterval(this.produceBitch(), this.timeout);
        }

        let speed = this.speed;
        BitchManager.list.forEach(function (element, index, array) {

            if (isInTheShockedDogArea(element)) {
                moveToDogDirectly(element, speed, array);
            } else {
                element.position.x -= speed;
            }
        });
    }

    produceBitch() {
        return () => {
            this.bitch = new PIXI.Sprite(app.loader.resources["assets/bitch.png"].texture);
            this.bitch.anchor.set(0.5, 0.5);
            this.bitch.width = app.screen.width * 0.11;
            this.bitch.height = app.screen.width * 0.11;

            this.bitch.zIndex = BITCH_Z_INDEX;

            this.bitch.position.set(app.screen.width * PLAYGROUND_WIDTH_RATIO, app.screen.height * 0.97 * Math.random());

            app.stage.addChild(this.bitch);
            BitchManager.list.push(this.bitch);
        }
    };

    clean() {
        BitchManager.list.forEach((element) => app.stage.removeChild(element));
        BitchManager.list = [];
        this.timeFrameCounter = 0;
        this.timeout = INITIAL_TIMEOUT;
        this.speed = Math.trunc(app.screen.width / 200);
        this.interval = window.setInterval(this.produceBitch(), this.timeout);
        this.levelCount.clean();
    }

    stopBitchesProducing() {
        clearInterval(this.interval);
    }
}

function isInTheShockedDogArea(element) {
    let b = app.screen.height / 2;
    let R = app.screen.height / 2;
    return (Math.pow(element.position.x, 2) + Math.pow(element.position.y - b, 2)) < Math.pow(R, 2);
}

function moveToDogDirectly(element, speed, array) {
    let xCathetus = element.position.x;
    let yCathetus = app.screen.height / 2 - element.position.y;
    let hypotenuse = Math.sqrt(Math.pow(xCathetus, 2) + Math.pow(yCathetus, 2));

    let yDiff = (speed * yCathetus) / hypotenuse;
    let xDiff = (speed * xCathetus) / hypotenuse;

    element.position.y += yDiff;
    element.position.x -= xDiff;

    if (element.position.x < -app.width * 0.3) {
        element.destroy();
        array.splice(0, 1);
    }
}
