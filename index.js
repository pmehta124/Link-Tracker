//links Tracker
let mylinks = [];
const saveBtn = document.querySelector("#saveButton");
const inputElement = document.querySelector("#inputEl");
const ulEl = document.getElementById("unListEl");
const deletePrevElementBtn = document.querySelector("#deleteLast");
const deleteAllBtn = document.querySelector("#deleteButton");
const tabBtn = document.querySelector("#tabButton");

//display the links' urls in a list format
function display(links) {
    let listItems = "";
    for(let i = 0; i < links.length; i++) {
        // listItems += "<li><a href='" + mylinks[i] + "' target='_blank'>" + mylinks[i] + "</a></li>";
        listItems += `
            <li>
                <a href='${links[i]}' target='_blank'>
                    ${links[i]}
                </a>
            </li>
        `;
    }

    ulEl.innerHTML = listItems;
}

//Save Button clicked eventlistener 
saveBtn.addEventListener("click", () => { 
    //add the url into the mylinks array
    mylinks.push(inputElement.value);
    //clear out the input box field
    inputElement.value = "";
    //add the url that is to be saved into the local storage 
    localStorage.setItem("mylinks", JSON.stringify(mylinks));
    //call display function to display links
    display(mylinks);
});

//retrieve the links that were saved in the local storage (array of string urls), parse it to array of urls, and set it to variable linksFromLocalStorage
let linksFromLocalStorage = JSON.parse(localStorage.getItem("mylinks"));

//if there are links (if linksFromLocalStorage is a truthy value), then save and store the links in localStorage into the array mylinks  
if(linksFromLocalStorage) {
    mylinks = linksFromLocalStorage;
    display(mylinks);
}

//delete most recently added url input that was previous saved
//Delete Prev Button clicked eventlistener
deletePrevElementBtn.addEventListener("click", () => {
        //remove the most recent element inserted in mylinks array
        mylinks.pop();
        //update the localStorage while removing the most recent link
        localStorage.setItem("mylinks", JSON.stringify(mylinks));
        //call display function to display links
        display(mylinks);
});

//delete all of the url inputs in the DOM that were previous saved
//Delete All Button clicked eventlistener 
deleteAllBtn.addEventListener("click", () => {
    //clear the localStorage
    localStorage.clear();  
    //clear mylinks
    mylinks = [];
    //clear the DOM by calling the display function to display links
    display(mylinks);
});

//saves the current tab user is on in the localStorage, mylinks array, and the DOM
//Save Tab Button clicked eventlistener
tabBtn.addEventListener("click", () => {
    //access the chrome API to get the url of the current tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        //add the current tab's url into the mylinks arry
        mylinks.push(tabs[0].url);
        //update local storage with the current tab
        localStorage.setItem("mylinks", JSON.stringify(mylinks));
        //call display function to display links
        display(mylinks);
    });
});