import {app} from "../index";
import * as PIXI from 'pixi.js';



let _list = [];

export default class Rocket
{
    static get list() { return _list; }
    static set list(value) { _list = value; }

    constructor(x, y)
    {
        this.sprite = new PIXI.Sprite(app.loader.resources["assets/rocket.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(x + 50, y);

        this.speed = 20;
        Rocket.list.push(this);

        app.stage.addChild(this.sprite);
    }

    update()
    {
        this.sprite.position.x += this.speed;

        if (this.sprite.position.x > app.screen.width * 1.1) {
            this.sprite.destroy();
            Rocket.list.splice(Rocket.list.indexOf(this), 1);
        }
    }
}
