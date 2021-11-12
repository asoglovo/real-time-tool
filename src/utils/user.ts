export type User = {
	readonly id: number
	readonly name: string
}

export function isUserInLocalStorage(): boolean {
	return sessionStorage.getItem('user') !== null
}

export function getUserFromLocalStorage(): User | null {
	const user = sessionStorage.getItem('user')

	return user ? JSON.parse(user) : null
}

export function saveUserToLocalStorage(user: User): void {
	sessionStorage.removeItem('user')
	sessionStorage.setItem('user', JSON.stringify(user))
}
