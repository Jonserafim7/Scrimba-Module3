//Database

// Import the function to initialize Firebase app
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

// Import various utilities for Firebase's Realtime Database
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Define the settings/configuration for the Firebase app
const appSettings = {
    databaseURL: "https://endorsements-7f039-default-rtdb.firebaseio.com/"
}

// Initialize the Firebase app using the specified settings
const app = initializeApp(appSettings)

// Get the instance of the Realtime Database associated with the initialized app
const database = getDatabase(app)

// Create a reference to the "Endorsements" location in the database
const endorsementsInDB = ref(database, "endorsements")












//Variables
const endorsementInptEl = document.getElementById("endorsement-inpt") 
const senderInptEl = document.getElementById("sender-inpt")
const receiverInptEl = document.getElementById("receiver-inpt")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementDisplayEl = document.getElementById("endorsement-display")
let endorsementArray = []












//Functions

publishBtnEl.addEventListener("click", function() {
    
    const newEndorsement = document.createElement('div');
    newEndorsement.className = "endorsement"; 
    newEndorsement.innerHTML = `
    <div class="endorsement-sender">From ${senderInptEl.value}</div>
    <div class="endorsement-text">${endorsementInptEl.value}</div>
    <div id="last-line">
        <div class="endorsement-receiver">To ${receiverInptEl.value}</div>
        <button class="love-btn">
            <i class="fas fa-heart"><span class="love-count">0</span></i>
        </button>
    </div>
    `
    
    endorsementDisplayEl.appendChild(newEndorsement);
     
    setUpLoveButton(newEndorsement)
    
    let endorsementObject = createEndorsementObject(senderInptEl.value, endorsementInptEl.value, receiverInptEl.value)

    push(endorsementsInDB, endorsementObject)

    clearInptFields()
})




function setUpLoveButton(endorsementElement) {
    // Get a reference to the love button within the endorsementElement
    const loveButton = endorsementElement.querySelector(".love-btn");
    
    // Get a reference to the counter/display next to the love button
    const loveCounter = endorsementElement.querySelector(".love-count");
    
    // Add an event listener to the love button to update the count when clicked
    loveButton.addEventListener("click", function() {
        // Get the current count from the counter's text, converting it to a number
        let currentCount = parseInt(loveCounter.textContent, 10);
        
        // Increment the count and update the counter's text
        loveCounter.textContent = currentCount + 1;
    });
}





function createEndorsementObject(senderValue, endorsementValue, receiverValue) {
    // Create an endorsement object using the provided values
    let endorsementObject = {
        sender: senderValue,
        endorsement: endorsementValue,
        receiver: receiverValue
    };
    
    // Add the newly created endorsement object to the global endorsementArray
    endorsementArray.push(endorsementObject);
    
    // Log the updated endorsementArray for debugging
    console.log(endorsementArray);

    return endorsementObject; // Return the created object
}






function clearInptFields() {
    // Reset the value of the endorsement input to an empty string
    endorsementInptEl.value = '';
    
    // Reset the value of the sender input to an empty string
    senderInptEl.value = '';
    
    // Reset the value of the receiver input to an empty string
    receiverInptEl.value = '';
}
