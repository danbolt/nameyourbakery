export const name = 'Cinematic';
import {default as Constants} from '../constants.js';

const dialogue0 = [
	'ANVIL DISTRICT 16XX',
	'Oh geez oh geez!\nWhere is he?',
	'You called for Catboy Benrey?',
	'I need the carrots now!\nYou promised all of them!',
	'We\'re running out of time!\nHe\'s going to destroy the bakery!',
	'Okay!\nCatboy Benrey will get your carrots!'
];

const shake0 = {
	"4": 200
}

export const scene = function () {
	this.dialogeBacking = null;
};
scene.prototype.init = function () {
	this.config = {
		image: 'introcomic',
		lines: dialogue0,
		shake: shake0
	}
};
scene.prototype.preload = function () {


};
scene.prototype.create = function () {
	const vdpPipeline = this.renderer.pipelines.get('vdp');

	const image = this.add.image(0, 0, this.config.image);
	image.setOrigin(0);
	image.setPipeline(vdpPipeline);

    this.cameras.main.setBackgroundColor(0xffffff);
    image.x = 600;
    // this.cameras.main.setZoom(0.5);

    const dialogeBacking = this.add.rectangle(0, 3* Constants.SCREEN_HEIGHT / 4, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT / 4, 0x000000);
    dialogeBacking.setScrollFactor(0);
    dialogeBacking.setOrigin(0, 0);
    this.dialogeBacking = dialogeBacking;

    const loadingText = this.add.bitmapText(16, Constants.SCREEN_HEIGHT / 4 * 3 + 8, 'serif', '', 20);
    loadingText.setScrollFactor(0);

    const numberOfTiles = this.config.lines.length;

    let tweens = [];
    for (let i = 0; i < numberOfTiles; i++) {
    	const t = this.add.tween({
	    	targets: image,
	    	x: (15 - (315 * (i % 3))),
	    	y: -60 - (300 * (~~(i / 3))),
	    	scale: 0.88888888,
	    	duration: 417,
	    	paused: true,
	    	ease: Phaser.Math.Easing.Cubic.InOut,
	    	delay: (i === 0) ? 1000 : 700
	    })

	    tweens.push(t);
    }
    for (let i = 0; i < numberOfTiles; i++) {
    	const line = this.config.lines[i];
    	const t = tweens[i];

    	const tileDoneEmitter = new Phaser.Events.EventEmitter();
    	let bipCount = 0;

		t.on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
			const index = i;
			if (this.config.shake[index]) {
				this.cameras.main.shake(this.config.shake[index]);
			}

			this.time.addEvent({ delay: 70, callback: () => {
				loadingText.text += line[bipCount];

				bipCount++;

				if (bipCount === line.length) {
					tileDoneEmitter.emit('done');
				}
			}, repeat: (line.length - 1) });
		})
		


    	if (i < (numberOfTiles - 1)) {
    		const tNext = tweens[i + 1];

    		tileDoneEmitter.on('done', () => {
    			tNext.play();
    		});

    		tNext.on(Phaser.Tweens.Events.TWEEN_START, () => {
    			loadingText.text = '';
    		})
    	} else {
    		tileDoneEmitter.on('done', () => {
    			this.cameras.main.fadeOut(800);
    			this.time.addEvent({
    				delay: 1000,
    				callback: () => {
    					this.scene.start('Gameplay');
    				}
    			})
    		});
    	}
    }
    tweens[0].play();


    this.cameras.main.fadeIn(800);
};
scene.prototype.update = function () {
}