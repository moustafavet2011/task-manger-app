// getting all the variables from the package
// the input element
let taskInput = document.querySelector(".form .input");
//the submit element 
let taskSubmit = document.querySelector(".form .add");
// the div task which will show the task
let taskDiv = document.querySelector(".tasks");
 // the delete all button
let delAll = document.querySelector(".delete-all");
//creating an array to store all the tasks inputs into
let arrayOfTasks = [];

//create a variable to get the tasks from the local storage if there is any
let getData = window.localStorage.getItem("tasks");
//check if there is a task in the local storage
if(getData){
    arrayOfTasks = JSON.parse(getData);
}

//trigger Get Data From Local Storage Function
getDataFromLocalStorage();

//add task check => 
taskSubmit.onclick = function(){
    //check if the task input field is empty
    if(taskInput.value !==""){
        //function to add the task into an array to be used later
        addTaskToArray(taskInput.value);

        //emptying the task input field
        taskInput.value = "";
    }
}

//updating and delete elements in the page
taskDiv.addEventListener("click", (e)=>{
    // check if the element is the delete buttons
    if(e.target.classList.contains("delete")){
        // create a variable for e.target.parentElement
        let parentElement = e.target.parentElement; 

           //remove task from the local Storage
            deleteTaskWith( e.target.parentElement.getAttribute("data-id"));

           //remove the element from the page
            parentElement.remove();
    }
    // code the done function for the tasks
    if(e.target.classList.contains("task")){
        //toggle the function that update the status of the task completed
        toggleStatusTaskWith(e.target.getAttribute("data-id")); 
        //toggle the class done 
        e.target.classList.toggle("done");
    }

});
//create event listener for the delete all button
delAll.addEventListener("click", (e)=>{
    // emptying the tasks taskDiv
    taskDiv.innerHTML = '';

    //emptying the local storage tasks
    window.localStorage.removeItem("tasks");

})

//create delete all tasks button

//creating addTaskToArray 
function addTaskToArray(taskText){
    //Get the task data 
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };

    // push the task data into the array of tasks
    arrayOfTasks.push(task);
    
    // add the elements in the page (tasks div) using function 
    addElementsToPageFrom(arrayOfTasks);
    //add tasks to the local storage
    addDataToLocalStorageFrom(arrayOfTasks);
}

//creating the addElementsToPageFrom function
function addElementsToPageFrom(arrayOfTasks){
    // Emptying the tasks div before adding the task
    taskDiv.innerHTML = "";

    //loop on the array of tasks to get the elements inside
    arrayOfTasks.forEach((task) =>{
        //create a div for every element 
        let div = document.createElement("div");
        //add a class for each element
        div.className = "task";

        //check if the task is done by simple condition
        if(task.completed){
            div.className = "task done";
        }
        //set an attribute for each element (data attribute)
        div.setAttribute("data-id", task.id);
        //set the text for each element
        div.appendChild(document.createTextNode(task.title));

        //create a delete button in each task taskDiv
        let delSpan= document.createElement("span");
        //add a class to the delete button
        delSpan.className = "delete";
        // write the delete word into the delSpan
        delSpan.appendChild(document.createTextNode("Delete"));
        div.appendChild(delSpan);

        //add the task div to the tasks container
        taskDiv.appendChild(div);

    });
}
//creating the addDataToLocalStorage(arrayOfTasks) for pushing the data into the local storage
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));

}
//creating function to get the data from the local storage
function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    //check if there is a data to get or not
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}
// creating the delete task function to delete the task from the local Storage
function deleteTaskWith(taskId){
    
    // make a filter to get all the tasks exist except the one the match the id in the filter
    arrayOfTasks = arrayOfTasks.filter((task) =>task.id != taskId);
    // update the data of the local storage by adding the array of tasks after deleting the specific id
    addDataToLocalStorageFrom(arrayOfTasks);
}

//creating the function that toggle the status of the task completed or not
function toggleStatusTaskWith(taskId){
    // loop on the tasks in the local storage and get the wanted id of the task
    for(let i=0; i <arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].id == taskId){
            // if the status of the task is false then turn it into true and : if the status is true then turn it into false
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed =false) ;
            // update the data of the local storage by adding the array of tasks 
            
        }
        addDataToLocalStorageFrom(arrayOfTasks);
    }

}