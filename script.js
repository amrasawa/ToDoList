let tasks=document.querySelector(".tasks");
let numberOfTasks=0;

async function ToDos(){
    let response =await fetch("https://dummyjson.com/todos");
    let data=await response.json();
    //console.log(data.todos);
    let result =data.todos.map((task)=>{
        numberOfTasks++;
        return `
            <tr class="row">
                <td>${task.id}</td>
                <td class="task-todo">${task.todo}</td>
                <td>${task.userId}</td>
                <td class="status">${(task.completed)? "completed": "Pending"}
                <td class="actions"> <button class="delete button">Delete</button><button class="done button">Done</button></td>
            </tr>`
    }).join('');

    tasks.innerHTML+=result;

    // let deleteButton=document.querySelector(".delete");
    // console.log(deleteButton);
    // deleteButton.addEventListener('click',async ()=>{
    //     deleteButton.parentElement.parentElement.remove();
    // })

}

let addTaskBtn=document.querySelector(".add-task .button");
let taskText= document.querySelector(".add-task .task");
ToDos();
addTaskBtn.onclick= async (event)=>{
    if (taskText.value==="") alert("You should first add task");
    else {
        let newTask= `
            <tr class="row">
                <td>${++numberOfTasks}</td>
                <td class="task-todo">${taskText.value}</td>
                <td>23</td>
                <td class="status">Pending</td>
                <td class="actions"> <button class="delete button">Delete</button> <button class="done button">Done</button></td>
            </tr>`;
        tasks.innerHTML+=newTask;
        taskText.value="";
        // await fetch("https://dummyjson.com/todos", {
        //     method: 'POST',
        //     body: {
        //             "id": 2,
        //             "todo": "Memorize a poem",
        //             "completed": true,
        //             "userId": 13
        //         }
        // }).then(res=> console.log(res)).catch(err=> console.error(err));
    }
}

tasks.onclick=event=>{
    // let deleteButton=document.querySelector(".delete");
    // let doneButton=document.querySelector(".done"); 
    
    // if(event.target===deleteButton)
    //     deleteButton.parentElement.parentElement.remove();
    // else if(event.target===doneButton)
    //     {
    //         let taskStatus=document.querySelector(".status")
    //         let taskToDo=document.querySelector(".task-todo");
    //         taskToDo.classList.add="Done";
    //         taskStatus.textContent='completed';
    //     }
    let element=event.target;
    if (element.classList.contains('delete')){
        numberOfTasks--;
        element.parentElement.parentElement.remove();
    }
    
    if( element.classList.contains('done'))
    {
        let parent=element.parentElement.parentElement;
        let children=parent.children;
        let tasktodo=children[1];
        children[3].textContent='completed';
        tasktodo.classList.add('Done');
    }

}