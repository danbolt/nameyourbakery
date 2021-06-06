import {default as Constants} from './constants.js';

import * as Gameplay from './scene/gameplay.js';
import * as Preload from './scene/preload.js';
import * as Load from './scene/load.js';

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

	game.scene.add(Preload.name, Preload.scene, false);
	game.scene.add(Load.name, Load.scene, false);
	game.scene.add(Gameplay.name, Gameplay.scene, false);
	game.scene.start(Preload.name);
};


window.gameMain = main;