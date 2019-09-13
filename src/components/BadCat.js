import {app} from "../index";
import RocketManager from "./RocketManager";
import * as PIXI from 'pixi.js';

const BAD_CAT_Z_INDEX = 150;


export default class BadCat
{
    constructor()
    {
        this.sprite = new PIXI.Sprite(app.loader.resources["assets/bad_cat.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(app.screen.width * 0.2, app.screen.height * 0.4);
        this.sprite.width = app.screen.width * 0.09;
        this.sprite.height = app.screen.width * 0.09;
        this.sprite.zIndex = BAD_CAT_Z_INDEX;
        this.fireSpeed = 20;
        this.fireCooldown = 0;

        this.fireActivated = true;

        app.stage.addChild(this.sprite);
    }

    makeCatSad() {
        this.sprite.texture = app.loader.resources["assets/sad_cat.png"].texture
    }

    makeCatBad() {
        this.sprite.texture = app.loader.resources["assets/bad_cat.png"].texture
    }

    move(y) {
        let b = app.screen.height / 2;
        let R = app.screen.height / 2 * 0.8;
        let x = Math.sqrt(Math.pow(R, 2) - Math.pow(y - b, 2));
        this.sprite.position.set(x, y);
    }

    update()
    {
        this.updateFire();
    }

    clean()
    {
        this.sprite.position.set(app.screen.width * 0.2, app.screen.height * 0.4);
        this.sprite.width = app.screen.width * 0.1;
        this.sprite.height = app.screen.width * 0.1;
        this.sprite.texture = app.loader.resources["assets/bad_cat.png"].texture
    }

    updateFire()
    {
        if (this.fireCooldown < this.fireSpeed)
            this.fireCooldown++;

        if (this.fireCooldown >= this.fireSpeed && this.fireActivated)
        {
            let rocket = new RocketManager(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
    }

}
