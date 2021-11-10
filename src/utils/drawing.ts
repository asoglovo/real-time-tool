import { chooseRandom } from './random'

export type Point = {
	readonly x: number
	readonly y: number
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
