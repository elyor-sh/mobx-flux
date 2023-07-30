import {observer} from "mobx-react-lite";
import {ITodo} from "../api";
import './style.css';
import {useCallback, MouseEvent} from "react";
import {DeleteButton} from "../../components";

interface ITodoCardProps {
    todo: ITodo;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
}

export const TodoCard = observer(({todo, onDelete, onToggleComplete}: ITodoCardProps) => {

    const handleToggle = useCallback(() => {
        onToggleComplete(todo.id)
    }, [onToggleComplete, todo.id])

    const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDelete(todo.id)
    }, [onDelete, todo.id])

    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    className="hidden_real_check"
                    checked={todo.completed}
                    onChange={handleToggle}
                />
                <div className="todo_element">
                        <DeleteButton className='deleteButton' onClick={handleDelete}/>
						<span className="customized_ckeck">
							<span className="checkbox">
								<span className='internal_one'></span>
								<span className='internal_two'></span>
							</span>
						</span>
                    <span className="element_title">{todo.title}</span>
                </div>
            </label>
        </li>
    );
});