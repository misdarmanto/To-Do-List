const taskNotification = document.querySelector("[task-notification]");
const finishNotification = document.querySelector("[finish-notification]");
const listContainer = document.querySelector("[list-container]");
const input = document.querySelector("[input-list]");
const inputSubmit = document.querySelector("[input-submit]");

const KEY = "TODOLIST"
let storeData = [];

inputSubmit.addEventListener("click", () => {
    storeData.push({
        id: Date.now(), 
        text: input.value, 
        finish: false
    });
    input.value= "";
    saveData();
    render();
});


function render() {

    removeListElement();
    
    let finish = 0;
    let task = 0;

    storeData.forEach((data) => {

        data.finish ? finish ++ : task ++;

        const listItem = document.createElement("div");
        const text = document.createElement("div");
        const icon = document.createElement("i");

        icon.onclick = () => deleteList(data.id);

        listItem.className = "list-item";
        text.className = "list-text";
        text.innerHTML = data.text;
        icon.className = "fas fa-trash-alt delete-list";

        if(data.finish){
            listItem.style.background = "var(--primary)";
            icon.style.color = "white";
            text.style.color = "white";
        }

        listItem.appendChild(text);
        listItem.appendChild(icon);
        listContainer.appendChild(listItem);

        listItem.onclick = () => {
            if(data.finish === false){
                data.finish = true;
                listItem.style.background = "var(--primary)";
                icon.style.color = "white";
                text.style.color = "white";
            }
            else{
                data.finish = false;
                listItem.style.background = "white";
                icon.style.color = "var(--primary)";
                text.style.color = "gray";
            }

            saveData();
        }
    });

    finishNotification.innerHTML = `Finish ${finish}`;
    taskNotification.innerHTML = `Todos ${task}`;
}


function removeListElement() {
    while (listContainer.hasChildNodes()) {
        listContainer.removeChild(listContainer.firstChild);
    }
}

function deleteList(id) {
    storeData = storeData.filter(data => data.id !== id);
    saveData();
    render();
}

function saveData() {
    localStorage.setItem(KEY, JSON.stringify(storeData));
    getData();
    render();
}

function getData() {
    storeData = JSON.parse(localStorage.getItem(KEY));
}

getData();
render();