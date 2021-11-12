export function chooseRandom<T>(options: T[]): T {
	return options[Math.floor(Math.random() * options.length)]
}

export function randomInt(max: number): number {
	return Math.floor(max * Math.random())
}

const names = ['Angel', 'Alvaro', 'Dani', 'Flor', 'Adam', 'Mauri', 'Jalal', 'Cristian', 'Konstantin']

export function randomName(): string {
	return chooseRandom(names)
}