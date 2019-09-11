import * as PIXI from 'pixi.js';
import {app} from "../index";

const SCORE = 'SCORE: ';
const COUNTER_Z_INDEX = 1000;

export class ScoreCounter {
    constructor() {
        this.score = 0;
        this.sprite = new PIXI.Text(SCORE + 0, {
            fontFamily: 'Charter, Baskerville, Georgia',
            fontSize: "25px",
            fill: 0xff1010,
            align: 'center'
        });

        this.sprite.zIndex = COUNTER_Z_INDEX;

        app.stage.addChild(this.sprite);
    }

    clean(){
        this.score = 0;
        app.stage.removeChild(this.sprite);
        this.sprite = new PIXI.Text(SCORE + 0, {
            fontFamily: 'Charter, Baskerville, Georgia',
            fontSize: "25px",
            fill: 0xff1010,
            align: 'center'
        });
        this.sprite.zIndex = COUNTER_Z_INDEX;

        app.stage.addChild(this.sprite);
    }

    showFinal(){
        app.stage.removeChild(this.sprite);
        this.sprite = new PIXI.Text(SCORE + this.score, {
            fontFamily: 'Charter, Baskerville, Georgia',
            fontSize: "45px",
            fill: 0xff1010,
            align: 'center'
        });
        this.sprite.zIndex = COUNTER_Z_INDEX;
        app.stage.addChild(this.sprite);

    }

    update(){
        this.score++;
        this.sprite.text = SCORE + this.score;
    }
}