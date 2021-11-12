<script lang="ts">
	import { io } from 'socket.io-client'
	import Toolbar from '../components/Toolbar.svelte'
	import Canvas from '../components/Canvas.svelte'
	import { onDestroy, onMount } from 'svelte'
	import { randomInt, randomName } from '../utils'

	let socket
	socket = io('http://localhost:5000')
	
	let canvas: Canvas
	let users = []
	const myUser = {
		id: randomInt(1000),
		name: randomName()
	}

	function clearMyDrawings() {
		canvas.clearMyDrawings()
	}
	

	onMount(() => {
		socket.emit('connect-user', { user: myUser })
		socket.on('all-users', ({ connectedUsers }) => {
			console.log('the users are:', connectedUsers)
			users = connectedUsers.filter((user) => user.id !== myUser.id)
		})
	})

	onDestroy(() => {
		console.log('run on destroy')
		socket.emit('disconnect-user', { user: myUser })
	})
</script>

<Toolbar on:clearMine={clearMyDrawings} {socket} {users} {myUser} />
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
