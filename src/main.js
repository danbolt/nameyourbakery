import {default as Constants} from './constants.js';

import * as Gameplay from './scene/gameplay.js';

import VDPPipeline from './pipeline/vdp.js';

const main = function () {
	let game = new Phaser.Game({
		width: Constants.SCREEN_WIDTH,
		height: Constants.SCREEN_HEIGHT,
		type : Phaser.WEBGL,
		pixelArt: true,
		antialias: false,
		scaleMode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
		roundPixels: true,
		input: {
		    gamepad: true
		},
		plugins: {
		    global: [],
		},
		physics: {
			default: 'arcade',
			arcade: {
	            gravity: { y: Constants.GRAVITY }
	        }
		},
		pipeline: {
			'vdp': VDPPipeline
		}
	});

	game.scene.add(Gameplay.name, Gameplay.scene, false);
	// game.scene.add(HUD.name, HUD.scene, false);

	// game.scene.start(HUD.name);
	game.scene.start(Gameplay.name);
};


window.gameMain = main;