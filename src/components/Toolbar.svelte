<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import ConnectedUsers from './ConnectedUsers.svelte'

	const dispatch = createEventDispatcher()

	function emitClearMine() {
		dispatch('clearMine')
	}
</script>

<div class="toolbar">
	<button on:click={emitClearMine}>Clear Mine</button>
	<ConnectedUsers />
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
