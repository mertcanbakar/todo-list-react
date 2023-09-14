import Todos from './Todos'
import { useState, useEffect } from "react"
import {HiPlus} from 'react-icons/hi'


const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(false)
  const [length, setLength] = useState(false)

  // Sayfa yüklendiğinde localStorage'dan todos'u yükle
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = () => {
    if (todo !== '') {
      const newTodo = {
        text: todo,
        done: false,
      };
      setTodos([...todos, newTodo]);
      // Yeni todo ekledikten sonra, localStorage'a kaydedin
      localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    }
    setTodo('');
  };

  const handleRemoveAll = () => {
    if(todos.length === 0){
      setLength(true)
      setTodos([]);
    setMessage(true)
    setTimeout(() => {
      setMessage(false);
      setLength(false)
    }, 3000);
    }else{
    setTodos([]);
    setMessage(true)
    setTimeout(() => {
      setMessage(false);
    }, 3000);
    // Tüm todoları kaldırdıktan sonra, localStorage'dan da kaldırın
    localStorage.removeItem('todos');
  }
  };

  const handleDeleteTodo = (indexToDelete) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updatedTodos);
    // Todo silindikten sonra güncel verileri localStorage'a kaydedin
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleDoneTodo = (indexToMarkAsDone) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index === indexToMarkAsDone) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
    // Yapılan değişikliklerden sonra güncel verileri localStorage'a kaydedin
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="container">
      {message && (
        <div className='message-box'>
        <h5>{ length ? 'Liste zaten boş.' : 'Yapılacaklar listesi temizlendi!'}</h5>
      </div>
      )}
      <div className="todo-list">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTodo();
          }}
        >
          <div className="todo-area">
            <input
              value={todo}
              type="text"
              placeholder="Yapılacak giriniz."
              onChange={(e) => setTodo(e.target.value)}
            />
            <button className="add-btn" type="submit">
              <HiPlus/>
            </button>
          </div>
        </form>

        <div className="todos">
          <ul>
            {todos.map((todolar, index) => (
              <li key={index}>
                <Todos
                  todo={todolar}
                  idx={index}
                  onDelete={handleDeleteTodo}
                  onDone={handleDoneTodo}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="remove-all">
        <button className="remove-all-btn" onClick={handleRemoveAll}>
          Tümünü Kaldır
        </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;