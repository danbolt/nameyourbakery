export const name = 'Gameplay';
import {default as Constants} from '../constants.js';


const moods = ['cheery', 'hungry', 'content', 'pensive', 'still hungry', 'moody', 'fine', 'thinking', 'no!', 'fishy', 'eager', 'sleepy', 'jumpy', 'bumpy', 'happy', 'woozy', 'aware', 'catty', 'nosy'].map((str) => { return 'mY mOoD: ' + str; });

export const scene = function () {
	this.player = null;
	this.facingLeft = false;

	this.cursorKeys = null;
	this.spacebar = null;

	this.itemText = null;

	this.itemCount = 0;
	this.totalItemCount = 999;
};
scene.prototype.init = function () {
	//
};
scene.prototype.preload = function () {

};
scene.prototype.create = function () {
	const vdpPipeline = this.renderer.pipelines.get('vdp');

	this.parralaxBackground = this.add.image(0, 0, 'backgrounds', 0);
	this.parralaxBackground.setScrollFactor(0, 0);
	this.parralaxBackground.setOrigin(0, 0);
	this.parralaxBackground.setPipeline(vdpPipeline);

	this.parralaxBackground2 = this.add.image(0, 0, 'backgrounds2', 0);
	this.parralaxBackground2.setScrollFactor(0, 0);
	this.parralaxBackground2.setOrigin(0, 0);
	this.parralaxBackground2.setPipeline(vdpPipeline);

	const map = this.make.tilemap({ key: 'level0' });
	const tiles = map.addTilesetImage('tiles', 'tiles');
	const background = map.createLayer('background', tiles);
	background.setPipeline(vdpPipeline);
	const foreground = map.createLayer('foreground', tiles);
	foreground.setPipeline(vdpPipeline);
	this.map = map;

	map.setCollisionBetween(0, 64);
	this.physics.world.setBounds(0, 0, foreground.width, foreground.height);

	const pickupLayer = map.getObjectLayer('pickups');
	const pickupItems = [];
	if (pickupLayer) {
		pickupLayer.objects.forEach((pickupData) => {
			const newItem = this.physics.add.staticSprite(pickupData.x, pickupData.y, 'items', 0);
			pickupItems.push(newItem);
			newItem.setPipeline(vdpPipeline);
		});
	}
	this.totalItemCount = pickupItems.length;


	const exitLayer = map.getObjectLayer('exits');
	const exits = [];
	if (exitLayer) {
		exitLayer.objects.forEach((exitData) => {
			const newExit = this.physics.add.staticSprite(exitData.x, exitData.y, 'items', 1);
			exits.push(newExit);
			newExit.setPipeline(vdpPipeline);
		});
	}

	this.createBenryAnims();

	this.player = this.physics.add.sprite(16, 30 * 16, 'player', 1);
	this.player.body.collideWorldBounds = true;
	this.player.body.setSize(20, 48);
	this.physics.add.collider(this.player, foreground);
	this.facingLeft = false;
	this.player.play('idle');

	const startsLayer = map.getObjectLayer('starts');
	if (startsLayer) {
		startsLayer.objects.forEach((startData) => {
			this.player.x = startData.x;
			this.player.y = startData.y;
		});
	}

	this.physics.add.overlap(this.player, pickupItems, this.giveItemToPlayer, null, this);
	this.physics.add.overlap(this.player, exits, this.playerFindsExit, null, this);

	this.cursorKeys = this.input.keyboard.createCursorKeys();
	this.spacebar = this.input.keyboard.addKey('SPACE');

	this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.itemCount = 0;
	// this.itemCount = this.totalItemCount - 1;
    this.itemText = this.add.bitmapText(16, 20, 'serif', 'cArRotS : ' + this.itemCount + '/' + this.totalItemCount, 20);
    this.itemText.setScrollFactor(0);

    this.catboyText = this.add.bitmapText(16, 8, 'serif', moods[0], 20);
    this.catboyText.setScrollFactor(0);
    this.updateCatboyText();

    this.player.setPipeline(vdpPipeline);

	this.time.addEvent({
		loop: true,
		callback: this.updateCatboyText,
		callbackScope: this,
		delay: 15000
	})

	this.cameras.main.fadeIn(700);

}
scene.prototype.createBenryAnims = function() {
	this.anims.create({
		key: 'idle',
		frames: this.anims.generateFrameNumbers('player', { frames: [0, 0, 0, 1, 2, 1, 0, 0, 0] }),
		frameRate: 4,
		repeat: -1
	})

	this.anims.create({
		key: 'run',
		frames: this.anims.generateFrameNumbers('player', { frames: [4, 5, 6] }),
		frameRate: 10,
		repeat: -1
	})

	this.anims.create({
		key: 'crouch',
		frames: this.anims.generateFrameNumbers('player', { frames: [3] }),
		frameRate: 10,
		repeat: -1
	})

	this.anims.create({
		key: 'midair',
		frames: this.anims.generateFrameNumbers('player', { frames: [7] }),
		frameRate: 10,
		repeat: -1
	})
};
scene.prototype.giveItemToPlayer = function(player, item) {
	this.itemCount++;
	this.itemText.text = 'cArRotS : ' + this.itemCount + '/' + this.totalItemCount;

	if (this.itemCount === this.totalItemCount) {
		this.scene.start('Cinematic', { index: 1 });
	}

	item.destroy();
}
scene.prototype.playerFindsExit = function() {
	// TODO: this will need to be a transition
	this.scene.start(name);
};
scene.prototype.updatePlayerInput = function() {
	const onTheGround = this.player.body.blocked.down;

	let leftIsDown =  this.cursorKeys.left.isDown;
	let rightIsDown =  this.cursorKeys.right.isDown;
	let crouchIsDown = this.cursorKeys.down.isDown;
	let spaceIsDown = this.spacebar.isDown && (this.time.now - this.spacebar.timeDown) < 100;

	if (leftIsDown) {
		this.player.body.setVelocityX(-Constants.WALK_SPEED);

		this.player.play('run', true);
	}
	else if (rightIsDown) {
		this.player.body.setVelocityX(Constants.WALK_SPEED);

		this.player.play('run', true);
	}
	else {
		this.player.body.setVelocityX(0);
		this.player.play('idle', true);
	}

	let crouching = false;
	if (crouchIsDown && onTheGround) {
		crouching = true;
		this.player.body.setVelocityX(0);
		this.player.play('crouch', true);
	} else {
	}

	if (!onTheGround) {
		this.player.play('midair', true);
	}

	if (spaceIsDown && onTheGround) {
		this.player.body.setVelocityY(crouching ? -Constants.POUNCE_VELOCITY : -Constants.JUMP_VELOCITY);
	}

	if (leftIsDown) {
		this.facingLeft = true;
	} else if (rightIsDown) {
		this.facingLeft = false;
	}
	this.player.flipX = this.facingLeft;
}
scene.prototype.updateCatboyText = function() {
	this.catboyText.text = moods[~~(Math.random() * moods.length)];
}
scene.prototype.update = function () {
	this.updatePlayerInput();

	this.parralaxBackground.y = (Constants.SCREEN_HEIGHT - this.parralaxBackground.height) * (this.player.y / this.map.heightInPixels);
	this.parralaxBackground2.x = (Constants.SCREEN_WIDTH - this.parralaxBackground2.width) * (this.player.x / this.map.widthInPixels);
	this.parralaxBackground2.y = (Constants.SCREEN_HEIGHT - this.parralaxBackground2.height) * (this.player.y / this.map.heightInPixels);
};