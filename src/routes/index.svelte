<script lang="ts">
	import { io } from 'socket.io-client'
	import Toolbar from '../components/Toolbar.svelte'
	import Canvas from '../components/Canvas.svelte'
	import { onMount } from 'svelte'
	import { randomInt, randomName } from '../utils'

	const socket = io("http://localhost:5000")
	let canvas: Canvas
	const randomUser = {
			id: randomInt(1000),
			name: randomName()
		}

	function clearMyDrawings() {
		canvas.clearMyDrawings()
	}

	onMount(() => {
		socket.emit('connection-user')
	})
</script>

<Toolbar on:clearMine={clearMyDrawings} {socket} user={randomUser} />
<Canvas bind:this={canvas} />

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
		font-size: 16px;
	}

	:global(#svelte) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
