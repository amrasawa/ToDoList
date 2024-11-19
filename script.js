let tasks = document.querySelector(".tasks");
let numberOfTasks;
let taskid;

async function ToDos() {
  //localStorage.clear();
  if (localStorage.getItem("data")) {
    numberOfTasks = localStorage.getItem("no");
    taskid = localStorage.getItem("id");
    history();
  } else {
    numberOfTasks = 0;
    let response = await fetch("https://dummyjson.com/todos");
    let data = await response.json();
    //console.log(data.todos);
    let result = data.todos
      .map((task) => {
        numberOfTasks++;
        return `
                <tr class="row">
                    <td>${task.id}</td>
                    <td class="task-todo">${task.todo}</td>
                    <td>${task.userId}</td>
                    <td class="status">${
                      task.completed ? "completed" : "Pending"
                    }
                    <td class="actions"> <button class="delete button">Delete</button><button class="done button">Done</button></td>
                </tr>`;
      })
      .join("");
    taskid = numberOfTasks;
    tasks.innerHTML += result;
    autosave();
    tasksNumber();
  }
}

let addTaskBtn = document.querySelector(".add-task .button");
let taskText = document.querySelector(".add-task .task");
ToDos();

addTaskBtn.onclick = async (event) => {
  if (taskText.value === "") alert("You should first add task");
  else {
    taskid++;
    let newTask = `
            <tr class="row">
                <td>${taskid}</td>
                <td class="task-todo">${taskText.value}</td>
                <td>23</td>
                <td class="status">Pending</td>
                <td class="actions"> <button class="delete button">Delete</button> <button class="done button">Done</button></td>
            </tr>`;
    tasks.innerHTML += newTask;
    ++numberOfTasks;
    taskText.value = "";
    autosave();
    tasksNumber();
  }
};

tasks.onclick = (event) => {
  let element = event.target;
  if (element.classList.contains("delete")) {
    numberOfTasks--;
    element.parentElement.parentElement.remove();
    autosave();
    tasksNumber();
  }

  if (element.classList.contains("done")) {
    let parent = element.parentElement.parentElement;
    let children = parent.children;
    let tasktodo = children[1];
    children[3].textContent = "completed";
    tasktodo.classList.add("Done");
    autosave();
  }
};

function tasksNumber() {
  let tasksno = document.querySelector("footer span");
  tasksno.textContent = localStorage.getItem("no");
}

search.oninput = async (event) => {
  let task = search.value;
  if (task != "") {
    console.log(tasks);
    let response = tasks.children;
    console.log(response);
    let output = [];
    for (let i = 0; i < response.length; ++i) {
      let fields = response[i].children;
      console.log(fields);
      if (fields[1].textContent.includes(task)) output.push(fields);
    }
    console.log(output);
    let result = output
      .map((task) => {
        console.log(task);
        return `
                <tr class="row">
                        <td>${task[0].textContent}</td>
                        <td class="task-todo">${task[1].textContent}</td>
                        <td>${task[2].textContent}</td>
                        <td class="status">${task[3].textContent}
                        <td class="actions"> <button class="delete button">Delete</button><button class="done button">Done</button></td>
                </tr>
            
            `;
      })
      .join("");
    console.log(result);
    tasks.innerHTML = result;
  } else ToDos();
};

function autosave() {
  localStorage.setItem("data", tasks.innerHTML);
  localStorage.setItem("no", numberOfTasks);
  localStorage.setItem("id", taskid);
}

function history() {
  let content = localStorage.getItem("data");
  tasks.innerHTML = content;
  tasksNumber();
}
