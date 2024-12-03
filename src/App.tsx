import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {log} from "util";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	const changeTaskStatus = (taskId: string, isDone: boolean) => {
		setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t ))
	}

	const removeTask = (taskId:string) => {
		setTasks(tasks.filter(t => t.id !== taskId))
	}

	const addTask = (title: string) => {
		const newTask = { id: v1(), title: title, isDone: false}
		setTasks([newTask, ...tasks])
	}

	const changeFilter = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	let tasksForTodolist = tasks
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}

	return (
		<div className="App">
			<Todolist
				changeTaskStatus={changeTaskStatus}
				title="What to learn"
				tasks={tasksForTodolist}
				filter={filter}
				changeFilter={changeFilter}
				addTask={addTask}
				removeTask={removeTask}
			/>
		</div>
	);
}

export default App;
