export const name = 'TitleScreen';
import {default as Constants} from '../constants.js';

export const scene = function () {
};
scene.prototype.init = function () {
	//
};
scene.prototype.preload = function () {


};
scene.prototype.create = function () {
	const jump2 = this.sound.add('jump2');
	jump2.play();

	const vdpPipeline = this.renderer.pipelines.get('vdp');
    const benry = this.add.image(Constants.SCREEN_WIDTH - 80, Constants.SCREEN_HEIGHT + 200, 'benry_title');
    benry.setPipeline(vdpPipeline);

    const t = this.add.tween({
    	targets: benry,
    	y: 142,
	    ease: Phaser.Math.Easing.Cubic.Out,
    	duration: 500
    })

    t.on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
    	const loadingText = this.add.bitmapText(Constants.SCREEN_WIDTH / 16, Constants.SCREEN_HEIGHT / 8, 'century', '50 CARROTS', 42);

    	const subtitleText = this.add.bitmapText(Constants.SCREEN_WIDTH / 16 + 8, Constants.SCREEN_HEIGHT / 4 + 4, 'serif', 'with Catboy Benrey', 20);

    	const instructionsText = this.add.bitmapText(Constants.SCREEN_WIDTH / 16 + 8, Constants.SCREEN_HEIGHT / 4 + 96 - 8, 'serif', 'Arrow keys to move\nSpace to hop\nHold down and press space to LEAP\nPRESS SPACE TO START', 20);
    });

	const spacebar = this.input.keyboard.addKey('SPACE');
	spacebar.on('down', () => {
		this.scene.start('Cinematic', { index: 0 });
	})
};