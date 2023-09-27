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

    push(endorsementsInDB,inputValue)

    clearInptFields()
})

/*
    Every time there's a change in the endorsementsList in the database 
    (like a new endorsement is added, removed, or modified), this listener will get triggered, 
    and the console will display the current list of endorsements.
*/

onValue(endorsementsInDB, function(snapshot) { //This method sets up a listener on the database reference. Whenever data at this reference or its children changes, the provided callback function will be invoked.
    
    if(snapshot.exists()) {

        
        let endorsementsArray = Object.entries(snapshot.val()) //we are turning the snapshot (which returns an object) into an array by using the "Object." method
        
        clearEndorsementListEl ()
        
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentEndorsement = endorsementsArray[i]
            // let currentEndorsementID = currentEndorsement[0]
            // let currentEndorsementValue = currentEndorsement[1]
            
            appendItemToEndorsementListEl (currentEndorsement)
        }

    }else {
        
        endorsementListEl.innerHTML = "No items here...yet"

    }
})


function clearEndorsementListEl () {
    endorsementListEl.innerHTML = ""
}


function appendItemToEndorsementListEl (item) {

    //first we had created 3 variables inside the onValue() function so that we could have either the entire object (currentEndorsement), just the key of the object(currentEndorsementID) or just the value of the object(currentEndorsementValue).
    //However, since we want to be able to use the value (to append new endorsements to the list) and the id (to remove endorsements from the list, more specificlly directly from the database) inside this very function, we chose to handle the creation of these variables in here by just using the parameter of the function and later on replacing it with the desisered argument when we invoke the function.
    let itemID = item[0]
    let itemValue = item[1]
    
    // this was the initial way we were using to append new items to the endorsementListEl (we were appending new divs inside the parent div by just using innerHTML and template literals)
    // endorsementListEl.innerHTML += `<div class="endorsement">${itemValue}</div>` 

    //now we will use createElement to append new endorsements to the endorsements list
    //1 - first we use the creatElement method on the document object and set what type of element we want to create, for example a <div>
    let newEndorsement = document.createElement ("div")

    //2 - seconddly we want to add the text content that will be inside the html tag, in our case, we use the parameter we chose when declaring the function, itemValue, which will be replaced by the argument "currentEndorsementValue" when we call this function inside the onValue listener
    newEndorsement.textContent = itemValue

    //2.1 - let's set a class name as well so that we can style it in css later
    newEndorsement.className = "endorsement"; 


    //3 - Last step is to take this element that we've just created and place it inside the parent element (using the append method)
    endorsementListEl.append(newEndorsement)


    //here we are creating an eventListener for each newly created endorsement, which are <divs>, that removes the endorsement when we double click it
    newEndorsement.addEventListener("dblclick", function() {
        let exactLocationOfEndorsementInDb = ref (database, `endorsementsList/${itemID}`)
        remove(exactLocationOfEndorsementInDb)
    })
}


function clearInptFields() {
    endorsementInptEl.value = ""
    senderInptEl.value = ""
    receiverInptEl.value = ""
}
