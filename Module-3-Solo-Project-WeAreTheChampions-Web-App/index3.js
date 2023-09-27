//Database


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://endorsements-7f039-default-rtdb.firebaseio.com/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsementsList")


//Variables


const endorsementInptEl = document.getElementById("endorsement-inpt") 
const senderInptEl = document.getElementById("sender-inpt")
const receiverInptEl = document.getElementById("receiver-inpt")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-display")


//Functions


publishBtnEl.addEventListener("click",function () {

    let inputValue = endorsementInptEl.value
    let senderValue = senderInptEl.value
    let receiverValue = receiverInptEl.value

    let endorsementObject = {
        endorsement: inputValue,
        sender: senderValue,
        receiver: receiverValue
    }

    push(endorsementsInDB, endorsementObject)

    clearInptFields()
})



onValue(endorsementsInDB, function(snapshot) { 
    
    if(snapshot.exists()) {

        console.log (snapshot.val())
        let endorsementsArray = Object.entries(snapshot.val())
        // console.log (endorsementsArray)
        // console.log(endorsementsArray[0])
        
        clearEndorsementListEl ()
        
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentEndorsement = endorsementsArray[i]
            
            appendItemToEndorsementListEl (currentEndorsement)
        }

    }else {
        
        endorsementListEl.innerHTML = "No items here...yet"

    }
})


function clearEndorsementListEl () {
    endorsementListEl.innerHTML = ""
}




/**
 * Appends an endorsement item to the endorsement list element.
 * @param {Array} item - Contains the endorsement's ID and data.
 */
function appendItemToEndorsementListEl(item) {
    // Extract item's ID and data.
    let itemID = item[0];
    let endorsementData = item[1];

    // Create a container for the entire endorsement item.
    let endorsementContainer = document.createElement("div");
    endorsementContainer.className = "endorsement-container";

    // Create a div for the sender and set its content and class.
    let senderDiv = document.createElement("div");
    senderDiv.className = "endorsement-sender";
    senderDiv.textContent = endorsementData.sender;
    endorsementContainer.appendChild(senderDiv);  // Add sender div to the container.

    // Create a div for the endorsement text and set its content and class.
    let endorsementDiv = document.createElement("div");
    endorsementDiv.className = "endorsement-text";
    endorsementDiv.textContent = endorsementData.endorsement;
    endorsementContainer.appendChild(endorsementDiv);  // Add endorsement div to the container.

    // Create a div for the receiver and set its content and class.
    let receiverDiv = document.createElement("div");
    receiverDiv.className = "endorsement-receiver";
    receiverDiv.textContent = endorsementData.receiver;
    endorsementContainer.appendChild(receiverDiv);  // Add receiver div to the container.

    let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    endorsementContainer.appendChild(likeButton);

    // Add the entire endorsement container to the main list.
    endorsementListEl.appendChild(endorsementContainer);

    // Add an event listener to the container to allow removal from the database on double-click.
    endorsementContainer.addEventListener("dblclick", function() {
        let exactLocationOfEndorsementInDb = ref(database, `endorsementsList/${itemID}`);
        remove(exactLocationOfEndorsementInDb);  // Remove the endorsement from the database.
    });
}



function clearInptFields() {
    endorsementInptEl.value = ""
    senderInptEl.value = ""
    receiverInptEl.value = ""
}
