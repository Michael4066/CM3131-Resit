

//Search Page/API functionality

function ShowSearch(query) {
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;
    fetch(url)
    .then(response =>  response.json())
    .then((jsonData) => {
        const results = jsonData.map(element => element.show.name);
        displayResults(results);
    });
} //Establishes link to TVMaze, fetches the "Show Search" endpoint so that the app is ready to load the API show data at any point.

function displayResults(results) {
    const list = document.getElementById("ResultsList");
    list.innerHTML = "";
    results.forEach(result => {
        const element = document.createElement("ion-item");
        element.innerText = result;
        list.appendChild(element);
    });
} //Creates a list of matching shows upon search that clears every time the input changes.

let TimeoutDuration = 0;

window.onload = () => {
    const userInputElement = document.getElementById("userInput");
    userInputElement.onkeyup = (event) => {

        clearTimeout(TimeoutDuration);

        if(userInputElement.value.trim().length ===0) {
            return;
        }

        TimeoutDuration = setTimeout(() => {
            ShowSearch(userInputElement.value);
        }, 250);
    };
}  //Refreshes the list every time the input is changed, giving a short time out so a request isn't made with every single key press - Initial delay is 250ms, however keys pressed in quick succession refresh the delay. The Empty spaces will also not request a result.



//List Page/Local Storage functionality

const showName = document.getElementById("showName");

const showStatus = document.getElementById("showStatus");

const addBtn = document.getElementById("addBtn");

const storedList = document.getElementById("storedList");

//Defining the show name input, watch status, add button and resulting output from the HTML file.

addBtn.onclick = function () {
    const key = showName.value;
    const value = showStatus.value;

    if (key && value) {
        localStorage.setItem(key, value);
        location.reload();
    }
    
};  //When the button is clicked, values are saved in local storage.

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);


    storedList.innerHTML += `${key}: ${value}<br />`;
}

//Finally, the combination of both values are displayed on screen.





