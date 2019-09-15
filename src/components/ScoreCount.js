import * as PIXI from 'pixi.js';
import {app} from "../index";

const SCORE = 'Счет: ';
const COUNTER_Z_INDEX = 1000;

export class ScoreCounter {
    constructor() {
        this.score = 0;
        this.finalFontSize = Math.trunc(app.screen.width * 0.08);
        this.normalFontSize = Math.trunc(app.screen.width * 0.03);
        this.showScore();
    }

    clean(){
        app.stage.removeChild(this.sprite);
        this.score = 0;
        this.showScore();
    }

    showFinal(){
        app.stage.removeChild(this.sprite);
        this.showScore(true);
    }

    showScore(final) {


        this.sprite = new PIXI.Text(SCORE + this.score, {
            fontFamily: 'Courier New',
            fontSize: final ? this.finalFontSize + "px" : this.normalFontSize + "px",
            fill: 0xff1010,
            align: 'center'
        });
        this.sprite.zIndex = COUNTER_Z_INDEX;
        app.stage.addChild(this.sprite);
    }

    increaseScore() {
        this.score++;
    }

    update(){
        this.sprite.text = SCORE + this.score;
    }
}