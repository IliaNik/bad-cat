import * as PIXI from 'pixi.js';
import {app} from "../index";

const SHOCKED_DOG_Z_INDEX = 500;

export class ShockedDog {
    constructor() {
        this.sprite = new PIXI.Sprite(app.loader.resources["assets/shocked_dog.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(app.screen.width * 0.07, app.screen.height * 0.5);
        this.sprite.width = app.screen.width * 0.09;
        this.sprite.height = app.screen.width * 0.09;
        this.sprite.zIndex = SHOCKED_DOG_Z_INDEX;

        app.stage.addChild(this.sprite);
    }

    makeDogDead() {
        this.sprite.texture = app.loader.resources["assets/dead_dog.png"].texture
    }

    makeDogShocked() {
        this.sprite.texture = app.loader.resources["assets/shocked_dog.png"].texture
    }
}