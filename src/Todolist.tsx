import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    onChangeTaskTitle:(taskId: string, titleValue: string, todolistId: string)=>void
    todolistId: string
    removeTodolist:(todolistId: string)=>void
    ChangeTodolistTitle:(titleValue: string, todolistId: string)=>void
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

    const onChangeTodolistTitle = (titleValue: string) => {
        props.ChangeTodolistTitle(titleValue, props.todolistId)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitle}/> <Button onClick={removeTodolistHandler} title={'x'}/></h3>
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

                            const onChangeTaskTitle = (titleValue: string) => {
                                props.onChangeTaskTitle(task.id, titleValue, props.todolistId)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input onChange={onChangeTaskStatus} type="checkbox" checked={task.isDone}/>
                               <EditableSpan title={task.title} onChange={onChangeTaskTitle} />
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
