import {v1} from 'uuid'
import type {TodolistType} from './App'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer'

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = removeTodolistAC(todolistId1)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
});

test('new todolist must to be created', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    let newTodoTitle = 'new Todo'

    const action = addTodolistAC(newTodoTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoTitle)

});

test('title of todolist must to be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    let newTodoTitle = 'new Todo'
    const action = changeTodolistTitleAC(newTodoTitle, todolistId2)
    const endState = todolistsReducer(startState, action)

    expect(endState[1].title).toBe(newTodoTitle)
    expect(endState[0].title).toBe('What to learn')
    expect(endState.length).toBe(2)

});

test('filter of todolist must be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = changeTodolistFilterAC('completed', todolistId1)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('completed')
    expect(endState[1].filter).toBe('all')
    expect(endState.length).toBe(2)



})

