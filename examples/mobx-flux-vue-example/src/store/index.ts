import {configureStore} from 'mobx-flux'
import {useDispatch, TypedUseSelectorHook, useSelector } from 'mobx-flux-vue'

import todoReducer from '../todo/todo-store'

export const store = configureStore({
    reducer: {
        todo: todoReducer
    }
})

type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector