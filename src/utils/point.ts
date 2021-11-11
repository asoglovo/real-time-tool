const alignmentSensibility = 0.1

export type Point = {
	readonly x: number
	readonly y: number
}

export function distanceBetweenPoints(a: Point, b: Point): number {
	return Math.hypot(a.x - b.x, a.y - b.y)
}

export function arePointsAligned(a: Point, b: Point, c: Point): boolean {
	const ab = distanceBetweenPoints(a, b)
	const bc = distanceBetweenPoints(b, c)
	const ca = distanceBetweenPoints(c, a)

	return ab + bc - ca < alignmentSensibility
}
