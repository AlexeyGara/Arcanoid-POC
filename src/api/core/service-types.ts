export type ResizeInfo = {
	readonly viewPort:Readonly<ViewPort>;
	readonly scale:number;
}

export interface IResizable {

	onResize?(resizeInfo:ResizeInfo):void;
}

export interface IResizeManager {

	addListener(listener:IResizable):void;

	removeListener(listener:IResizable):void;
}

export type ViewSizeProvider = () => ViewPort;

export type ResizeEventForwarder = (receiver:() => void) => void;

export type FocusInOutForwarder = (focusInReceiver:() => void, focusOutReceiver:() => void) => void

export type BlurAndFocusForwarder = (blurReceiver?:() => void, focusReceiver?:() => void) => void