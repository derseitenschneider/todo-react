import './App.css';
import supabase from './config/supabaseClient';
import { useEffect, useState } from 'react';

// Components
import Title from './components/Title';
import Form from './components/Form';
import List from './components/List';

function App() {
  const [fetchError, setFetchError] = useState(null);
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      const { data, error } = await supabase.from('todos').select();
      if (error) {
        setFetchError('Could not fetch the todos');
        setTodos(null);
        console.log(error);
      }
      if (data) {
        setTodos(data);
        setFetchError(null);
      }
    }
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <Title />

      {fetchError && <p>{fetchError}</p>}
      {todos && (
        <div>
          <Form todos={todos} setTodos={setTodos} />
          <List todos={todos} setTodos={setTodos} />
        </div>
      )}
    </div>
  );
}

export default App;
