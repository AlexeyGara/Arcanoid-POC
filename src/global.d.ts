declare function assertNever(value:never):never;

declare const wait:(milliSeconds:number) => Promise<void>;

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const _global:Global;

declare const logger:ILogger;

interface Global {

	logger:ILogger;

	wait:typeof wait;

	finalMethod:typeof finalMethod;
	finalProperty:typeof finalProperty;
	final:typeof final;
}
