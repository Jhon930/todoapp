import React, {useState} from 'react'
import toast , {Toaster} from 'react-hot-toast'

export const EditTodoForm = ({getItem, task}) => {
    const [input, setInput] = useState(task.name, task.completed);

    const handleSubmit = (e) => {
        e.preventDefault();
        getItem(input, task._id, task.completed);
        notify();
    }

    const notify = () => {
        toast.success('Datos de tarea actualizados',  {
        style: {
          padding: '16px',
        },
      });
    }

    return (
        <form onSubmit={handleSubmit} className='TodoForm'>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className='todo-input' placeholder='Actualice su tarea' />
            <button type="submit" className='todo-btn'>Actualizar</button>
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