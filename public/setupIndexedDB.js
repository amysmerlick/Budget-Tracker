let request

function setupDB() {
    
    request = window.indexedDB.open("budget", 1);

    // Create schema
    request.onupgradeneeded = event => {
        const db = event.target.result;
        
        // Creates an object store with a listID keypath that can be used to query on.
        const toDoListStore = db.createObjectStore("budget", {keyPath: "name"});
        // Creates a statusIndex that we can query on.
        toDoListStore.createIndex("nameIndex", "name"); 

      }

      request.onsuccess = () => {

        const db = request.result
        const transaction = db.transaction(["budget"], "readwrite")
        const budgetStore = transaction.objectStore("budget")
        

        //let todaysDate = new Date()
        //budgetStore.add({name: "Groceries", value: 134.34, date: todaysDate.toString()})

      }




}

function saveRecord(tempTransaction) {

    const db = request.result
    const transaction = db.transaction(["budget"], "readwrite")
    const budgetStore = transaction.objectStore("budget")

    budgetStore.add(tempTransaction)


}

window.addEventListener('online', () => {

    const db = request.result
    const transaction = db.transaction(["budget"], "readwrite")
    const budgetStore = transaction.objectStore("budget")
    const nameIndex = budgetStore.index("nameIndex")

    const getTransactions = nameIndex.getAll()
    getTransactions.onsuccess = () => {

        console.log(getTransactions.result)
        addTransactionsToMongoDB(getTransactions.result)
    }

    console.log("The application is now online")
})

window.addEventListener('offline', () => {

    console.log("The application is now offline")
})


function addTransactionsToMongoDB(transactions) {

    fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(transactions),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
    })
    .then(response => {    
        return response.json();
    })
    .then(data => {
        console.log(data)

        populateChart();
        populateTable();
        populateTotal();

        const db = request.result
        const transaction = db.transaction(["budget"], "readwrite")
        const budgetStore = transaction.objectStore("budget")

        let clearRequest = budgetStore.clear()

        clearRequest.onsuccess = () => {

            console.log("All items removed from IndexedDB")
        }

        //Delete from the the IndexedDB
    })
    .catch(err => {
        console.log(err)
    });
    
}