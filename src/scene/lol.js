export const name = 'lol';
import {default as Constants} from '../constants.js';

export const scene = function () {
};
scene.prototype.init = function () {
	this.cameras.main.fadeIn(1500);
	//
};
scene.prototype.preload = function () {


};
scene.prototype.create = function () {
	const background = this.add.image(0, 0, 'lol');
	background.setOrigin(0);

	const slogan = this.sound.add('slogan_compressed');


	this.time.addEvent({
		delay: 1350,
		callback: () => {
			slogan.play();

			this.time.addEvent({
				delay: 1350,
				callback: () => {
					this.cameras.main.fadeOut(1000);
				}
			})

			this.time.addEvent({
				delay: 2350,
				callback: () => {
					this.scene.start('TitleScreen');
				}
			})
		}
	})
};