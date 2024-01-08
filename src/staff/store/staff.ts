import {makeAutoObservable} from 'mobx'

export interface IWorker {
	id: number
	name: string
	lastName: string
	age: number
}

class Staff {
	staff: IWorker[] = []
	filtered: IWorker[] | null = null
	lastId = 0

	constructor() {
		makeAutoObservable(this)
	}

	add(name: string, lastName: string, age: number) {
		this.staff.push({id: this.lastId++, name, lastName, age})
	}

	remove(id: number) {
		this.staff = this.staff.filter(worker => worker.id !== id)
	}

	edit(id: number, name: string, lastName: string, age: number) {
		const index = this.staff.findIndex(worker => worker.id === id)
		this.staff[index] = {id, name, lastName, age}
	}

	filter(id: number | undefined, name: string | undefined, lastName: string | undefined, age: number | undefined) {
		console.log(id, name, age)
		this.filtered = this.staff.filter(worker => {
			if (id !== undefined && worker.id !== id) return
			if (name !== undefined && worker.name !== name) return
			if (lastName !== undefined && worker.lastName !== lastName) return
			if (age !== undefined && worker.age !== age) return
			return true
		})
	}

	resetFilter() {
		this.filtered = null
	}
}

export default new Staff()
