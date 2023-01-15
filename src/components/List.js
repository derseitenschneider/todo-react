import { useState } from 'react';
import supabase from '../config/supabaseClient';

function List({ todos, setTodos }) {
  const [deleteError, setDeleteError] = useState(null);

  async function handleDelete(e) {
    const itemID = e.target.dataset.id;
    const newTodosArr = todos.filter((todo) => todo.id !== +itemID);
    setTodos([...newTodosArr]);
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', itemID)
      .select();

    if (error) {
      setDeleteError('Konnte nicht gelöscht werden. Bitte versuch es erneut');
      return;
    }

    if (data) {
      const newTodosArr = todos.filter((todo) => todo.id !== data[0].id);
      setTodos([...newTodosArr]);
    }
  }

  async function handleComplete(e) {}

  return (
    <div>
      <ul className="todo-list">
        {[...todos].reverse().map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <div className="list-content"> {todo.todo}</div>

            <div className="buttons">
              <button
                className="btn btn-complete"
                data-id={todo.id}
                onClick={handleComplete}
              >
                √
              </button>
              <button
                className="btn btn-delete"
                data-id={todo.id}
                onClick={handleDelete}
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
