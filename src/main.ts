import "./global-init";

import { Bootstrap } from "./Bootstrap";
import { focusEventsEmitter,resizeEventEmitter,viewSizeProvider } from "./platform/browser";


const ORIGIN_ASSETS_SIZE 	= {
	width: 800 as uintMoreZero,
	height: 600 as uintMoreZero
};

const appContainer = document.getElementById("pixi-container") as HTMLDivElement;

void (async ():Promise<void> => {

	const bootstrap = new Bootstrap(
		ORIGIN_ASSETS_SIZE,
		appContainer,
		focusEventsEmitter,
		resizeEventEmitter,
		viewSizeProvider
	);

	await bootstrap.start();

})();
