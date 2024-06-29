import { useEffect, useReducer } from 'react'
import './App.css'
import { reducer } from './lib/reducer'
import { InitialState } from './lib/initialState'
import { getAll } from './lib/api';
import { ActionTypes } from './lib/types';
import { ToDoContext } from './lib/context';
import { ToDoList } from './components/ToDoList';

function App() {

  const [state, dispatch] = useReducer(reducer, InitialState);

  useEffect(() => {
    getAll()
      .then(res => {
        dispatch({ type: ActionTypes.setTodos, payload: res });
      });
  }, []);

  return (
    <>
      <ToDoContext.Provider value={{ state, dispatch }}>
        <ToDoList />
      </ToDoContext.Provider>
    </>
  )
}

export default App
