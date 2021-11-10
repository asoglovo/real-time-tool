<script lang="ts">
	import UserAvatar from './UserAvatar.svelte'

	let myUser = {
		id: 1,
		name: 'Glopi'
	}

	let connectedUsers = [
		{
			id: 2,
			name: 'John Doe'
		}
	]
</script>

<ul class="users">
	<li>
		<UserAvatar user={myUser} isMe={true} />
	</li>
	<li>
		{#each connectedUsers as user (user.id)}
			<UserAvatar {user} isMe={false} />
		{/each}
	</li>
</ul>

<style scoped>
	.users {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		list-style: none;
		margin: 0;
	}

	.users > li:not(:last-child) {
		margin-right: 8px;
	}
</style>
