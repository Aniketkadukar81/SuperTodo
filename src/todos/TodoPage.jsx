import React, { useActionState, useState } from 'react'
import TodoItem from './TodoItem';
import { Plus, Rabbit, Trash } from 'lucide-react';

const TodoPage = () => {

    // const [person, setPerson] = useState({
    //     name : "Aniket",
    //     age : 20
    // })

    // function handleIncreaseAge(){
    //     //person.age++;  // Object Mutation Avoid doing This

    //     console.log(person.age)
    //     const newPerson = {...person,age:person.age+1}
    //     setPerson(newPerson);
    // }

    const [todos,setTodos] = useState([]);

    function handleFormSubmit(e){
        e.preventDefault();
        const todoText = e.target["todo"].value;

        if(!todoText) return;
        // todos.push(todoText);
        console.log(todoText);

        // const newTodos = [...todos,{
        //   text: todoText,
        //   id: crypto.randomUUID(),
        //   completed: false
        // }];

        const insertAt = 2;

        if(insertAt>todos/length) insertAt =0;

        const newTodos = [...todos.slice(0,insertAt),{
          text: todoText,
          id: crypto.randomUUID(),
          completed: false
        },...todos.slice(insertAt)];

        setTodos(newTodos)
        e.target.reset();
    }

    function onTodoToggle(id,checked){

      // avoid this
      // const item = todos.find(item => item.id===id);
      // item.completed = checked;
      // setTodos(todos);


      const newTodos = todos.map(item =>{
        if(item.id === id){
          return {...item,completed:checked}
        }
        return item;
      })
      setTodos(newTodos);
      console.log(id,checked)
    }

    function handleDeleteTodo(id){
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
    }

    const emptyState = <div className='mt-18 flex flex-col gap-4 items-center text-secondary-text'>
      <Rabbit />
      <p>Your Todo's are Empty</p>
    </div>

    const completedTodos = todos.filter(item=>item.completed).length;

    function handleDeleteAll(){
      setTodos([])
    }

    const compareFunction = (a,b) => a.text.localeCompare(b.text);

    function handleSortTodos(){
      const newTodos = [...todos];
      newTodos.sort(compareFunction)
      setTodos(newTodos);
    }
     function handleUpdateTodoText(id,todoText){
        if(!todoText) return;
        const newTodos = todos.map(item => {
          if(item.id ===id){
            return {...item,text: todoText}
          }
          return item;
        })
        setTodos(newTodos);
     }
    function handleTodoMoveUp(index){
      if(index==0) return;

      const newTodos = [...todos];
      [newTodos[index],newTodos[index-1]] =[newTodos[index-1],newTodos[index]];
      setTodos(newTodos);
    }

    function handleTodoMoveDown(index){
      if(index == todos.length-1) return;
      const newTodos = [...todos];
      [newTodos[index],newTodos[index+1]] =[newTodos[index+1],newTodos[index]];
      setTodos(newTodos);
    }

    const isTodoEmplty = todos.length==0;

    const isSorted = todos.every((todo,index, arr) =>  {
      return index===0 || compareFunction(arr[index-1],todo)<=0;
    })

  return (
    <div className="max-w-2xl mx-auto p-10 lg:p-12 space-y-6">
        {/* <p>{person.name}</p>
        <p>{person.age}</p>
        <button onClick = {handleIncreaseAge}>Increase Age</button> */}
        <h1 className="text-center font-display text-6xl font-bold text-accent">Super Todo</h1>
        <p className="text-center text-lg font-light text-secondary-text italic">
          Manage your Todos with Ease!
        </p>
        <form className="bg-gray-700 px-6 py-4 rounded-lg flex justify-between gap-4" onSubmit={handleFormSubmit}>
            <input 
              type="text" 
              name="todo" 
              required
              placeholder="Enter your Todo here ..."
              className="flex-1 font-body focus:outline-none"
            />
            <button className="p-3 bg-accent text-black rounded-lg cursor-pointer hover:bg-accent-hover"><Plus/></button>
        </form>

        <div className='flex justify-center gap-6'>
          {!isSorted && (
            <button 
              className='px-4 py-2 ring-2 ring-accent rounded-lg cursor-pointer hover:bg-accent hover:text-black' 
              onClick={handleSortTodos}>Sort Todos
            </button>)}
          {!isTodoEmplty && (
            <button 
              className='px-4 py-2 ring-2 ring-red-400 rounded-lg flex items-center 
              gap-2 hover:bg-red-400 hover:text-black cursor-pointer'
              onClick={handleDeleteAll}
              >
                <Trash />
                Delete All
            </button>)}

        </div>
        
        {!isTodoEmplty &&(
          <p 
            className="text-secondary-text text-right my-10">
              {completedTodos}/{todos.length} Completed
          </p>)}

        {!isTodoEmplty ?(
          <div className='space-y-4'>
          {todos.map((item,index) => (
            <TodoItem key={item.id} item={item} 
              onTodoToggle={onTodoToggle}
              onTodoDelete={handleDeleteTodo}
              onTodoTextUpdate={handleUpdateTodoText}
              onMoveUp={handleTodoMoveUp}
              OnMoveDown={handleTodoMoveDown}
              index={index}
              todosCount={todos.length}
            />
            ))}
        </div>
        ):(
          emptyState
        )
        }

        
    </div>
  )
}

export default TodoPage