const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-circle-check";
const UNCHECK = "fa-circle";
const LINE1THROUGH1 = "lineThrough";

let LIST, id; 

let data = localStorage.getItem("toDo");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else {
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

function addToDo(toDo, id , done, trash){
    if(trash){
        return;
    }
    const DONE = done ? CHECK : UNCHECK ;
    const LINE = done ? LINE1THROUGH1 : "";


    const item =   `   <li class="todo-content-list-items id="${id}">
                        <i class= "fa-regular ${DONE} " job="complete" id="${id}" ></i>
                        <p class="screen-input-show  ${LINE} text"> ${toDo} </p>
                        <i class="fa-solid fa-trash-can trashIcon" job="delete" id="${id}" ></i>
                        </li>` ;
    
    const position = "beforeend";
    list.insertAdjacentHTML(position,item);
}

document.addEventListener("keydown", function(e){
    if(e.keyCode == 13){
        const toDo = input.value;
        if (toDo){
            addToDo(toDo, id , false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            localStorage.setItem("toDo", JSON.stringify(LIST));
            id ++;
        }
        input.value = "";
    }
});

//     LIST[element.id].done = !LIST[element.id].done;


function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE1THROUGH1);

    LIST [element.id].done = LIST [element.id].done ? false : true ;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


list.addEventListener("click", function(event){
    const element = event.target;
    // const elementJob = element.attributes.job.values;
    const elementJob = element.getAttribute("job");

    if(elementJob == "complete")
    {
        completeToDo(element);
    }
    else if(elementJob == "delete")
    {   
        removeToDo(element);
    }
    localStorage.setItem("toDo", JSON.stringify(LIST));
});

