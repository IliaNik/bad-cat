import {app} from "../index";
import RocketManager from "./RocketManager";
import * as PIXI from 'pixi.js';

const BAD_CAT_Z_INDEX = 1000;


export default class BadCat
{
    constructor()
    {
        this.sprite = new PIXI.Sprite(app.loader.resources["assets/bad_cat.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(app.screen.width * 0.2, app.screen.height * 0.4);
        this.sprite.width = app.screen.width * 0.1;
        this.sprite.height = app.screen.width * 0.1;
        this.sprite.zIndex = BAD_CAT_Z_INDEX;

        this.keyState = {32: false, 37: false, 38: false, 39: false, 40: false};
        let unit = Math.trunc(app.screen.width/400);
        unit = unit === 0 ? 0.5 : unit;

        this.keyCodes = {37: -unit, 38: -unit, 39: unit, 40: unit};

        this.directionX = 0;
        this.directionY = 0;
        this.speed = 10;

        this.fireSpeed = 10;
        this.fireCooldown = 0;

        app.stage.addChild(this.sprite);

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    update()
    {
        let nextX = this.sprite.position.x + this.directionX * this.speed;
        let nextY = this.sprite.position.y + this.directionY * this.speed;

        // Prevent from leaving the screen
        if (nextX > 0 && nextX < app.screen.width) {
            this.sprite.position.x = nextX;
        }
        if (nextY > 0 && nextY < app.screen.height) {
            this.sprite.position.y = nextY;
        }

        this.updateFire();
    }

    clean()
    {
        this.sprite.position.set(app.screen.width * 0.2, app.screen.height * 0.4);
        this.sprite.width = app.screen.width * 0.1;
        this.sprite.height = app.screen.width * 0.1;
    }

    updateFire()
    {
        if (this.fireCooldown < this.fireSpeed)
            this.fireCooldown++;

        if (this.keyState[32] && this.fireCooldown >= this.fireSpeed)
        {
            let rocket = new RocketManager(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
    }

    onKeyDown(key)
    {
        this.keyState[key.keyCode] = true;

        if (key.keyCode === 37 || key.keyCode === 39)
            this.directionX = this.keyCodes[key.keyCode];
        else if (key.keyCode === 38 || key.keyCode === 40)
            this.directionY = this.keyCodes[key.keyCode];
    }

    onKeyUp(key)
    {
        this.keyState[key.keyCode] = false;

        if (!this.keyState[37] && this.keyState[39])
            this.directionX = this.keyCodes[39];
        else if (this.keyState[37] && !this.keyState[39])
            this.directionX = this.keyCodes[37];
        else this.directionX = 0;

        if (!this.keyState[38] && this.keyState[40])
            this.directionY = this.keyCodes[40];
        else if (this.keyState[38] && !this.keyState[40])
            this.directionY = this.keyCodes[38];
        else this.directionY = 0;
    }

}
