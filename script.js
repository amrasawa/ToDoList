let tasks = document.querySelector(".tasks");
let numberOfTasks;
let taskId;

async function addToDos() {
  //localStorage.clear();
  if (localStorage.getItem("data")) {
    console.log(localStorage.getItem("data"));
    numberOfTasks = localStorage.getItem("no");
    taskId = localStorage.getItem("id");
    loadHistory();
  } else {
    numberOfTasks = 0;
    let response = await fetch("https://dummyjson.com/todos");
    let data = await response.json();
    //console.log(data.todos);
    numberOfTasks = data.length;
    let result = data.todos
      .map((task) => {
        autosave(task);
        return `
                <tr class="row">
                    <td>${task.id}</td>
                    <td class="task-todo">${task.todo}</td>
                    <td>${task.userId}</td>
                    <td class="status">${
                      task.completed ? "completed" : "Pending"
                    }
                    <td class="actions"> <button class="delete button">Delete</button><button class="done button">Done</button><button class="undoBtn button">Undo</button> </td>
                </tr>`;
      })
      .join("");
    taskId = numberOfTasks;
    localStorage.setItem("id", taskId);
    tasks.innerHTML += result;
    tasksNumber();
  }
}

let addTaskBtn = document.querySelector(".add-task .button");
let taskText = document.querySelector(".add-task .task");
addToDos();

addTaskBtn.onclick = async (event) => {
  if (taskText.value === "") alert("You should first add task");
  else {
    taskId++;
    let task = {
      id: taskId,
      todo: `${taskText.value}`,
      completed: false,
      userId: 23,
    };
    addTask(task);
    ++numberOfTasks;
    taskText.value = "";
    autosave(task);
    tasksNumber();
  }
};

function addTask(task) {
  let newTask = `
            <tr class="row">
                <td>${task.id}</td>
                <td class="task-todo">${task.todo}</td>
                <td>23</td>
                <td class="status">${
                  task.completed ? "completed" : "Pending"
                }</td>
                <td class="actions"> <button class="delete button">Delete</button> <button class="done button">Done</button><button class="undoBtn button">Undo</button></td>
            </tr>`;
  tasks.innerHTML += newTask;
}

tasks.onclick = (event) => {
  let element = event.target;
  if (element.classList.contains("delete")) {
    numberOfTasks--;
    element.parentElement.parentElement.remove();
    tasksNumber();
  }

  if (element.classList.contains("done")) {
    let parent = element.parentElement.parentElement;
    let children = parent.children;
    let tasktodo = children[1];
    children[3].textContent = "completed";
    tasktodo.classList.add("Done");
  }

  if (element.classList.contains("undoBtn")) {
    let parent = element.parentElement.parentElement;
    let children = parent.children;
    let tasktodo = children[1];
    children[3].textContent = "Pending";
    if (tasktodo.classList.contains("Done")) tasktodo.classList.remove("Done");
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
                  <td class="actions"> <button class="delete button">Delete</button><button class="done button">Done</button><button class="undoBtn button">Undo</button></td>
                </tr>
            `;
      })
      .join("");
    console.log(result);
    tasks.innerHTML = result;
  } else addToDos();
};

function autosave(task) {
  let data = JSON.parse(localStorage.getItem("data") || "[]");
  data.push(task);
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("no", numberOfTasks);
  localStorage.setItem("id", taskId);
}

function loadHistory() {
  let data = JSON.parse(localStorage.getItem("data"), "[]");
  console.log(data);
  let response = data
    .map((ele) => {
      return `
      <tr class="row">
        <td>${ele.id}</td>
        <td class="task-todo">${ele.todo}</td>
        <td>23</td>
        <td class="status">${ele.completed ? "completed" : "Pending"}</td>
        <td class="actions"> <button class="delete button">Delete</button><button class="done button">Done</button><button class="undoBtn button">Undo</button></td>
      </tr>
    `;
    })
    .join("");
  tasks.innerHTML = response;
  tasksNumber();
}
