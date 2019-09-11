import {app} from "../index";
import * as PIXI from 'pixi.js';

let _list = [];

const BITCH_Z_INDEX = 100;

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
        this.interval = window.setInterval(this.produceBitch(), 2000);
    }

    update()
    {
        BitchManager.list.forEach(function (element, index, array) {
            let speed = Math.trunc(app.screen.width / 200);
            // element.position.x -= speed;

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
        });
    }

    produceBitch() {
        return () => {
            this.bitch = new PIXI.Sprite(app.loader.resources["assets/bitch.png"].texture);
            this.bitch.anchor.set(0.5, 0.5);
            this.bitch.width = app.screen.width * 0.13;
            this.bitch.height = app.screen.width * 0.13;

            this.bitch.zIndex = BITCH_Z_INDEX;

            this.bitch.position.set(app.screen.width * 1.1, app.screen.height * 1.1 * Math.random());

            app.stage.addChild(this.bitch);
            BitchManager.list.push(this.bitch);
        }
    };

    clean() {
        BitchManager.list.forEach((element) => app.stage.removeChild(element));
        BitchManager.list = [];
        this.interval = window.setInterval(this.produceBitch(), 2000);
    }

    stopBitchesProducing() {
        clearInterval(this.interval);
    }
}
