import {TasksState} from "./App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be deleted', () => {

    const startState: TasksState = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ],

        'todolistId2': [
            {id: '1', title: 'Laptop', isDone: false},
            {id: '2', title: 'Xbox', isDone: true},
            {id: '3', title: 'Piano', isDone: true}
        ]
    };

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
    expect(endState['todolistId2'][0].id).toBe('1');
    expect(endState['todolistId2'][1].id).toBe('3');

});

test('correct task should be created', () => {
    const startState: TasksState = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ],

        'todolistId2': [
            {id: '1', title: 'Laptop', isDone: false},
            {id: '2', title: 'Xbox', isDone: true},
            {id: '3', title: 'Piano', isDone: true}
        ]
    };

    const titleTask = 'Happy task'

    const action = addTaskAC(titleTask, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe(titleTask)

});

test('the task status should be changed correctly', () => {
    const startState: TasksState = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ],

        'todolistId2': [
            {id: '1', title: 'Laptop', isDone: false},
            {id: '2', title: 'Xbox', isDone: true},
            {id: '3', title: 'Piano', isDone: true}
        ]
    };

    const action = changeTaskStatusAC('2', false, 'todolistId1')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].isDone).toBe(false)
    expect(endState['todolistId2'][1].isDone).toBe(true)

});

test('the task title should be changed correctly', () => {
    const startState: TasksState = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ],

        'todolistId2': [
            {id: '1', title: 'Laptop', isDone: false},
            {id: '2', title: 'Xbox', isDone: true},
            {id: '3', title: 'Piano', isDone: true}
        ]
    };

    const action = changeTaskTitleAC('3', 'Vorobushek', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][2].title).toBe('ReactJS')
    expect(endState['todolistId2'][2].title).toBe('Vorobushek')

});