/*
 * Copyright © 2026 Alexey Gara (alexey.gara@gmail.com). All rights reserved.
 * Project: Arcanoid-MVP
 * File: WorldFlowContext.ts
 * Path: src/game/logic/ecs/
 * Author: alexeygara
 * Last modified: 2026-02-26 00:37
 */


import {
	KeyInputData,
	TouchInputData
}                            from "../../../api/core/input-types";
import { CollideSectorsMap } from "./index";

export type WorldFlowContext = {

	input:{
		keys:{
			leftKey:KeyInputData;
			rightKey:KeyInputData;
		};
		touches:{
			leftTouch:TouchInputData;
			rightTouch:TouchInputData;
		};
	};

	gamefield:{
		collideSectors:CollideSectorsMap;
		area:Rectangle<number>;
	};

	systems:{
		//animation:{
		//	starter:AnimationStarter;
		//	player:IAnimationPlayer;
		//};
		//sound:SoundStarter;
	};
}