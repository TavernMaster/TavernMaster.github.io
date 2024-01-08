import {observer} from 'mobx-react-lite'
import styles from './Staff.module.scss'
import staff, {IWorker} from '../store/staff'
import {useRef} from 'react'

const Staff = observer(() => {
	const addHandler = () => {
		const name = prompt('Введите имя')
		const lastName = prompt('Введите фамилию')
		const age = prompt('Введите возраст')
		if (!name || !lastName || !age || isNaN(+age)) return alert('Некорректные данные')
		staff.add(name, lastName, +age)
	}

	const idRef = useRef<HTMLInputElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const lastNameRef = useRef<HTMLInputElement>(null)
	const ageRef = useRef<HTMLInputElement>(null)

	const filterHandle = () => {
		const id = idRef.current?.value ? +idRef.current?.value : undefined
		const name = nameRef.current?.value ? nameRef.current?.value : undefined
		const lastName = lastNameRef.current?.value ? lastNameRef.current?.value : undefined
		const age = ageRef.current?.value ? +ageRef.current?.value : undefined
		staff.filter(id, name, lastName, age)
	}

	const resetFilterHandle = () => {
		staff.resetFilter()
	}

	return (
		<>
			<header className={styles.header}>
				<h2 className={styles.title}>Сотрудники</h2>
				<section className={styles.filter}>
					<input type="text" ref={idRef} placeholder="ID" />
					<input type="text" ref={nameRef} placeholder="Имя" />
					<input type="text" ref={lastNameRef} placeholder="Фамилия" />
					<input type="text" ref={ageRef} placeholder="Возраст" />
					<button onClick={filterHandle}>Поиск</button>
					<button onClick={resetFilterHandle}>Сбросить фильтр</button>
				</section>
				<button onClick={addHandler}>Добавить</button>
			</header>
			<table className={styles.staff}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Имя</th>
						<th>Фамилия</th>
						<th>Возраст</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>{staff.filtered ? staff.filtered.map(worker => <Worker key={worker.id} {...worker} />) : staff.staff.map(worker => <Worker key={worker.id} {...worker} />)}</tbody>
			</table>
		</>
	)
})

export const Worker = ({id, name, lastName, age}: IWorker) => {
	const deleteHandler = () => {
		staff.remove(id)
	}

	const editHandler = () => {
		const name = prompt('Введите имя')
		const lastName = prompt('Введите фамилию')
		const age = prompt('Введите возраст')
		if (!name || !lastName || !age || isNaN(+age)) return alert('Некорректные данные')
		staff.edit(id, name, lastName, +age)
	}

	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			<td>{lastName}</td>
			<td>{age}</td>
			<td>
				<button onClick={editHandler}>Редактировать</button>
			</td>
			<td>
				<button onClick={deleteHandler}>Удалить</button>
			</td>
		</tr>
	)
}

export default Staff
