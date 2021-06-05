export const name = 'Gameplay';
export const scene = function () {
	//
};
scene.prototype.init = function () {
	//
};
scene.prototype.preload = function () {
	this.load.image('tiles', 'asset/image/tiles.png');

	this.load.tilemapTiledJSON('level0', 'asset/map/level0.json');
};
scene.prototype.create = function () {
	const map = this.make.tilemap({ key: 'level0' });
	const tiles = map.addTilesetImage('tiles', 'tiles');
	const foreground = map.createLayer('foreground', tiles);
}
scene.prototype.update = function () {
	// console.log('bing')
};