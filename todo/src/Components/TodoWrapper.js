import React, {useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import toast from 'react-hot-toast'

export const TodoWrapper = () => {

    const API_BASE = 'https://todoapp-api-zeta.vercel.app/todo'

    const [items, setItems] = useState([]);
    const [input, setInput] = useState("");
    const [completed, setCompleted] = useState(false);
  
    useEffect(() => {
      GetTodos();
    }, []);

    const GetTodos = () => {
        fetch(API_BASE)
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(err => console.error(err))
    }

    const addItem = async (input) => {  
        const data = await fetch(API_BASE + "/new", {
            method : "POST",
            headers: {
            "content-type" : "application/json"
            },
            body: JSON.stringify({
            name: input,
            completed: false
            })
        }).then(res => res.json())
        console.log(data);
        await GetTodos()
        setInput('')
    }

    const getItem = async (id) => {
        console.log(id)
        const response = await fetch(API_BASE + "/" + id, {
        method : "GET"});
        if(!response.ok) {
            throw new Error("Revise bien que su tarea se encuentre en el sistema");
        }
        setItems(
            items.map((item) =>
                item._id === id ? { ...item, isEditing: !item.isEditing } : item
        ));
    }

    const editItemState = async (id, completed) => {

        setItems(
            (items.map((item) =>
                item._id === id ? { ...item, completed: !item.completed } : item
            ))
        )
        
        await fetch(API_BASE + "/update/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({id: id, completed: !completed})
            }).then(
                (res) => {
                    if(res.status === 200) {
                        console.log("data updated");
                        notify(!completed);
                    } 
                }
            )
        }
    
    const editItem = async (input, id, completed) => {
        console.log(input + id);
        await fetch(API_BASE + "/update/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({name: input, completed: completed})
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Revise bien que su tarea se encuentre en el sistema");
                }
                return response.json();
                });
            await GetTodos()
            setInput('')   
        }

    const deleteItem = async(id) => {
        try {
            const response = await fetch(API_BASE + "/delete/" + id, {
                method: "DELETE",
                });
                if(!response.ok) {
                    throw new Error("Revise bien que su tarea se encuentre en el sistema");
                }
                setItems(items => items.filter(item => item._id !== id));
        } catch(error) {
            console.error("Tenemos un problema:", error);
        }
    }

    const notify = async (completed) => {
        console.log(completed);
        if(completed !== false) {
            toast.success("Felicitaciones, completaste una tarea.");
        } else {
            toast(
                "¿Aún tienes pendiente la presente tarea?.\n\nApurése en terminarla",
                {
                    duration: 2000
                }
            )
        }   
    }

    return (
        <div className="TodoWrapper">
            <h1>
                TAREAS DEL DÍA<span>Una aplicación para empezar bien tu jornada</span>
            </h1>
            <TodoForm addItem={addItem}/>
            {items.map((item) => 
            item.isEditing ? (
                <EditTodoForm getItem={editItem} task={item} />
            ): (
                <TodoItem 
                _id={item._id} 
                name={item.name} 
                deleteItem={deleteItem}
                getItem={getItem}
                editItemState={editItemState}
                completed={item.completed}
                />
            )
            )}
            {completed}   
        </div>
    )

}