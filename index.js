import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-70756-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// Firebase config 
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppinglist")

// DOM
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEL = document.getElementById("shopping-list")

// App functionality
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue) // push to datd to firebase-DB
    
    clearInputFieldEl()
    
})

// "onValue" rewaltime database manupulation
onValue(shoppingListInDB, function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for ( let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            
            addShoppingListItem(currentItem)
        }
    }else{
        shoppingListEL.innerHTML= "No items on shopping list..."
    }
})

function addShoppingListItem(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function(){
        let itemLocationInDB = ref(database,`shoppinglist/${itemID}`)
        remove(itemLocationInDB)
    })

    shoppingListEL.append(newEl)
}

function clearShoppingListEl(){
    shoppingListEL.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}