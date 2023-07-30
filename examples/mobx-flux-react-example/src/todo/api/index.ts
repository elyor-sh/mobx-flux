import {createAsyncThunk} from "mobx-flux";
import {api} from "../../api";

export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const fetchTodoList = createAsyncThunk(
    'todoList',
    async () => {
        try {

            const response = await api.get<ITodo[]>('/todos')
            return response.data

        }catch (e) {
            throw new Error('The request `Get todo list` is failed!')
        }
    }
    )