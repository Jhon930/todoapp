import React, {useState} from 'react'
import toast , {Toaster} from 'react-hot-toast'

export const TodoForm = ({addItem}) => {
    const [input, setInput] = useState('');
    const notify = () => toast.success('Has agregado una tarea', {
      style: {
        padding: '16px',
      },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input) {
            console.log(input)
            addItem(input);
            notify();
            setInput('');
        }
    };

    return (
      <form onSubmit={handleSubmit} className="TodoForm">
        <input type='text' className="todo-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder='¿Cual es la tarea?'></input>
        <button type="submit" className='todo-btn'>Agregar</button>
        <Toaster
          position="top-right"
          gutter={8}  
          toastOptions={
            {
              style: {
                background: '#fff',
                color: 'black',
              },
              success: {
                duration: 2000,
                iconTheme: {
                  primary: 'green',
                  secondary: 'black',
                },
              }
            }
          }
        />
      </form>
    )
}