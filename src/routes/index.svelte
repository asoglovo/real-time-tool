
	<script lang="ts">
	import { io } from 'socket.io-client'
	import Toolbar from '../components/Toolbar.svelte'
	import Canvas from '../components/Canvas.svelte'
	import { randomInt, randomName } from '../utils'

	const socket = io('http://localhost:5000')

	let canvas: Canvas
	let shapes
	let users = []
	const myUser = {
		id: randomInt(1000),
		name: randomName()
	}

	function clearMyDrawings() {
		canvas.clearMyDrawings()
	}

	socket.on('all-users', ({ connectedUsers }) => {
		console.log('called all users,', connectedUsers)
		users = connectedUsers.filter(({ id }) => id !== myUser.id)
	})

	socket.on('all-shapes', (userShapes) => {
		shapes = Object.keys(userShapes)
			.filter((userId) => +userId !== myUser.id)
			.reduce((obj, key) => {
				obj[key] = userShapes[key]
				return obj;
			}, {})
		console.log(shapes)
	})

	function emitUserDisconnect(e) {
		console.log('called', e)
		socket.emit('disconnect-user', { user: myUser })
		return ''
	}

</script>

<Toolbar on:clearMine={clearMyDrawings} {socket} {users} {myUser} />
<Canvas bind:this={canvas} {myUser} {socket} {shapes} />
<svelte:window on:beforeunload={emitUserDisconnect} />

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
