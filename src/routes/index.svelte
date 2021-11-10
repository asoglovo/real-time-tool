<script lang="ts">
	import Toolbar from '../components/Toolbar.svelte'
	import Canvas from '../components/Canvas.svelte'
</script>

<Toolbar />
<Canvas />

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
