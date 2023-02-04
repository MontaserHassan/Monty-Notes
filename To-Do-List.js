var inputText = document.querySelector(".inputText");
var okayButton = document.querySelector(".okayButton");
var myTasks = document.querySelector(".tasks");
let arrayOfTasks = []; // array to store my tasks

// create check to look on local storage, if it has tasks or not
if (localStorage.getItem("myTasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("myTasks")); // parse --> convert string of JSON to value of js
}

getTaskFromStorage(); // to trigger only

// add new tasks
okayButton.onclick = function () {
  if (inputText.value !== "") {
    addTaskToArray(inputText.value); // add new task to my array of tasks
    inputText.value = ""; // after adding task, remove each character into input text
  }
};

myTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("finishButton")) {
    deleteTaskFromStorage(e.target.parentElement.getAttribute("data-id")); // delete task from local storage
    e.target.parentElement.remove(); // delete task from browser page
  }
});

function addTaskToArray(taskText) {
  // create variable that will save my task
  const newTask = {
    id: Date.now(),
    name: taskText,
  };
  arrayOfTasks.push(newTask); // to add each task to my array
  displayTasks(arrayOfTasks);
  addTaskToStorage(arrayOfTasks);
}

function displayTasks() {
  myTasks.innerHTML = ""; // remove any task into div of task
  arrayOfTasks.forEach((newTask) => {
    let div = document.createElement("div"); // create div that save task
    div.className = "ntask";
    div.setAttribute("data-id", newTask.id);
    div.appendChild(document.createTextNode(newTask.name)); // to put name of task into specific div
    let button = document.createElement("button"); // create delete task button
    button.className = "finishButton";
    button.appendChild(document.createTextNode("Finish"));
    div.appendChild(button); // put button into div
    myTasks.appendChild(div); // put div that carry task into div that will show my tasks
  });
}

function addTaskToStorage(arrayOfTasks) {
  //stringify --> convert value of js to string of JSON
  window.localStorage.setItem("myTasks", JSON.stringify(arrayOfTasks)); // add my tasks to local storage by array that has my tasks
}

function getTaskFromStorage() {
  let data = window.localStorage.getItem("myTasks");
  if (data) {
    let tasks = JSON.parse(data);
    displayTasks(tasks); // show any task into local storage on browser page
  }
}

function deleteTaskFromStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId); // here i don't need to the task which i clicked over finish button and will return tasks that id not matched with this task.id
  addTaskToStorage(arrayOfTasks);
}
