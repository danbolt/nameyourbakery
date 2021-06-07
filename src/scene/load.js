export const name = 'Load';

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
};
scene.prototype.create = function () {
	this.scene.stop('Preload');
	this.scene.start('TitleScreen');
};