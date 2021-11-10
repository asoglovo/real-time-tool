export type Point = {
	readonly x: number
	readonly y: number
}

export type Shape = {
	readonly points: Point[]
	readonly thickness: number
	readonly color: string
}
