<script lang="ts">
	import ConnectedUsers from './ConnectedUsers.svelte'
</script>

<div class="toolbar">
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
		background: #404040;
		padding: 12px 24px;
		border-radius: 8px;
	}
</style>
