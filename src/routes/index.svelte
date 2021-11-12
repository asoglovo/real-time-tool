<script lang="ts">
	import { io } from 'socket.io-client'
	import { onMount } from 'svelte'
	import Canvas from '../components/Canvas.svelte'
	import Toolbar from '../components/Toolbar.svelte'
	import {
		getUserFromLocalStorage,
		isUserInLocalStorage,
		randomInt,
		randomName,
		saveUserToLocalStorage,
		User
	} from '../utils'

	const socket = io('http://localhost:5001')

	let canvas: Canvas
	let users: User[] = []
	let myUser: User | undefined

	onMount(() => {
		if (isUserInLocalStorage()) {
			myUser = getUserFromLocalStorage()
		} else {
			myUser = {
				id: randomInt(Number.MAX_SAFE_INTEGER),
				name: randomName()
			}

			saveUserToLocalStorage(myUser)
		}

		socket.emit('connect-user', { user: myUser })

		socket.on('all-users', ({ connectedUsers }) => {
			console.log('called all users,', connectedUsers)
			users = connectedUsers.filter(({ id }) => id !== myUser.id)
		})
	})

	function clearMyDrawings() {
		canvas.clearMyDrawings()
	}

	function clearAllDrawings() {
		clearMyDrawings()
		socket.emit('clear-drawings')
	}

	// function emitUserDisconnect(e) {
	// 	console.log('called', e)
	// 	socket.emit('disconnect-user', { user: myUser })
	// 	return ''
	// }
</script>

{#if !!myUser}
	<Toolbar
		on:clearMine={clearMyDrawings}
		on:clearAll={clearAllDrawings}
		{socket}
		{users}
		{myUser}
	/>
	<Canvas bind:this={canvas} {myUser} {socket} />
{/if}

<!-- <svelte:window on:beforeunload={emitUserDisconnect} /> -->
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
