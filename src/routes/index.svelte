<script lang="ts">
	import Toolbar from '../components/Toolbar.svelte'
	import Canvas from '../components/Canvas.svelte'

	let canvas: Canvas

	function clearMyDrawings() {
		canvas.clearMyDrawings()
	}
</script>

<Toolbar on:clearMine={clearMyDrawings} />
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
