import type { Point, Shape } from './drawing'

export function setCanvasSize(canvas: HTMLCanvasElement): void {
	const { width, height } = canvas.getBoundingClientRect()
	canvas.width = width
	canvas.height = height
}

export function drawShapesInCanvas(context: CanvasRenderingContext2D, shapes: Shape[]): void {
	const { clientWidth, clientHeight } = context.canvas

	context.clearRect(0, 0, clientWidth, clientHeight)
	shapes.forEach((shape: Shape) => drawShapeInCanvas(context, shape))
}

export function drawShapeInCanvas(context: CanvasRenderingContext2D, shape: Shape): void {
	const { points, color, thickness } = shape

	context.strokeStyle = color
	context.lineWidth = thickness

	const [fistPoint, ...restPoints] = points
	context.beginPath()
	context.moveTo(fistPoint.x, fistPoint.y)

	restPoints.forEach((point: Point) => {
		context.lineTo(point.x, point.y)
	})

	context.stroke()
}
