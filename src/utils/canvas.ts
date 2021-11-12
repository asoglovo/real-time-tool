import type { Shape } from './drawing'
import type { Point } from './point'

export function setCanvasSize(canvas: HTMLCanvasElement): void {
	const { width, height } = canvas.getBoundingClientRect()
	canvas.width = width * window.devicePixelRatio
	canvas.height = height * window.devicePixelRatio
}

export function drawShapesInCanvas(context: CanvasRenderingContext2D, shapes: Shape[]): void {
	const { width, height } = context.canvas

	context.clearRect(0, 0, width, height)
	shapes.forEach((shape: Shape) => drawShapeInCanvas(context, shape))
}

export function drawShapeInCanvas(context: CanvasRenderingContext2D, shape: Shape): void {
	const { points, color, thickness } = shape

	context.strokeStyle = color
	context.lineWidth = thickness

	const [fistPoint, ...restPoints] = points
	context.beginPath()

	const firstCanvasPoint = pointToCanvasCoords(context.canvas, fistPoint)
	context.moveTo(firstCanvasPoint.x, firstCanvasPoint.y)

	restPoints.forEach((point: Point) => {
		const canvasPoint = pointToCanvasCoords(context.canvas, point)
		context.lineTo(canvasPoint.x, canvasPoint.y)
	})

	context.stroke()
}

function pointToCanvasCoords(canvas: HTMLCanvasElement, point: Point): Point {
	const { left, top } = canvas.getBoundingClientRect()

	return {
		x: (point.x - left) * window.devicePixelRatio,
		y: (point.y - top) * window.devicePixelRatio
	}
}
