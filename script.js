let tasks=document.querySelector(".tasks");
async function ToDos(){
    let response =await fetch("https://dummyjson.com/todos");
    let data=await response.json();
    //console.log(data.todos);
    let result =data.todos.map((task)=>{
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
ToDos();