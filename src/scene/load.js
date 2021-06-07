export const name = 'Load';

import {default as Constants} from '../constants.js';

const sounds = [
	'slogan_compressed'
];

export const scene = function () {
};
scene.prototype.init = function () {
	//
};
scene.prototype.preload = function () {
	this.load.image('tiles', 'asset/image/tiles.png');

	this.load.tilemapTiledJSON('level0', 'asset/map/level0.json');

	this.load.spritesheet('player', 'asset/image/player.png', { frameWidth: 32, frameHeight: 48 });
	this.load.spritesheet('items', 'asset/image/items.png', { frameWidth: 16, frameHeight: 16 });

	this.load.image('backgrounds', 'asset/image/backgrounds.png');
	this.load.image('backgrounds2', 'asset/image/backgrounds2.png');

	this.load.image('introcomic', 'asset/image/introcomic.png');
	this.load.image('endcomic', 'asset/image/endcomic.png');

	this.load.image('lol', 'asset/image/lol.png');

	sounds.forEach((sfxName) => {
		this.load.audio(sfxName, 'asset/sfx/' + sfxName + '.wav');
	});
};
scene.prototype.create = function () {
	this.scene.stop('Preload');
	
	const loadingText = this.add.bitmapText(Constants.SCREEN_WIDTH / 2, Constants.SCREEN_HEIGHT / 2, 'serif', 'the following content\bis not cannon\n\nplease click to\ncontinue', 20);
    loadingText.setScrollFactor(0);
    loadingText.setCenterAlign();
    loadingText.originX = 0.5;

    this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
    	this.scene.start('lol');
    })

	// 
};