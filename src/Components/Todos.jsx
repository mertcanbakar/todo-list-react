/* eslint-disable react/prop-types */
import {MdDelete} from 'react-icons/md'

const Todos = ({todo, idx, onDelete, onDone}) => {
    const handleDelete = () =>{
        onDelete(idx)
    }
    const handleDone = () => {
        onDone(idx); // İndex'i onDone işlevine iletiyoruz
      };
  return (
    <div className='todo'>
       <div className="text-area">
       <input className='checkbox' type="checkbox" checked={todo.done} onChange={handleDone} />
        <h5 className={todo.done ? 'todo-text done' : 'todo-text'}>{todo.text}</h5>
       </div>
        <div className="btn-delete">
          <button onClick={handleDelete}><MdDelete /></button>
        </div>
    </div>
  )
}

export default Todos