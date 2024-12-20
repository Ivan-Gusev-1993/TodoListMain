import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TodolistsType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type StateType = {
	[key: string] : Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

		let todolistId1= v1();
		let todolistId2= v1();

	let [todolists, setTodolists]=useState<Array<TodolistsType>>([
		{id: todolistId1, title: 'What to learn',  filter: 'all'},
		{id: todolistId2, title: 'What to sale',  filter: 'all'}
	])

	const [tasks, setTasks] = useState<StateType>({
			[todolistId1]: [
				{id: v1(), title: 'HTML&CSS', isDone: true},
				{id: v1(), title: 'JS', isDone: true},
				{id: v1(), title: 'ReactJS', isDone: false}],

			[todolistId2]: [
				{id: v1(), title: 'piano', isDone: true},
				{id: v1(), title: 'xbox', isDone: true},
				{id: v1(), title: 'laptop', isDone: false},
				{id: v1(), title: 'mouse apple', isDone: false},]
		}
	)

	const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
		setTasks({...tasks,[todolistId]: tasks[todolistId].map(t=> t.id === taskId ? {...t, isDone: isDone } : t)})
	}

	const removeTask = (taskId:string, todolistId: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
	}

	const addTask = (title: string, todolistId: string) => {
		const newTask = { id: v1(), title: title, isDone: false}
		setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId] ]})
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		setTodolists(todolists.map(td => td.id === todolistId ? {...td, filter: filter} : td))
	}

	const removeTodolist = (todolistId: string) => {
		let filteredTodo = todolists.filter(tl => tl.id !== todolistId)
		setTodolists([...filteredTodo])
		delete tasks[todolistId]
		setTasks({...tasks})
	}

	const addTodolist = (title: string) => {
	let todolist: TodolistsType = {id: v1(), title: title, filter: "all" }
		setTodolists([todolist, ...todolists])
		setTasks({...tasks, [todolist.id] : []})
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist}/>

			{todolists.map(todo => {

				let tasksForTodolist = tasks[todo.id]
				if (todo.filter === 'active') {
					tasksForTodolist = tasks[todo.id].filter(task => !task.isDone)
				}

				if (todo.filter === 'completed') {
					tasksForTodolist = tasks[todo.id].filter(task => task.isDone)
				}

				return(
						<Todolist
							key={todo.id}
							todolistId={todo.id}
							changeTaskStatus={changeTaskStatus}
							title={todo.title}
							tasks={tasksForTodolist}
							filter={todo.filter}
							changeFilter={changeFilter}
							addTask={addTask}
							removeTask={removeTask}
							removeTodolist={removeTodolist}
						/>
					)
				}

			)}

		</div>
	);
}

export default App;
