// Define Ui Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// function to load all event listeners.
loadEventListeners();

// load all event listeners
function loadEventListeners(){
  // Dom load events
  document.addEventListener('DOMContentLoaded', getTasks);

  //add task event
  form.addEventListener('submit', addTask);

  //remove task event
  taskList.addEventListener('click', removeTask);

  //clear task events
  clearBtn.addEventListener('click', clearTasks);

  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Task from LS
function getTasks() {
  let tasks;
   if (localStorage.getItem('task') === null){
     tasks = [];
   } else {
     tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(taskss){

    //create li element
    const li = document.createElement("li")

      // add class
    li.className = 'collection-item';

    //create text node and append to the li
  li.appendChild(document.createTextNode(taskss));

  //create new link element
  const link = document.createElement('a');

  //add class
  link.className = 'delete-item secondary-content';

  //add icon html
  link.innerHTML = '<i class="fa fa-remove fa-lg"></i>';

  //append the link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);
    });
}

// add task
function addTask(e){
  if(taskInput.value === ''){
    alert(`Add a task`);
  }

  //create li element
  const li = document.createElement("li")

  // li height

  li.style.height = "auto";
  

  // add class
  li.className = 'collection-item';

  //create text node and append to the li
 li.appendChild(document.createTextNode(taskInput.value));

 //create new link element
 const link = document.createElement('a');

 //add class
 link.className = 'delete-item secondary-content';

 //add icon html
link.innerHTML = '<i class="fa fa-remove fa-lg"></i>';

 //append the link to li
 li.appendChild(link);

 // append li to ul
 taskList.appendChild(li);

 // store in global storage
 storeTaskInLocalStorage(taskInput.value);

//clear input
taskInput.value = '';

  e.preventDefault();
}

 // store task
 function storeTaskInLocalStorage(task) {
   let tasks;
   if (localStorage.getItem('task') === null){
     tasks = [];
   } else {
     tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.push(task);

   localStorage.setItem("tasks", JSON.stringify(tasks));
 }

//remove task
function removeTask(e){

  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove();

      // remove from Ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }   
  }   
}

// remove from Ls
function removeTaskFromLocalStorage(taskItem){
  let tasks;
   if (localStorage.getItem('task') === null){
     tasks = [];
   } else {
     tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task){
     if(taskItem.textContent === task){
       tasks.splice(index, 1);
     }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks function

function clearTasks() {
  taskList.innerHTML = "";


  //faster
//   while(taskList.firstChild) {
//     taskList.removeChild(taskList.firstChild);
//   }

// clear from Ls
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
       }
    });
}