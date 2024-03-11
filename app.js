/* 
Tasks

1-use sweet alert if input is empty  [Done]
2- check if task is exist or no      [Done]
3- create delete all tasks button    [Done]
4 Create finish all tasks button     [Done]
5- add tasks to the local storage
*/


// setting up variables

let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task span");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");


// focus on input field
window.onload = function () {
    theInput.focus();
}
// add button
theAddButton.onclick = function () {
    //if input is empty
    if (theInput.value === "") {
        console.log("no value");
        Swal.fire({
            title: "Alert!",
            text: "You Must Enter A value!",
            icon: "error"
        });
    } else {
        let taskName = theInput.value.trim(); // Get the task name and remove leading/trailing spaces
        let taskExists = false;

        // Check if the task name already exists
        let existingTasks = document.querySelectorAll('.tasks-content .task-box');
        existingTasks.forEach(function (task) {
            if (task.childNodes[0].textContent.trim() === taskName) {
                taskExists = true;
                return; // Exit the loop early if the task name already exists
            }
        });

        if (taskExists) {
            Swal.fire({
                title: "Alert!",
                text: "Task name already exists!",
                icon: "error"
            });
        } else {
            let noTasksMessage = document.querySelector(".no-tasks-message");
            // check if span msg is exist
            if (document.body.contains(document.querySelector(".no-tasks-message"))) {
                //Remove No Tasks Message
                noTasksMessage.remove();
            }

            // create span element
            let mainSpan = document.createElement("span");

            // create delete button
            let deleteElement = document.createElement("span");
            // create text to mainSpan
            let text = document.createTextNode(taskName);
            // create text to delete element
            let textdelete = document.createTextNode("Delete");

            // add text to span
            mainSpan.appendChild(text);
            // add class to span
            mainSpan.className = "task-box"
            // add text to delete element
            deleteElement.appendChild(textdelete);
            // add class to delete element
            deleteElement.className = "delete";
            // add delete button to main Span
            mainSpan.appendChild(deleteElement);
            // add the task to the container
            tasksContainer.appendChild(mainSpan);
            // empty the input
            theInput.value = "";
            //focus on field
            theInput.focus()
            // calc tasks

            calcTasks();
          
        }
    }
};

document.addEventListener('click', function (e) {

    // delete task 
    if (e.target.className == "delete") {
        // Remove Current task
        e.target.parentNode.remove()

        // check number of tasks inside the container 
        if (tasksContainer.childElementCount == 0) {
            createNoTasks();
        }

        // calc tasks
        calcTasks();

    }
    // finish task
    if (e.target.classList.contains("task-box")) {
        // toggle class finished
        e.target.classList.toggle("finished")
        // calc tasks
        calcTasks();

     
    }


});



// function to create no task message

function createNoTasks() {

    // create message span element
    let msgSpan = document.createElement("span");
    // crete the text message
    let msgText = document.createTextNode("No Tasks To Show");
    // add text to msgSpan
    msgSpan.appendChild(msgText);
    // add class to msgSpan
    msgSpan.className = "no-tasks-message";
    // append the message span element to the task container
    tasksContainer.appendChild(msgSpan);
}

function calcTasks() {
    // calc all tasks
    tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;
    //calc completed tasks 
    tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;


}
// button to delete all task  

let deleteAllTasksButton = document.querySelector('.delete-all-tasks');
deleteAllTasksButton.addEventListener('click', function () {
    // Select all task elements
    let tasks = document.querySelectorAll('.tasks-content .task-box');

    // Check if there are any tasks to delete
    if (tasks.length === 0) {
        Swal.fire({
            title: "Alert!",
            text: "There is no task to delete",
            icon: "error"
        });
    } else {
        // Remove each task element from the DOM
        tasks.forEach(function (task) {
            task.remove();
        });

        // If there are no tasks left, create the "No Tasks To Show" message
        if (tasksContainer.childElementCount === 0) {
            createNoTasks();
        }

        // Update task count
        calcTasks();
    }
});


// button to make all tasks finished
let finishAllTasksButton = document.querySelector('.finish-all-tasks');

finishAllTasksButton.addEventListener('click', function () {
    // Select all task elements
    let tasks = document.querySelectorAll('.tasks-content .task-box');

    // Check if there are any tasks to finish
    if (tasks.length === 0) {
        Swal.fire({
            title: "Alert!",
            text: "There is no task to finish",
            icon: "error"
        });
    } else {
        // Mark each task as finished
        tasks.forEach(function (task) {
            task.classList.add('finished');
        });

        // Update task count
        calcTasks();
    }
});



// checking 

/* 
//
            let existingTasks = document.querySelectorAll('.tasks-content .task-box');
            let existingTaskNames = [];

            existingTasks.forEach(function (task) {
                let taskName = task.childNodes[0].textContent.trim(); // Get the text content of the first child node
                existingTaskNames.push(taskName);
            });
            existingTaskNames.forEach((task) => console.log(task));

            //

*/