//@ts-check
import { ctx } from "./canvas.js";

export class GameObject {
	constructor(w, h) {
		this.x = 0;
		this.y = 0;
		this.width = w;
		this.height = h;
		this.fillStyle = "";
		this.lastlocattion = new location(this.x, this.y);
	}

	update(elapsedTime) {
		this.lastlocattion.x = this.x;
		this.lastlocattion.y = this.y;
	}

	render() {
		ctx.save();
		ctx.fillStyle = this.fillStyle;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
	}

	getBounds() {
		return new ObjectBounds(this.x, this.y, this.width, this.height);
	}

	/**
	 * @param { GameObject } o
	 */
	isColliding(o) {
		let myBounds = this.getBounds();
		let oBounds = o.getBounds();

		if (myBounds.bottom <= oBounds.top) return undefined;
		if (myBounds.top >= oBounds.bottom) return undefined;
		if (myBounds.right <= oBounds.left) return undefined;
		if (myBounds.left >= oBounds.right) return undefined;

		return this.lastlocattion;
	}
}

class ObjectBounds {
	constructor(x, y, w, h) {
		this.top = y;
		this.bottom = y + h;
		this.left = x;
		this.right = x + w;
	}
}

export class location {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
