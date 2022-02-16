//@ts-check
import { GameObject, location } from "./GameObjects.js";
import { canvas, ctx } from "./canvas.js";
import { level1 } from "./levels.js";
import { Player } from "./player.js";
import { Monster } from "./monster.js";
import { Barrier } from "./barrier.js";

class Game {
	constructor() {}

	/**
	 * @param {string[]} level
	 */
	loadLevel(level) {
		let barriers = [];
		let monster = [];
		let monsterCoords = [];
		let player;
		let playerCoords = { x: 0, y: 0 };

		level.forEach((row, idx) => {
			for (let col = 0; col < row.length; col++) {
				let x = col * 16;
				let y = idx * 16;

				switch (row[col]) {
					case "w":
						barriers.push(new Barrier(x, y, 16, 16));
						break;
					case "m":
						monsterCoords.push({ x: x, y: y });
						break;
					case "p":
						playerCoords = { x: x, y: y };
						player = new Player(null);
						player.x = x;
						player.y = y;
				}
			}
		});

		monsterCoords.forEach((c) => {
			monster.push(new Monster(barriers, c.x, c.y));
		});

		player = new Player(barriers, playerCoords.x, playerCoords.y);

		return { player: player, monsters: monster, barriers: barriers };
	}
}

let game = new Game();
let { player, monsters, barriers } = game.loadLevel(level1);

//let b1 = new Barrier(600, 300, 32, 32 * 3);
//let player = new Player(Barrier);
//let m1 = new Monster(Barrier);

let gameObjects = [player, ...monsters, ...barriers];

let currentTime = 0;
//let lastMonsterAdded = 0;
//const monsterSpawnRate = 1000;

function gameLoop(timestamp) {
	console.log(timestamp);
	// clear off the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let elapsedTime = Math.floor(timestamp - currentTime);
	currentTime = timestamp;

	//lastMonsterAdded += elapsedTime;
	//if (lastMonsterAdded >= monsterSpawnRate) {
	//	gameObjects.push(new Monster(Barrier));
	//	lastMonsterAdded = 0;
	//}

	gameObjects.forEach((o) => {
		o.update(elapsedTime);
		o.render();
	});

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
