export const name = 'Preload';
import {default as Constants} from '../constants.js';

export const scene = function () {
};
scene.prototype.init = function () {
	//
};
scene.prototype.preload = function () {

	this.load.bitmapFont('serif', 'asset/font/serif_0.png', 'asset/font/serif.fnt');

};
scene.prototype.create = function () {
	const loadingText = this.add.bitmapText(Constants.SCREEN_WIDTH / 2, Constants.SCREEN_HEIGHT / 2, 'serif', 'loading!', 20);
    loadingText.setScrollFactor(0);
    loadingText.setCenterAlign();
    loadingText.originX = 0.5;

	this.scene.launch('Load');
};