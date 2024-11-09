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
                <td>${task.todo}</td>
                <td>${task.userId}</td>
                <td>${(task.completed)? "completed": "Pending"}
                <td class="actions"> <button class="delete button">Delete</button><button class="Done button">Done</button></td>
            </tr>`
    }).join('');
    tasks.innerHTML+=result;

}

let addTaskBtn=document.querySelector(".add-task .button");
let taskText= document.querySelector(".add-task .task");

addTaskBtn.onclick= async (event)=>{
    if (taskText.value==="") alert("You should first add task");
    else {
        let newTask= `
            <tr class="row">
                <td>${++numberOfTasks}</td>
                <td>${taskText.value}</td>
                <td>23</td>
                <td>Pending</td>
                <td class="actions"> <button class="delete button">Delete</button><button class="Done button">Done</button></td>
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
ToDos();