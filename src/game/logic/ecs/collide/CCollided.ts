/*
 * Copyright © 2026 Alexey Gara (alexey.gara@gmail.com). All rights reserved.
 * Project: Arcanoid-MVP
 * File: CCollided.ts
 * Path: src/game/logic/ecs/collide/
 * Author: alexeygara
 * Last modified: 2026-02-26 00:51
 */

import { CollidedWithEntity } from "../index";

export class CCollided {

	collidedWith?:CollidedWithEntity;
	collidePos?:Point<number>;
	collideVertical?:boolean;

	constructor() {
	}
}