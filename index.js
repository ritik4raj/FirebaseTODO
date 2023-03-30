import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetttings = {
    databaseURL: "https://movie-6dcf0-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetttings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-txt-box");
const addButtonEl = document.getElementById("save-btn");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener('click',function(){
    
    let inputValue = inputFieldEl.value
    if(inputValue===''){
        
    }
    else{
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
    }
})
 function clearInputFieldEl(){
    inputFieldEl.value = " "
 }
 onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())
    clearShoppingListEl()
    for(let i=0;i<itemsArray.length;i++){
        let currentItem = itemsArray[i]
        //let currentItemID = currentItem[0]
        //let currentItemValue = currentItem[1]

        appendItemToShoppingListEl(currentItem)
    }
    }
    else{
        shoppingListEl.innerHTML= "no item yet..."
    }
    

    function appendItemToShoppingListEl(item){
        let itemID = item[0]
        let itemValue = item[1]

        let newEl = document.createElement("li")
        newEl.textContent = itemValue
        shoppingListEl.append(newEl)

        newEl.addEventListener('click',function(){
            let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)
           remove(exactLocationOfItemInDB)
        })
    }


 })
 function clearShoppingListEl(){
    shoppingListEl.innerHTML= " "
 }