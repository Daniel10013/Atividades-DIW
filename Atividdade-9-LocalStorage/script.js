var database = [];

$(function(){
    setLocalStorage();
    mountTables();
})

$("#add-task-button").on("click", function(){

    const taskInput = $("#add-task-input");
   
    if(taskInput.val() == ""){
        taskInput.addClass("input-error");
        $(".input-message").html("O nome não pode ficar vazio!");
        return
    }

    if(taskInput.val() != ""){
        taskInput.removeClass("input-error");
        $(".input-message").html("");
    }

    addTask(taskInput.val());
    taskInput.val("")
    $(".input-message").html("Tarefa adicionada com sucesso!");
    setTimeout(()=>{
        $(".input-message").html("");
    }, 2000)

})

function addTask(taskName){
    let dataToAdd = {
        "id": getIdToAdd(),
        "name": taskName,
        "status": "undone"
    }

    database.push(dataToAdd);
    updateDatabase();
    mountTables();
}

function mountTables(){
    
    let doneTasks = getDoneTasks();
    let undoneTasks = getUndoneTasks();

    if(doneTasks.length == 0){
        let divNoContent = $(".complete-tasks .task-list .nothing-here");
        let divContent = $(".complete-tasks .task-list .content");
        setEmptyContent(divNoContent, divContent);
    }

    if(doneTasks.length != 0){
        let divNoContent = $(".complete-tasks .task-list .nothing-here");
        let divContent = $(".complete-tasks .task-list .content");
        removeEmptyContent(divNoContent, divContent);
        printDataOnTable(doneTasks, $(".complete-tasks .task-list .content"));
    }

    if(undoneTasks.length == 0){
        let divNoContent = $(".uncomplete-tasks .task-list .nothing-here");
        let divContent = $(".uncomplete-tasks .task-list .content");
        setEmptyContent(divNoContent, divContent);
    }

    if(undoneTasks.length != 0){
        let divNoContent = $(".uncomplete-tasks .task-list .nothing-here");
        let divContent = $(".uncomplete-tasks .task-list .content");
        removeEmptyContent(divNoContent, divContent);
        printDataOnTable(undoneTasks, $(".uncomplete-tasks .task-list .content"));
    }

    setTimeout(function(){
        return removeLoading();
    }, 500)
}

function printDataOnTable(listOfTasks, table){
    table.html("");
    listOfTasks.forEach(content => {
        let status = content.status == "done" ? '<i class="fa-solid fa-check done"></i>' : '<i class="fa-solid fa-xmark not-done"></i>';
        let notDone = '<button class="removeBtn" data-id="'+content.id+'" data-action="mark-as-complete"><i class="fa-solid fa-check mark-as-complete"></i></button>';
        let done = '<button class="removeBtn" data-id="'+content.id+'" data-action="mark-as-not-done"><i class="fa-solid fa-xmark mark-as-not-done"></i></button>'
        let changeStatus = content.status == "done" ? done : notDone;
    
        let baseHtml = '<div class="row" id="row-'+content.id+'">' +
                        '<div class="task-id">'+content.id+'</div>' +
                            '<div class="task-name">'+content.name+'</div>' +
                            '<div class="task-status">'+ status +'</div>' +
                            '<div class="task-actions actions-'+content.id+'">'+ 
                                changeStatus +
                                '<button class="removeBtn" data-id="'+content.id+'" data-action="delete"><i class="fa-solid fa-trash delete"></i></button>' +
                            '</div>' +
                        '</div>';
        table.append(baseHtml);
    });

    $(".removeBtn").on("click", function(){
        let taskId = $(this).data("id");
        let selectedAction = $(this).data("action");

        if(selectedAction == "delete"){
            deleteTask(taskId);
        }

        if(selectedAction == "mark-as-complete"){
            markTaskAsComplete(taskId);
        }

        if(selectedAction == "mark-as-not-done"){
            markAsNotComplete(taskId);
        }
    })
}

function markTaskAsComplete(taskId){
    database.forEach((eachTask, key)=>{
        if(eachTask.id == taskId){
            database[key].status = "done";
        }
    })

    updateDatabase();
    mountTables();
}

function deleteTask(taskId){
    database.forEach((eachTask, key)=>{
        if(eachTask.id == taskId){
            database.splice(key, 1);
        }
    })

    updateDatabase();
    mountTables();
}

function markAsNotComplete(taskId){
    database.forEach((eachTask, key)=>{
        if(eachTask.id == taskId){
            database[key].status = "undone";
        }
    })

    updateDatabase();
    mountTables();
}

function getDoneTasks(){
    let doneTasks = [];
    database.map(function(eachTask){
        if(eachTask.status == "done"){
            doneTasks.push(eachTask);
        }
    })
    return doneTasks;
}

function getUndoneTasks(){
    let undoneTasks = [];
    database.map(function(eachTask){
        if(eachTask.status == "undone"){
            undoneTasks.push(eachTask);
        }
    })
    return undoneTasks;
}

function removeLoading(){
    $(".loading").remove();
}

function setEmptyContent(element, content){
    element.css({"display": "flex"});
    content.css({"display": "none"});
}

function removeEmptyContent(element, content){
    element.css({"display": "none"});
    content.css({"display": "flex"});
}

function getIdToAdd(){
    if(databaseIsEmpty() == true){
        return 1;
    }
    return database[database.length -1].id + 1;
}

function setLocalStorage(){
    if(localStorage.getItem("database") === null){
        localStorage.setItem("database", JSON.stringify(database));
    }

    database = JSON.parse(localStorage.getItem("database"));
}

function updateDatabase(){
    localStorage.setItem("database", JSON.stringify(database));
    setLocalStorage();
}

function databaseIsEmpty(){
    let retrivedData = JSON.parse(localStorage.getItem("database"));
    if(retrivedData.length == 0){
        return true;
    }
    return false;
}