<script lang="ts">
	import type { Socket } from 'socket.io-client'
	import { onMount } from 'svelte'
	import {
		buildShape,
		drawShapeInCanvas,
		drawShapesInCanvas,
		setCanvasSize,
		Shape,
		ShapeBuilder,
		User
	} from '../utils'

	const shapeThickness = 3
	type UserId = number

	export let socket: Socket
	export let myUser: User

	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D

	let shapesByUser: Record<UserId, Shape[]> = {}
	let currentShape: ShapeBuilder | null = null

	socket.on('all-shapes', (userShapes: Record<UserId, Shape[]>) => {
		// myShapes = userShapes[myUser.id] ?? myShapes
		shapesByUser = userShapes

		if (!(myUser.id in shapesByUser)) {
			shapesByUser[myUser.id] = []
		}
		console.log(shapesByUser)
	})

	onMount(() => {
		shapesByUser[myUser.id] = []

		ctx = canvas.getContext('2d')
		setCanvasSize(canvas)

		requestAnimationFrame(renderShapesLoop)
	})

	function renderShapesLoop() {
		renderShapes()
		requestAnimationFrame(renderShapesLoop)
	}

	function renderShapes(): void {
		Object.values(shapesByUser).forEach((shapes: Shape[]) => drawShapesInCanvas(ctx, shapes))

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
			const newShape = currentShape.addPoint(event.clientX, event.clientY).simplify().build()
			shapesByUser[myUser.id].push(newShape)
			socket.emit('shape-created', { userId: myUser.id, shape: newShape })

			currentShape = null
		}
	}

	function terminateDrawing(): void {
		currentShape = null
	}

	export function clearMyDrawings(): void {
		shapesByUser[myUser.id] = []
		// TODO: emit to socket
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
