<script lang="ts">
	import { setCanvasSize, Shape, drawShapesInCanvas, drawShapeInCanvas } from '../utils'
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D

	const shapes: Array<Shape> = [
		{
			points: [
				{ x: 10, y: 20 },
				{ x: 100, y: 20 }
			],
			color: 'red',
			thickness: 2
		}
	]
	let currentShape: Shape | null = null

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
			drawShapeInCanvas(ctx, currentShape)
		}
	}

	function startDrawing(event: MouseEvent): void {
		const { clientX, clientY } = event

		currentShape = {
			points: [{ x: clientX, y: clientY }],
			color: '#ff0000',
			thickness: 5
		}
	}

	function moveDrawing(event: MouseEvent): void {
		if (currentShape !== null) {
			currentShape.points.push({ x: event.clientX, y: event.clientY })
		}
	}

	function endDrawing(event: MouseEvent): void {
		if (currentShape !== null) {
			currentShape.points.push({ x: event.clientX, y: event.clientY })
			shapes.push(currentShape)
			console.log(shapes)
			currentShape = null
		}
	}
</script>

<canvas
	bind:this={canvas}
	on:mousedown={startDrawing}
	on:mousemove={moveDrawing}
	on:mouseup={endDrawing}
/>

<style>
	canvas {
		flex-grow: 1;
		width: 100%;
		height: 100%;
	}
</style>
