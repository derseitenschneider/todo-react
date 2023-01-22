
import supabase from '../config/supabaseClient';

function List({ todos, setTodos }) {
  // const [deleteError, setDeleteError] = useState(null);

async function handleInput(e) {
  const tempTodos = [...todos];
  const currentId = +e.target.dataset.id;
 todos.find(todo => todo.id === currentId).todo = e.target.value
  setTodos([...tempTodos]);

  const { data, error } = await supabase
      .from('todos')
      .update([{ 'todo': e.target.value }])
      .match({'id': `${currentId}`});

    if (error) {
      console.log(error);
    }

}

const handleDelete = async (e) => {
  const currentId = +e.target.dataset.id;
  const tempTodos = todos.filter(todo => todo.id !== currentId);
  setTodos([...tempTodos]);
  const {data, error} = await supabase
  .from('todos')
  .delete()
  .match({'id': currentId})
}

  // async function handleDelete(e) {
  //   const itemID = e.target.dataset.id;
  //   const newTodosArr = todos.filter((todo) => todo.id !== +itemID);
  //   setTodos([...newTodosArr]);
  //   const { data, error } = await supabase
  //     .from('todos')
  //     .delete()
  //     .eq('id', itemID)
  //     .select();

  //   if (error) {
  //     setDeleteError('Konnte nicht gelöscht werden. Bitte versuch es erneut');
  //     return;
  //   }

  //   if (data) {
  //     const newTodosArr = todos.filter((todo) => todo.id !== data[0].id);
  //     setTodos([...newTodosArr]);
  //   }
  // }

  // async function handleComplete(e) {}

  return (
    <div>
     <div className="todo-list">
      
        {todos.map(todo => {
         return <div className="todo-item">
                  <input type="text" value={todo.todo} className="todo-input" key={todo.id} onChange={handleInput} data-id={todo.id}/>
                  <div className="btn btn--delete" onClick={handleDelete} data-id={todo.id}>x</div>  
                </div>
        })}
     
     </div>
    </div>
  );
}

export default List;
