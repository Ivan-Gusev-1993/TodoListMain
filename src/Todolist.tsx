import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
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

export const Todolist = ({title, tasks, filter, changeFilter, addTask, removeTask, changeTaskStatus, todolistId, removeTodolist}: PropsType) => {
    let [inputTitle, setInputTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value) {
            setInputTitle(event.currentTarget.value)
            setError(null)
        }
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickButtonHandler()
        }
    }

    const onClickButtonHandler = () => {
        if (inputTitle.trim() !== '') {
            addTask(inputTitle.trim(), todolistId)
        } else {
            setError('Title is required')
        }
        setInputTitle('')
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    return (
        <div>
            <h3>{title}<Button onClick={removeTodolistHandler} title={'x'}/></h3>
            <input
                onKeyDown={(event) => onKeyDownHandler(event)} className={error ? 'error' : ''}
                value={inputTitle}
                onChange={onChangeInputHandler} type="text"
			/>
            <Button title={'+'} onClick={onClickButtonHandler}/>
            <span className={error ? 'error-message' : ''}>{error}</span>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {
                            const onClickRemoveTask = () => {
                                removeTask(task.id, todolistId)
                            }

                            const onChangeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(task.id, event.currentTarget.checked, todolistId)
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
                    className={filter === 'all' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFilterTasksHandler('all')}
                />

                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('active')}
                />

                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('completed')}
                />
            </div>
        </div>
    )
}
