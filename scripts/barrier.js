//@ts-check
import { GameObject, location } from "./GameObjects.js";
import { canvas, ctx } from "./canvas.js";

export class Barrier extends GameObject {
	constructor(x, y, w, h) {
		super(w, h);
		this.x = x;
		this.y = y;
		this.fillStyle = "black";
	}
}
