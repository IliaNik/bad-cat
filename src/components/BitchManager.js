import {app} from "../index";
import * as PIXI from 'pixi.js';

let _list = [];
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
        window.setInterval(function()
        {
            this.bitch = new PIXI.Sprite(app.loader.resources["assets/bitch.png"].texture);
            this.bitch.anchor.set(0.5, 0.5);
            this.bitch.scale.set(0.4, 0.4);

            this.bitch.position.set(app.screen.width * 1.3, ((app.screen.height - this.bitch.height) * Math.random()) + this.bitch.height / 2);

            app.stage.addChildAt(this.bitch, 0);
            BitchManager.list.push(this.bitch);
        }.bind(this), 2000);
    }

    update()
    {
        BitchManager.list.forEach(function (element, index, array) {
            element.position.x -= 4;

            if (element.position.x < -app.width * 0.3) {
                element.destroy();
                array.splice(0, 1);
            }
        });
    }
}
