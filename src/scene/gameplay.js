export const name = 'Gameplay';
import {default as Constants} from '../constants.js';


export const scene = function () {
	this.player = null;

	this.cursorKeys = null;
	this.spacebar = null;

	this.itemText = null;

	this.itemCount = 0;
};
scene.prototype.init = function () {
	//
};
scene.prototype.preload = function () {
	this.load.image('tiles', 'asset/image/tiles.png');

	this.load.tilemapTiledJSON('level0', 'asset/map/level0.json');

	this.load.spritesheet('player', 'asset/image/player.png', { frameWidth: 32, frameHeight: 48 });
	this.load.spritesheet('items', 'asset/image/items.png', { frameWidth: 16, frameHeight: 16 });

	this.load.bitmapFont('serif', 'asset/font/serif_0.png', 'asset/font/serif.fnt');
};
scene.prototype.create = function () {
	this.itemCount = 0;

	const map = this.make.tilemap({ key: 'level0' });
	const tiles = map.addTilesetImage('tiles', 'tiles');
	const foreground = map.createLayer('foreground', tiles);

	map.setCollisionBetween(0, 32);
	this.physics.world.setBounds(0, 0, foreground.width, foreground.height);

	const pickupLayer = map.getObjectLayer('pickups');
	const pickupItems = [];
	if (pickupLayer) {
		pickupLayer.objects.forEach((pickupData) => {
			const newSprite = this.physics.add.staticSprite(pickupData.x, pickupData.y, 'items', 0);
			pickupItems.push(newSprite);
		});
	}


	this.player = this.physics.add.sprite(16, 40, 'player', 1);
	this.player.body.collideWorldBounds = true;
	this.physics.add.collider(this.player, foreground);

	this.physics.add.overlap(this.player, pickupItems, this.giveItemToPlayer, null, this);

	this.cursorKeys = this.input.keyboard.createCursorKeys();
	this.spacebar = this.input.keyboard.addKey('SPACE');

	this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.itemText = this.add.bitmapText(16, 16, 'serif', 'items : ' + this.itemCount, 20);
    this.itemText.setScrollFactor(0);
}
scene.prototype.giveItemToPlayer = function(player, item) {
	this.itemCount++;
	this.itemText.text = 'items : ' + this.itemCount;

	item.destroy();
}
scene.prototype.updatePlayerInput = function() {
	const onTheGround = this.player.body.blocked.down;

	let leftIsDown =  this.cursorKeys.left.isDown;
	let rightIsDown =  this.cursorKeys.right.isDown;
	let crouchIsDown = this.cursorKeys.down.isDown;
	let spaceIsDown = this.spacebar.isDown && (this.time.now - this.spacebar.timeDown) < 100;

	// TODO: gamepad polling

	if (leftIsDown)
		this.player.body.setVelocityX(-Constants.WALK_SPEED);
	else if (rightIsDown) {
		this.player.body.setVelocityX(Constants.WALK_SPEED);
	}
	else {
		this.player.body.setVelocityX(0);
	}

	let crouching = false;
	if (crouchIsDown && onTheGround) {
		crouching = true;
		this.player.body.setVelocityX(0);
	}

	if (spaceIsDown && onTheGround) {
		this.player.body.setVelocityY(crouching ? -Constants.POUNCE_VELOCITY : -Constants.JUMP_VELOCITY);
	}
}
scene.prototype.update = function () {
	this.updatePlayerInput();
};