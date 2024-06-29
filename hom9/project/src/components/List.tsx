import { useContext } from "react"
import { ToDoContext } from "../lib/context"
import { ToDoItem } from "./ToDoItem";

export const List: React.FC = () => {

    const context = useContext(ToDoContext);
    if (!context) {
        throw new Error("Give the type");
    }
    const { state } = context;

    return <div className="list">
        {
            state.todos.map(elm => <ToDoItem key={elm.id} todo={elm} />)
        }
    </div>
}