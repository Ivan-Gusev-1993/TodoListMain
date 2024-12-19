import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType ={
    addItem:(taskId: string)=>void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [inputTitle, setInputTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickButtonHandler()
        }
    }

    const onClickButtonHandler = () => {
        if (inputTitle.trim() !== '') {
            props.addItem(inputTitle.trim())
        } else {
            setError('Title is required')
        }
        setInputTitle('')
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value) {
            setInputTitle(event.currentTarget.value)
            setError(null)
        }
    }

    return(
        <div>
            <input
                onKeyDown={(event) => onKeyDownHandler(event)} className={error ? 'error' : ''}
                value={inputTitle}
                onChange={onChangeInputHandler} type="text"
            />
            <Button title={'+'} onClick={onClickButtonHandler}/>
            <span className={error ? 'error-message' : ''}>{error}</span>
        </div>
    )

}