import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	filter: FilterValuesType
	changeFilter: (filter: FilterValuesType) => void
}

export const Todolist = ({title, tasks, filter, changeFilter}: PropsType) => {

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter)
	}

	return (
		<div>
			<h3>{title}</h3>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {
							return <li key={task.id}>
								<input type="checkbox" checked={task.isDone}/>
								<span>{task.title}</span>
							</li>
						})}
					</ul>
			}
			<div>
				<Button
					title={'All'}
					onClick={()=> changeFilterTasksHandler('all')}
				/>

				<Button
					title={'Active'}
					onClick={()=> changeFilterTasksHandler('active')}
				/>

				<Button
					title={'Completed'}
					onClick={()=> changeFilterTasksHandler('completed')}
				/>
			</div>
		</div>
	)
}
