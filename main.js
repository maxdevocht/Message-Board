import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-b3616-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messageListInDB = ref(database, "messageList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("input-btn")
const messageListEl = document.getElementById("message-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(messageListInDB, inputValue)
    clearInputFieldEl()
})

onValue(messageListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
        clearMessageListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToMessageListEl(currentItem)
        }
    } else {
        messageListEl.innerHTML = `<p style="font-style: italic; color: #888888">Er zijn nog geen berichten..</p>`
    }

})

function clearMessageListEl() {
    messageListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToMessageListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `messageList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    messageListEl.append(newEl)
}