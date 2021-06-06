export const name = 'WinScreen';
import {default as Constants} from '../constants.js';

export const scene = function () {
};
scene.prototype.init = function () {
	//
};
scene.prototype.preload = function () {


};
scene.prototype.create = function () {
	const loadingText = this.add.bitmapText(Constants.SCREEN_WIDTH / 2, Constants.SCREEN_HEIGHT / 2, 'serif', 'WinScreen', 20);
    loadingText.setScrollFactor(0);
    loadingText.setCenterAlign();
    loadingText.originX = 0.5;

	const spacebar = this.input.keyboard.addKey('SPACE');
	spacebar.on('down', () => {
		this.scene.start('TitleScreen');
	})
};