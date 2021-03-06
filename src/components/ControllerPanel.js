import * as PIXI from 'pixi.js';
import {app, pausePrologue, playPrologue, repeatGame, startGame} from "../index";

const CONTROL_PANEL_Z_INDEX = 100000;

export const PLAYGROUND_WIDTH_RATIO = 0.88;

export class ControllerPanel {

    setPlayer(player) {
        this.player = player;
    }

    constructor() {
        this.startOfControlPanel = app.screen.width * PLAYGROUND_WIDTH_RATIO;
        this.widthOfControlPanel = app.screen.width * 0.12;

        this.createControlPanelPlace();
        this.initButtons();

        this.keyState = {38: false, 40: false};
        this.keyCodes = {38: -1, 40: 1};

        this.directionY = 0;
        this.speed = app.screen.height * 0.03;

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));

    }

    update() {
        let nextY = this.controllContainer.position.y + this.directionY * this.speed;

        if (nextY >= app.screen.height * 0.13 && nextY <= app.screen.height * 0.88) {
            this.controllContainer.position.y = nextY;
            this.player.move(this.controllContainer.position.y);
        }
    }

    onKeyDown(key) {
        this.keyState[key.keyCode] = true;

        if (key.keyCode === 38 || key.keyCode === 40) {
            this.directionY = this.keyCodes[key.keyCode];
        }
        this.player.fireActivated = false;

    }

    onKeyUp(key) {
        this.keyState[key.keyCode] = false;

        if (!this.keyState[38] && this.keyState[40])
            this.directionY = this.keyCodes[40];
        else if (this.keyState[38] && !this.keyState[40])
            this.directionY = this.keyCodes[38];
        else this.directionY = 0;

        this.player.fireActivated = true;

    }

    createControlPanelPlace() {
        let panel = new PIXI.Graphics();
        panel.zIndex = CONTROL_PANEL_Z_INDEX;
        panel.beginFill(0xF39C12);

        // graphics.lineStyle(8, 0xF4D03F);
        panel.drawRect(this.startOfControlPanel, 0, this.widthOfControlPanel, app.screen.height);
        app.stage.addChild(panel);

        let line = new PIXI.Graphics();
        line.lineStyle(15, 0xF4D03F);
        line.moveTo(this.startOfControlPanel, 0);
        line.lineTo(this.startOfControlPanel, app.screen.height);
        line.endFill();
        line.zIndex = CONTROL_PANEL_Z_INDEX - 1;
        app.stage.addChild(line);
    }

    startGame() {

        this.controllContainer = new PIXI.Container();
        this.controllContainer.position.set(this.startOfControlPanel + this.widthOfControlPanel / 2, app.screen.height / 2);
        this.controllContainer.zIndex = CONTROL_PANEL_Z_INDEX + 1;
        this.controllContainer.buttonMode = true;
        this.controllContainer.interactive = true;
        this.controllContainer.sortableChildren = true;
        this.createControlCircle();
        this.createControlCircleShadow();

        this.controllContainer
        // events for drag start
            .on('mousedown', this.onDragStart.bind(this))
            .on('touchstart', this.onDragStart.bind(this))
            // events for drag end
            .on('mouseup', this.onDragEnd.bind(this))
            .on('mouseupoutside', this.onDragEnd.bind(this))
            .on('touchend', this.onDragEnd.bind(this))
            .on('touchendoutside', this.onDragEnd.bind(this))
            // events for drag move
            .on('mousemove', this.onDragMove.bind(this))
            .on('touchmove', this.onDragMove.bind(this));

        app.stage.addChild(this.controllContainer);
    }

    createControlCircleShadow() {
        let circleShadowGraphics = new PIXI.Graphics();
        circleShadowGraphics.beginFill(0x0, 0.5);
        let scale = 1.1;
        circleShadowGraphics.drawCircle(0, 0, this.widthOfControlPanel * 0.37 * scale);
        circleShadowGraphics.endFill();

        let groupTexture = app.renderer.generateTexture(circleShadowGraphics, 1, 5);
        this.circleShadow = new PIXI.Sprite(groupTexture);
        this.circleShadow.anchor.set(0.5, 0.5);
        this.circleShadow.position.set(this.widthOfControlPanel * 0.03, this.widthOfControlPanel * 0.04);
        this.circleShadow.zIndex = 0;

        console.log(this.controlCircle.width);
        let blurFilter = new PIXI.filters.BlurFilter();
        blurFilter.blur = 0.9;
        this.circleShadow.filters = [blurFilter];

        this.controllContainer.addChild(this.circleShadow);
    }

    createControlCircle() {
        let circleGraphics = new PIXI.Graphics();
        circleGraphics.lineStyle(8, 0xF4D03F);
        circleGraphics.beginFill(0xEF6C00);
        circleGraphics.drawCircle(0, 0, this.widthOfControlPanel * 0.37);
        circleGraphics.endFill();

        let texture = app.renderer.generateTexture(circleGraphics, 1, 5);
        this.controlCircle = new PIXI.Sprite(texture);
        this.controlCircle.anchor.set(0.5, 0.5);
        // this.controlCircle.position.set(this.startOfControlPanel + this.widthOfControlPanel / 2, app.screen.height / 2);
        this.controlCircle.zIndex = 10;

        this.controllContainer.addChild(this.controlCircle);

    }

    onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.controllContainer.data = event.data;
        // this.alpha = 0.5;
        this.controllContainer.dragging = true;
        this.player.fireActivated = false;

    }

    onDragEnd() {
        // this.alpha = 1;

        this.controllContainer.dragging = false;

        // set the interaction data to null
        this.controllContainer.data = null;

        this.player.fireActivated = true;
    }

    onDragMove() {
        if (this.controllContainer.dragging) {
            let newPosition = this.controllContainer.data.getLocalPosition(app.stage);
            if (newPosition.y >= app.screen.height * 0.13 && newPosition.y <= app.screen.height * 0.88) {
                this.controllContainer.position.y = newPosition.y;
                this.player.move(this.controllContainer.position.y);
            }
        }
    }

    initButtons() {
        this.playButton = new PIXI.Sprite(app.loader.resources["assets/buttons/play_button.svg"].texture);
        this.pauseButton = new PIXI.Sprite(app.loader.resources["assets/buttons/pause_button.svg"].texture);
        this.startButton = new PIXI.Sprite(app.loader.resources["assets/buttons/start_button.svg"].texture);
        this.repeatButton = new PIXI.Sprite(app.loader.resources["assets/buttons/repeat_button.svg"].texture);
        let playButton = this.playButton;
        let pauseButton = this.pauseButton;
        let startButton = this.startButton;
        let repeatButton = this.repeatButton;

        this.initButton(playButton);
        this.initButton(pauseButton);
        this.initButton(startButton);
        this.initButton(repeatButton);
        this.playButton
            .on('tap', () => {
                app.stage.removeChild(this.playButton);
                app.stage.addChild(this.pauseButton);
                playPrologue()
            })
            .on('click', () => {
                app.stage.removeChild(this.playButton);
                app.stage.addChild(this.pauseButton);
                playPrologue()
            });

        this.pauseButton
            .on('tap', () => {
                app.stage.removeChild(this.pauseButton);
                app.stage.addChild(this.playButton);
                pausePrologue()
            })
            .on('click', () => {
                app.stage.removeChild(this.pauseButton);
                app.stage.addChild(this.playButton);
                pausePrologue()
            });

        this.startButton
            .on('tap', () => {
                app.stage.removeChild(this.startButton);
                startGame()
            })
            .on('click', () => {
                app.stage.removeChild(this.startButton);
                startGame()
            });

        this.repeatButton
            .on('tap', () => {
                app.stage.removeChild(this.repeatButton);
                repeatGame()
            })
            .on('click', () => {
                app.stage.removeChild(this.repeatButton);
                repeatGame()
            });


        app.stage.addChild(this.playButton);
    }

    initButton(startButton) {
        startButton.zIndex = CONTROL_PANEL_Z_INDEX + 3;
        startButton.anchor.set(0.5);
        startButton.width = this.widthOfControlPanel * 0.9;
        startButton.height = this.widthOfControlPanel * 0.9;
        startButton.position.x = this.startOfControlPanel + this.widthOfControlPanel / 2;
        startButton.position.y = app.screen.height / 2;
        startButton.interactive = true;
        startButton.buttonMode = true;
    }

    makeReadyToStartGame() {
        app.stage.removeChild(this.playButton);
        app.stage.removeChild(this.pauseButton);
        app.stage.addChild(this.startButton);
    }

    stopGame() {
        app.stage.removeChild(this.controllContainer);
        app.stage.addChild(this.repeatButton);
    }
}
