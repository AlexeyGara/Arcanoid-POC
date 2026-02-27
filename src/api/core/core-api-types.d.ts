declare type ViewPort =
	Readonly<Point<number>> &
	Readonly<Size<number>> & {
		readonly dpr:number;
	};