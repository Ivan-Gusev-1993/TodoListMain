import {useState, ChangeEvent} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (titleValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => setEditMode(false)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        props.onChange(title)
    }

    return ( editMode
        ?
        <input value={title} onBlur={activateViewMode} onChange={onChangeHandler} autoFocus/>
        :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}
