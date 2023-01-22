import { useState } from 'react';
import supabase from '../config/supabaseClient';

function Form({ todos, setTodos }) {
  const [input, setInput] = useState('');
  const [formError, setFormError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      setFormError('Please fill out the input field');
      return;
    }
    setFormError(null);
    setInput('');

    setTodos([{ todo: input }, ...todos ]);

    const { data, error } = await supabase
      .from('todos')
      .insert([{ todo: input }])
      .select();

    if (error) {
      console.log(error);
      setFormError('Connection error - please try again');
    }

    if ({ data }) {
      setTodos([...data, ...todos ]);
      setFormError(null);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          className="input"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button className="btn-todo">Add</button>
      </form>
      {formError && <p className="error">{formError}</p>}
    </>
  );
}

export default Form;
