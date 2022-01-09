//selectors 
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filteroption=document.querySelector('.filter-todo');

//event listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deletecheck);
filteroption.addEventListener('click', filtertodo)
document.addEventListener('DOMContentLoaded',getLocaltodos); 

//functions
function addTodo(event){
    event.preventDefault();
    // Todo DIV
    const tododiv=document.createElement('div');
    tododiv.classList.add('todo');
    const newTodo=document.createElement('li')
    newTodo.innerText= todoInput.value;  
    newTodo.classList.add('todo-item');
    tododiv.appendChild(newTodo);
    //Add to local storage
    saveLocalTodos(todoInput.value);
    // completed button
    const completedbutton=document.createElement('button');
    completedbutton.innerHTML='<i class="fas fa-check-square"></i>';
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);
    //remove button
    const trashbutton=document.createElement('button');
    trashbutton.innerHTML='<i class="fas fa-times"></i>';
    trashbutton.classList.add('trash-btn');
    tododiv.appendChild(trashbutton);
    //append to list
    todoList.appendChild(tododiv);
    todoInput.value='';
}
function deletecheck(e){
    const item=e.target;
    //delete todo 
    if (item.classList[0]=='trash-btn'){
        const todo=item.parentElement;
        removelocalTodo(todo);
        //fall not working 
        todo.classList.add('fall');  
        
        todo.remove();

    }   
    if (item.classList[0]=="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filtertodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')){
                    todo.style.display='flex';

                }else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                        todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                 
        }
    })

}
function saveLocalTodos(todo){
    let todos=[];
    if (localStorage.getItem('todos')==null){
        todo=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));

}
function getLocaltodos(){
    let todos=[];
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));

    }
    todos.forEach(function(todo){
        const tododiv=document.createElement('div');
        tododiv.classList.add('todo');
        const newTodo=document.createElement('li')
        newTodo.innerText= todo;  
        newTodo.classList.add('todo-item');
        tododiv.appendChild(newTodo);
        // completed button
        const completedbutton=document.createElement('button');
        completedbutton.innerHTML='<i class="fas fa-check-square"></i>';
        completedbutton.classList.add("complete-btn");
        tododiv.appendChild(completedbutton);
        //remove button
        const trashbutton=document.createElement('button');
        trashbutton.innerHTML='<i class="fas fa-times"></i>';
        trashbutton.classList.add('trash-btn');
        tododiv.appendChild(trashbutton);
        //append to list
        todoList.appendChild(tododiv);
    })
}
function removelocalTodo(todo){
    let todos=[];
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));

    }
    const todoindex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}