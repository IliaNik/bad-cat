import * as PIXI from 'pixi.js';
import {app} from "../index";

const LEVEL = 'Уровень ';
const LEVEL_Z_INDEX = 1000;

export class LevelCount {
    constructor() {
        this.level = 0;
        this.normalFontSize = Math.trunc(app.screen.width * 0.03);
        this.showLevel();
    }

    clean() {
        app.stage.removeChild(this.sprite);
        this.level = 0;
        this.showLevel();
    }

    showLevel() {
        this.sprite = new PIXI.Text(LEVEL + this.level, {
            fontFamily: 'Courier New',
            fontSize: this.normalFontSize + "px",
            fill: 0xff1010,
            align: 'center'
        });
        this.sprite.position.set(app.screen.width * 0.7, 0);
        this.sprite.zIndex = LEVEL_Z_INDEX;
        app.stage.addChild(this.sprite);
    }

    increaseLevel() {
        this.level++;
    }

    update() {
        this.sprite.text = LEVEL + this.level;
    }
}