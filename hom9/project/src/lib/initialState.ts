import { Filters, IState } from "./types";

export const InitialState: IState = {
    todos: [],
    currentFilter: Filters.all,
}