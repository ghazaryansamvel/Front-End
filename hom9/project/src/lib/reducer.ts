import { ActionTypes, IAction, IState, ITodo } from "./types";


export const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case ActionTypes.setTodos:
            return {
                ...state,
                todos: action.payload as ITodo[],
            }
        case ActionTypes.addTodo:
            return {
                ...state,
                todos: [...state.todos, action.payload as ITodo],
            }
        case ActionTypes.removeTodo:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            }
        case ActionTypes.updateTodo:
            const updatedTodo = action.payload as ITodo;
            const updatedTodos = state.todos.map(todo =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            );
            return {
                ...state,
                todos: updatedTodos,
            };
        default:
            return state;
    }
}