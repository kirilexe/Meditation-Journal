let tasks = JSON.parse(localStorage.getItem("tasks"))
             || [];

function createTd(value)
{
    let td = document.createElement("td");
    td.innerHTML = value;
    return td;
}

function createButtonElement(id, value, classAttribute,
    callback)
{
    let button = document.createElement("button");
    button.innerHTML = value;
    button.setAttribute("data-id", id);
    button.classList.add(classAttribute);
    button.addEventListener("click", callback);
    return button;
}

function populateForm(task) {
    let form = document.querySelector("#form");
    form.style.display = 'block';

    let title = form.querySelector("input[name='title']");
    title.value = task.title;

    let description = form.querySelector("textarea[name='description']");
    description.value = task.description;
    
    let deadline = form.querySelector("input[name='deadline']");
    deadline.value = task.deadline;

    let status = form.querySelector("select[name='status']");
    status.value = task.status;

    let id = form.querySelector("input[name='id']");
    id.value = task.id;
}

function deleteTask(id) {
    let index = -1;
    for(let i = 0; i < tasks.length; i++)
    {
        if(tasks[i].id==id)
        {
            index = i;
            break;
        }
    }

    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    populateTable();
}

function populateTable() {
    let table = document.querySelector("table tbody");
    table.innerHTML = '';
    
    tasks.forEach(task => {
        let tr = document.createElement("tr");                                                                                                                                  
        tr.appendChild(createTd(task.id));
        tr.appendChild(createTd(task.title));                                                                   
        tr.appendChild(createTd(task.description));
        tr.appendChild(createTd(task.deadline));
        tr.appendChild(createTd(task.status));

        let actionsTd = document.createElement("td");
        actionsTd.appendChild(
            createButtonElement(
                task.id,
                "Edit",
                "edit-button",
                function() {
                    populateForm(task);
                }
            )
        );
        actionsTd.appendChild(
            createButtonElement(
                task.id,
                "Delete",
                "delete-button",
                function() {
                    deleteTask(task.id);
                })
        );
        
        tr.appendChild(actionsTd);
        table.appendChild(tr);
    });
}

populateTable();

let createButton = document.querySelector("#create-item");
createButton.addEventListener("click", () => {
    let form = document.querySelector("#form");
    form.style.display = 'block';
});

function getData() {
    let title = document.querySelector("input[name='title']");
    let description = document.querySelector("textarea[name='description']");
    let deadline = document.querySelector("input[name='deadline']");
    let status = document.querySelector("select[name='status']");
    let id = document.querySelector("input[name='id']");
    let data = {
        "id": id.value,
        "title": title.value,
        "description": description.value,
        "deadline": deadline.value,
        "status": status.value
    };

    if(data.id == 0)
    {
        //add
        data.id = tasks.length + 1;

        tasks.push(data);
    } else {
        //edit
        let index = -1;
        for(let i = 0; i < tasks.length; i++)
        {
            if(tasks[i].id==data.id)
            {
                index = i;
                break;
            }
        }

        if(index != -1) {
            tasks[index] = data;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    getData();
    populateTable();
});