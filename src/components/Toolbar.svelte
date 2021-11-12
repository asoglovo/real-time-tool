<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { Socket } from 'socket.io-client'
	import ConnectedUsers from './ConnectedUsers.svelte'

	export let socket: Socket
	export let users: {
		id: number
		name: string
	}[]
	export let myUser: {
		id: number
		name: string
	}

	const dispatch = createEventDispatcher()

	function emitClearMine() {
		dispatch('clearMine')
	}

	function connectUserToSocket() {
		socket.emit('connect-user', { user: myUser })
	}
</script>

<div class="toolbar">
	<button on:click={emitClearMine}>Clear Mine</button>
	<button on:click={connectUserToSocket}>Connect!</button>
	<ConnectedUsers {users} {myUser} />
</div>

<style>
	.toolbar {
		position: absolute;
		top: 16px;
		right: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #b7b7b7;
		padding: 12px 24px;
		border-radius: 8px;
	}
</style>
