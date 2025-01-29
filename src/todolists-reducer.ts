import {FilterValues, TodolistType} from "./App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todolistId: string
}
export type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValues
    todolistId: string
}

type ActionsType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    changeTodolistTitleActionType |
    changeTodolistFilterActionType;

export const todolistsReducer = (state: Array<TodolistType> , action:ActionsType):Array<TodolistType> => {
    switch (action.type){
        case 'REMOVE-TODOLIST': {
            const stateCopy = [...state];
            const filteredTodolists = stateCopy.filter(tl => tl.id !== action.todolistId);
            return filteredTodolists;
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]

        }
        case 'CHANGE-TODOLIST-TITLE': {
            state.map(td => td.id === action.todolistId ? td.title = action.title : td)
            return state
        }
        case 'CHANGE-TODOLIST-FILTER': {
            state.map(td => td.id === action.todolistId ? td.filter = action.filter : td)
            return state
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todolistId:string):RemoveTodolistActionType => {
     return {type: 'REMOVE-TODOLIST', todolistId}
}

export const addTodolistAC = (title:string):AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTitleAC = (title:string, todolistId: string):changeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todolistId}
}
export const changeTodolistFilterAC = (filter:FilterValues, todolistId: string):changeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, todolistId}
}

