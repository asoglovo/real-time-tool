<script lang="ts">
	import { onMount } from 'svelte'
	import {
		buildShape,
		drawShapeInCanvas,
		drawShapesInCanvas,
		setCanvasSize,
		Shape,
		ShapeBuilder
	} from '../utils'

	const shapeThickness = 3

	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D

	const shapes: Array<Shape> = []
	let currentShape: ShapeBuilder | null = null

	onMount(() => {
		ctx = canvas.getContext('2d')
		setCanvasSize(canvas)

		requestAnimationFrame(renderShapesLoop)
	})

	function renderShapesLoop() {
		renderShapes()
		requestAnimationFrame(renderShapesLoop)
	}

	function renderShapes(): void {
		drawShapesInCanvas(ctx, shapes)

		if (currentShape) {
			drawShapeInCanvas(ctx, currentShape.build())
		}
	}

	function startDrawing(event: MouseEvent): void {
		const { clientX, clientY } = event
		currentShape = buildShape(shapeThickness).startingAt(clientX, clientY)
	}

	function moveDrawing(event: MouseEvent): void {
		currentShape?.addPoint(event.clientX, event.clientY)
	}

	function endDrawing(event: MouseEvent): void {
		if (currentShape !== null) {
			shapes.push(currentShape.addPoint(event.clientX, event.clientY).build())
			currentShape = null
		}
	}

	function terminateDrawing(): void {
		currentShape = null
	}

	export function clearMyDrawings(): void {
		shapes.length = 0
	}
</script>

<canvas
	bind:this={canvas}
	on:mousedown={startDrawing}
	on:mousemove={moveDrawing}
	on:mouseup={endDrawing}
	on:mouseout={endDrawing}
	on:blur={terminateDrawing}
/>

<style>
	canvas {
		flex-grow: 1;
		width: 100%;
		height: 100%;
	}
</style>
