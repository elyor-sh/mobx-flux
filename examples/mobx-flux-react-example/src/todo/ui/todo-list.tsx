import {observer} from "mobx-react-lite";
import {useAppDispatch, useAppSelector} from "../../store";
import {TodoCard} from "./todo-card.tsx";
import {useCallback, useEffect} from "react";
import {deleteTodo, toggleTodo} from "../model";
import {fetchTodoList} from "../api";

export const TodoList = observer(() => {
    
    const dispatch = useAppDispatch()

    const {todos, loading, error} = useAppSelector(state => state.todo)

    const handleDelete = useCallback((id: number) => {
        dispatch(deleteTodo(id))
    }, [dispatch])

    const handleToggle = useCallback((id: number) => {
        dispatch(toggleTodo(id))
    }, [dispatch])

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(fetchTodoList())
    }, [dispatch])

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Oops {error} :(</div>
    }

    return (
        <div className='todo_list'>
            <ul>
                {
                    todos.map(todo => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            onDelete={handleDelete}
                            onToggleComplete={handleToggle}
                        />
                    ))
                }
            </ul>
        </div>
    );
});