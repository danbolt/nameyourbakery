export const name = 'Gameplay';
export const scene = function () {
	this.player = null;

	this.cursorKeys = null;
	this.spacebar = null;
};
scene.prototype.init = function () {
	//
};
scene.prototype.preload = function () {
	this.load.image('tiles', 'asset/image/tiles.png');

	this.load.tilemapTiledJSON('level0', 'asset/map/level0.json');

	this.load.spritesheet('player', 'asset/image/player.png', { frameWidth: 32, frameHeight: 48 });
};
scene.prototype.create = function () {
	const map = this.make.tilemap({ key: 'level0' });
	const tiles = map.addTilesetImage('tiles', 'tiles');
	const foreground = map.createLayer('foreground', tiles);
	map.setCollisionBetween(0, 32);

	this.player = this.physics.add.sprite(150, 40, 'player', 1);

	this.physics.add.collider(this.player, foreground);

	this.cursorKeys = this.input.keyboard.createCursorKeys();
	this.spacebar = this.input.keyboard.addKey('SPACE');
}
scene.prototype.updatePlayerInput = function() {
	let leftIsDown =  this.cursorKeys.left.isDown;
	let rightIsDown =  this.cursorKeys.right.isDown;
	let spaceIsDown = this.spacebar.isDown;

	// TODO: gamepad polling

	if (leftIsDown)
		this.player.body.setVelocityX(-100);
	else if (rightIsDown) {
		this.player.body.setVelocityX(100);
	}
	else {
		this.player.body.setVelocityX(0);
	}

	if (spaceIsDown && this.player.body.blocked.down) {
		this.player.body.setVelocityY(-200);
	}
}
scene.prototype.update = function () {
	this.updatePlayerInput();
};