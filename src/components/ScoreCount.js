import * as PIXI from 'pixi.js';
import {app} from "../index";

const SCORE = 'SCORE: ';
const COUNTER_Z_INDEX = 1000;

export class ScoreCounter {
    constructor() {
        this.score = 0;
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
            fontSize: final ? "45px" : "25px",
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