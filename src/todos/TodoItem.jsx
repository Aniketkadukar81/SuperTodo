import { Check, ChevronDown, ChevronUp, Pencil, Trash, Trash2, X } from 'lucide-react';
import React, { useState } from 'react'
import CheckBox from './CheckBox';

const TodoItem = ({item, onTodoToggle, onTodoDelete, onTodoTextUpdate,
    onMoveUp,OnMoveDown,index, todosCount
}) => {

  const [showEditTodo,setShowEditTodo] = useState(false);  

  function handleEditFormSubmited(e){
    e.preventDefault();
    const todoText = e.target['todo'].value;
    onTodoTextUpdate(item.id,todoText);
    setShowEditTodo(false);
  }

  const todoEditForm = (
    <div className='flex justify-between items-center bg-gray-900 px-4 py-2 min-h-20 rounded-lg group'>
        <form className='flex-1 flex items-center gap-2 px-2' onSubmit={handleEditFormSubmited}>
            <input className='flex-1 border-2 border-secondary-text px-4 py-2 rounded-lg font-body' 
                type="text" 
                name="todo" 
                required
                defaultValue={item.text} />
            <button className='bg-hover'>
                <Check/>
            </button>
        </form>
        <button 
            className='text-red-400'
            onClick={()=> setShowEditTodo(false)}>
                <X/>
        </button>
    </div>
  )

  const todoItemDiv = (
    <div className='flex gap-4 justify-between items-center hover:bg-gray-900 rounded-lg px-4 py-2 group'>
        <div className='flex flex-col gap-1 text-secondary-text'>
            <button 
                className='hover:bg-gray-900 rounded-md p-1 cursor-pointer'
                disabled={index==0} 
                onClick={()=> onMoveUp(index)}>
                    <ChevronUp />
            </button>
            <button 
                className='hover:bg-gray-900 rounded-md p-1 cursor-pointer'
                disabled={index==todosCount-1} 
                onClick={()=> OnMoveDown(index)}>
                    <ChevronDown />
            </button>
        </div>
        <div className='flex-1 flex gap-4 items-center'>
            
            <CheckBox id={item.id}
                checked={item.completed}
                type="checkbox" 
                onChange={(e) => onTodoToggle(item.id, e.target.checked)}
                label={item.text} 
            />
        
        </div>

        <div className='hidden group-hover:flex gap-4'>
            <button 
                className='bg-hover'
                onClick={()=> setShowEditTodo(true)}>
                    <Pencil />
            </button>
            <button 
                className='text-red-400 bg-hover'
                onClick = {()=>onTodoDelete(item.id)}>
                <Trash />
            </button>
        </div>
        
    </div>
  );

  return (
    <div className="border-t border-secondary-text pt-3">
        {showEditTodo ? todoEditForm : todoItemDiv}
    </div>
  )
}

export default TodoItem