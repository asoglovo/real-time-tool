<script lang="ts">
	import UserAvatar from './UserAvatar.svelte'

	export let users: {
		id: number
		name: string
	}[]

	export let myUser: {
		id: number
		name: string
	}
</script>

<ul class="users">
	<li>
		<UserAvatar user={myUser} isMe={true} />
	</li>
	<li>
		{#each users as user (user.id)}
			<UserAvatar user={user} isMe={false} />
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
