import React, { useContext } from "react"
import { ITodo } from "../lib/types"
import { ToDoContext } from "../lib/context"
import { remove, update } from "../lib/api";
import { ActionTypes } from "../lib/types";

interface Props {
    todo: ITodo,
}


export const ToDoItem: React.FC<Props> = ({ todo }) => {

    const context = useContext(ToDoContext);

    if (!context) {
        throw new Error("Give the type");
    }

    const { dispatch } = context;

    const handleRemove = async (id: string) => {
        await remove(id);
        dispatch({ type: ActionTypes.removeTodo, payload: id });
    }

    const handleToggle = () => {
        const updateTodo: ITodo = { ...todo, completed: !todo.completed };

        update(updateTodo)
            .then(res => {
                dispatch({ type: ActionTypes.updateTodo, payload: res });
            })

    }

    return (
        <div className={`item ${todo.completed ? 'completed' : ''}`}>
            <div>
                <p>{todo.text}</p>
                <div>
                    <button onClick={handleToggle}>
                        {todo.completed ? "Back" : "Done"}
                    </button>
                    <button onClick={() => handleRemove(todo.id)}>Remove</button>
                </div>
            </div>
        </div>
    )
}
