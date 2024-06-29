import axios from "axios"
import { ITodo } from "./types";

export const getAll = async (): Promise<ITodo[]> => {
    const response = await axios.get("http://localhost:3004/todos");
    return response.data;
}

type inputTodo = Omit<ITodo, "id">;


export const add = async (obj: inputTodo): Promise<ITodo> => {
    const response = await axios.post("http://localhost:3004/todos", obj);
    return response.data;
}

export const remove = async (id: string): Promise<void> => {
    await axios.delete(`http://localhost:3004/todos/${id}`);
}

export const update = async (updatedTodo: ITodo): Promise<ITodo> => {
    const response = await axios.put(`http://localhost:3004/todos/${updatedTodo.id}`, updatedTodo);
    return response.data;
}