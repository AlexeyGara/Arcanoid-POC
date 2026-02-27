export type KeyCode = string;

export type KeyInputData = {

	readonly keyCode:KeyCode;

	isDown?:boolean;
	lastDownDurationMs?:number;

	downCounter?:number;
	upCounter?:number;
}

export type TouchType = "pointer";

export type TouchInputData = {

	readonly touchType:TouchType;

	isContinue?:boolean;
	lastContinueDurationMs?:number;

	startX?:number;
	startY?:number;

	currX?:number;
	currY?:number;

	endX?:number;
	endY?:number;
}
