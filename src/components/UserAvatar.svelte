<script lang="ts">
	import { usernameAvatarLetters } from '../utils'

	export let user: { id: number; name: string }
	export let isMe: boolean = false

	$: avatarLetters = usernameAvatarLetters(user.name)
</script>

<div class="avatar" class:avatar__is-me={isMe}>
	{avatarLetters}
</div>

<style scoped>
	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		background: white;
		font-size: 20px;
		line-height: 40px;
		text-align: center;
		text-transform: uppercase;
	}

	.avatar__is-me {
		background: #f0f0f0;
		border: 3px solid tomato;
	}
</style>
