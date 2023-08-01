import {createSlice, PayloadAction} from "mobx-flux";
import {fetchTodoList, ITodo} from "./todo-api";

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
                console.log('downloaded ', action.payload)
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