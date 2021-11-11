import { chooseRandom } from './random'

const alignmentSensibility = 0.1

export type Point = {
	readonly x: number
	readonly y: number
}

function distanceBetweenPoints(a: Point, b: Point): number {
	return Math.hypot(a.x - b.x, a.y - b.y)
}

function arePointsAligned(a: Point, b: Point, c: Point): boolean {
	const ab = distanceBetweenPoints(a, b)
	const bc = distanceBetweenPoints(b, c)
	const ca = distanceBetweenPoints(c, a)

	return ab + bc - ca < alignmentSensibility
}

export type Shape = {
	readonly points: Point[]
	readonly thickness: number
	readonly color: string
}

export class ShapeBuilder {
	private points: Point[] = []

	constructor(
		private readonly color: string,
		private readonly thickness: number,
		firstPoint: Point
	) {
		this.points.push(firstPoint)
	}

	addPoint(x: number, y: number): ShapeBuilder {
		this.points.push({ x, y })
		return this
	}

	simplify(): ShapeBuilder {
		if (this.points.length < 3) {
			return this
		}

		for (let i = 2; i < this.points.length; i++) {
			const p1 = this.points[i - 2]
			const p2 = this.points[i - 1]
			const p3 = this.points[i]

			if (arePointsAligned(p1, p2, p3)) {
				this.points.splice(i - 1, 1)
				i--
			}
		}

		return this
	}

	build(): Shape {
		return {
			points: this.points,
			thickness: this.thickness,
			color: this.color
		}
	}
}

export function buildShape(thickness: number, color?: string) {
	return {
		startingAt(x: number, y: number): ShapeBuilder {
			return new ShapeBuilder(color ?? chooseRandomColor(), thickness, { x, y })
		}
	}
}

const HEX_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

export function chooseRandomColor(): string {
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += chooseRandom(HEX_CHARS)
	}

	return color
}
