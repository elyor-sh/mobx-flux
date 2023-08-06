Lightweight, fast package for comfortable work with flux architecture in mobx.
It's easy to replace the redux-toolkit with this package. There is no extra re-render problem in this package.

[Bindings for React](https://www.npmjs.com/package/mobx-flux-react).
[Bindings for Vue](https://www.npmjs.com/package/mobx-flux-vue).

[Demo App with React](https://mobx-flux-react-demo.vercel.app/).
[Demo App with Vue](https://mobx-flux-vue.vercel.app).

[Source code of Demo App](https://github.com/elyor-sh/mobx-flux/tree/main/examples/mobx-flux-react-example)

## About

mobx-flux makes it possible to easily replace the redux-toolkit by replacing only imports and at the same time solves the problem with an extra rerender. The external api is the same with the redux-toolkit

## Installation

```sh
npm i mobx-flux mobx
```

## Usage

Create slice

```ts
// ~/todoSlice.ts
import { createSlice, PayloadAction } from 'mobx-flux'

export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

type InitialState = {
    todos: ITodo[]
}

const initialState: InitialState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: initialState,
    reducers: {
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(t => t.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
    }
})

export const { toggleTodo } = todoSlice.actions
export default todoSlice.reducer
```

Create a store

```ts
// ~/store.ts
import {configureStore} from 'mobx-flux'
import todoReducer from './todoSlice'

// Create store
export const store = configureStore({
    reducer: {
        todo: todoReducer
    }
})
```

Usage of store

```ts
// ~/todo-ui.ts
import {toggleTodo} from './todoSlice'

// Use dispatch for actions
store.dispatch(toggleTodo(1))

// Get data from store
store.getState().todo
```

Async actions 

```ts
// ~/todoSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from 'mobx-flux'

export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const fetchTodoList = createAsyncThunk(
    'fetch/todoList',
    async () => {
        try {

            const response = await api.get<ITodo[]>('/todos')
            return response.data

        }catch (e) {
            throw new Error('The request `Get todo list` is failed!')
        }
    }
)

type InitialState = {
    todos: ITodo[],
    loading: boolean,
    error: string
}

const initialState: InitialState = {
    todos: [],
    loading: false,
    error: ''
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(t => t.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodoList.pending, (state) => {
            state.loading = true
            state.todos = []
            state.error = ''
        }),
            builder.addCase(fetchTodoList.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
                state.loading = false
                state.todos = action.payload
                state.error = ''
            }),
            builder.addCase(fetchTodoList.rejected, (state, action: PayloadAction<string>) => {
                state.loading = false
                state.todos = []
                state.error = action.payload
            })
    }
})

export const {toggleTodo, deleteTodo} = todoSlice.actions

export default todoSlice.reducer
```

Usage async actions

```ts
// ~/todo-ui.ts
import {fetchTodoList} from './todoSlice'

// Use dispatch for actions
store.dispatch(fetchTodoList())

// Get data from store
console.log(store.getState().todo.todos) // all todos

```