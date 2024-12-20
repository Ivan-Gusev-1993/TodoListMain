import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    todolistId: string
    removeTodolist:(todolistId: string)=>void
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div>
            <h3>{props.title}<Button onClick={removeTodolistHandler} title={'x'}/></h3>
          <AddItemForm addItem={addTask} />
            {
                props.tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {props.tasks.map((task) => {
                            const onClickRemoveTask = () => {
                                props.removeTask(task.id, props.todolistId)
                            }

                            const onChangeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(task.id, event.currentTarget.checked, props.todolistId)
                            }

                            return <li key={task.id}>
                                <input onChange={onChangeTaskStatus} type="checkbox" checked={task.isDone}/>
                                <span className={task.isDone ? 'is-done' : ''}>{task.title}</span>
                                <button onClick={onClickRemoveTask}>x</button>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFilterTasksHandler('all')}
                />

                <Button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('active')}
                />

                <Button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('completed')}
                />
            </div>
        </div>
    )
}

type EditableSpanPropsType = {
    title: string
    isDone: boolean
}
function (props: EditableSpanPropsType){
    return(
        <span className={props.isDone ? 'is-done' : ''}>{props.title}</span>
    )
}

