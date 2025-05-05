import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const TodoItem = ({completed, _id, name, getItem, deleteItem, editItemState }) => {

    return(
        <div className="Todo">
            <p className={`${completed === true ? 'completed' : ""}`} onClick={() => editItemState(_id, completed)}>{name}</p>
            <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => getItem(_id)}/>
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteItem(_id)} />
            </div>
        </div>
    )
}
