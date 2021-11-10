export function usernameAvatarLetters(username: string): string {
	const [name, surname] = username.split(' ')
	if (name && surname) {
		return name.substr(0, 1) + surname.substr(0, 1)
	}

	return username.substr(0, 2)
}
