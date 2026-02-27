/*
 * Copyright © 2026 Alexey Gara (alexey.gara@gmail.com). All rights reserved.
 * Project: Chesstles-TS
 * File: index.ts
 * Path: src/platform/browser/
 * Author: alexeygara
 * Last modified: 2026-01-29 22:45
 */

import {
	BlurAndFocusForwarder,
	FocusInOutForwarder,
	ResizeEventForwarder,
	ViewSizeProvider
} from "../../api/core/service-types";

export const isBrowser = ():boolean => typeof window !== 'undefined' && typeof window.document !== 'undefined';

const RESIZE_DEBOUNCE_TIME = 50;
let resizeTimer:ReturnType<typeof setTimeout>;

export const focusEventsEmitter:FocusInOutForwarder = (focusInReceiver:() => void, focusOutReceiver:() => void) => {
	document.addEventListener("visibilitychange", () => {
		if(document.hidden) {
			// check on/off of sounds 'auto-suspend'
			focusOutReceiver();
		}
		else {
			focusInReceiver();
			// do not forget to 'resume()' AudioContext!
		}
	});
};

export const blurEventsEmitter:BlurAndFocusForwarder = (blurReceiver?:() => void, focusReceiver?:() => void) => {
	if(blurReceiver) {
		window.addEventListener("blur", () => {
			blurReceiver();
		});
	}
	if(focusReceiver) {
		window.addEventListener("focus", () => {
			focusReceiver();
		});
	}
};

export const resizeEventEmitter:ResizeEventForwarder = (receiver:() => void) => {
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(receiver, RESIZE_DEBOUNCE_TIME);
	});
};

export const viewSizeProvider:ViewSizeProvider = () => {
	return {
		x:      0,
		y:      0,
		width:  window.innerWidth,//screen.availWidth//screen.width
		height: window.innerHeight,//screen.availHeight//screen.height
		dpr:    getDPR()
	};
};

export const getDPR = ():number => window.devicePixelRatio;

export type KeyEventName = "keydown" | "keyup";

export const registerKeyInput = (eventName:KeyEventName, keyCode:string,
								 emitter:EventTarget, handleCallback:() => void): () => void => {

	const keyboardEventHandler = (e:Event):void => {
		const keyEvent = e as KeyboardEvent;

		if(e.type == eventName && !keyEvent.repeat && keyEvent.code == keyCode) {
			handleCallback();
		}
	};

	emitter.addEventListener(eventName, keyboardEventHandler);

	return () => {
		emitter.removeEventListener(eventName, keyboardEventHandler);
	};
}