import {app} from "../index";
import * as PIXI from 'pixi.js';

export default class BitchManager
{
    constructor()
    {
        this.cloudsList = [];

        window.setInterval(function()
        {
            this.cloud = new PIXI.Sprite(app.loader.resources["assets/bitch.png"].texture);
            this.cloud.anchor.set(0.5, 0.5);
            this.cloud.position.set(app.screen.width * 1.3, app.screen.height * Math.random());

            this.cloud.scale.set(0.4, 0.4);

            app.stage.addChildAt(this.cloud, 0);
            this.cloudsList.push(this.cloud);
        }.bind(this), 2000);
    }

    update()
    {
        this.cloudsList.forEach(function(element, index, array) {
            element.position.x -= 4;

            if (element.position.x < -app.width * 0.3) {
                element.destroy();
                array.splice(0, 1);
            }
        });
    }
}
