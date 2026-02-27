import { World }            from "@releaseband/ecs";
import {
	Application,
	Container
}                           from "pixi.js";
import { KeyInputData }     from "./api/core/input-types";
import {
	FocusInOutForwarder,
	ResizeEventForwarder,
	ViewSizeProvider
}                           from "./api/core/service-types";
import { LevelBuilder }     from "./game/LevelBuilder";
import { WorldFlow }        from "./game/logic/ecs/WorldFlow";
import { WorldFlowContext } from "./game/logic/ecs/WorldFlowContext";
import {
	blurEventsEmitter,
	getDPR,
	registerKeyInput
}                           from "./platform/browser";

const USE_DPR                  = true;
//const DEFAULT_KEY_INPUT_TARGET = window;

export class Bootstrap {

	private readonly _originAssetsSize:Size<uintMoreZero>;
	private readonly _appViewContainer:HTMLDivElement;
	private readonly _onFocusInOutForwarder:FocusInOutForwarder;
	private readonly _onResizeForwarder:ResizeEventForwarder;
	private readonly _viewSizeProvider:ViewSizeProvider;

	private _world?:World;

	constructor(
		originAssetsSize:Size<uintMoreZero>,
		appViewContainer:HTMLDivElement,
		onFocusInOutForwarder:FocusInOutForwarder,
		onResizeForwarder:ResizeEventForwarder,
		viewSizeProvider:ViewSizeProvider
	) {
		this._originAssetsSize      = originAssetsSize;
		this._appViewContainer      = appViewContainer;
		this._onFocusInOutForwarder = onFocusInOutForwarder;
		this._onResizeForwarder     = onResizeForwarder;
		this._viewSizeProvider      = viewSizeProvider;
	}

	async start():Promise<void> {

		const root = await this._startPixi();

		const context = await this._startGame(root);

		this._registerKeyEvents(context.input.keys.leftKey, context.input.keys.rightKey);

		logger.log(String(this._originAssetsSize));
		logger.log(String(this._onResizeForwarder));
		logger.log(String(this._viewSizeProvider));
	}

	private async _startPixi():Promise<Container> {

		const app = new Application();

		await app.init({
						   background: "#000620",
						   //background:  "black",
						   width:  800,
						   height: 600,
						   //resizeTo:    window, // заменить
						   resolution:  USE_DPR ? getDPR() : 1,//for calculate pixi's screen size with dpr
						   autoDensity: true,
						   antialias:   true, // опционально
						   //autoStart:   false,
					   });

		this._appViewContainer.appendChild(app.canvas);

		app.ticker.add((time) => {

			this._world?.update(time.deltaMS);
		});

		return app.stage;
	}

	private async _startGame(root:Container):Promise<WorldFlowContext> {

		const flowContext:WorldFlowContext = {
			input: {
				keys:    {
					leftKey:  {
						keyCode:            "KeyA",
						isDown:             false,
						lastDownDurationMs: 0,
						downCounter:        0
					},
					rightKey: {
						keyCode:            "KeyD",
						isDown:             false,
						lastDownDurationMs: 0,
						downCounter:        0
					},
				},
				touches: {
					leftTouch:  {
						touchType:              "pointer",
						isContinue:             false,
						lastContinueDurationMs: 0,
						currX:                  0,
						currY:                  0,
					},
					rightTouch: {
						touchType:              "pointer",
						isContinue:             false,
						lastContinueDurationMs: 0,
						currX:                  0,
						currY:                  0,
					},
				},
			},

			gamefield: {
				collideSectors: {
					rowsSplits: [180, 600 - 180 * 2, 600 - 180],
					colSplits:  [200, 800 - 200 * 2, 800 - 200]
				},
				area:           { x: 24, y: 24, width: 800 - 24 * 2, height: 600 - 24 }
			},

			systems: {}

		};

		const flowControl = new WorldFlow(flowContext);

		this._world = flowControl.start();

		const builder = new LevelBuilder(flowControl,
										 root,
										 flowContext.gamefield);

		await builder.load();

		builder.build();

		return flowContext;
	}

	private _registerKeyEvents(keyLeftLink:KeyInputData, keyRightLink:KeyInputData):void {

		const disposers:(() => void)[] = [];

		this._registerKeyDown(keyLeftLink, disposers);
		this._registerKeyUp(keyLeftLink, disposers);

		this._registerKeyDown(keyRightLink, disposers);
		this._registerKeyUp(keyRightLink, disposers);

		this._onFocusInOutForwarder(() => {

		}, () => {
			keyLeftLink.isDown  = false;
			keyRightLink.isDown = false;
		});

		blurEventsEmitter(() => {
			keyLeftLink.isDown  = false;
			keyRightLink.isDown = false;
		})
	}

	private _registerKeyDown(keyInputLink:KeyInputData, disposers:(() => void)[]):void {
		disposers.push(registerKeyInput("keydown", keyInputLink.keyCode, window, () => {
			if(!keyInputLink.isDown) {
				keyInputLink.lastDownDurationMs = 0;
			}
			keyInputLink.isDown = true;
			if(keyInputLink.downCounter !== undefined) {
				keyInputLink.downCounter++;
			}
		}));
	}

	private _registerKeyUp(keyInputLink:KeyInputData, disposers:(() => void)[]):void {
		disposers.push(registerKeyInput("keyup", keyInputLink.keyCode, window, () => {
			keyInputLink.isDown = false;
			if(keyInputLink.upCounter !== undefined) {
				keyInputLink.upCounter++;
			}
		}));
	}

}