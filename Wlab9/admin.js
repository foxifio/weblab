

'use strict'

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}


let useLocalStorage = false;


let storage = window.localStorage;
let buttonAddNews = document.getElementById("btnAdd");
buttonAddNews.onclick = onClick;

let requestDB = self.indexedDB.open('LAB_DB', 4);
let db = null;
let productsStore = null;


useIndexedDb();
checkStorage();



function onClick() {

    let newsInput = document.getElementById("news-text");
    let titleInput = document.getElementById("-");

    if (newsInput.value == "" || titleInput.value == "") {
        alert("Наявні пусті поля!")
    } else if (titleInput.value.length > 50) {
        alert("Занадто довгий заголовок!");
    } else {

        let news = {
            titleInput: titleInput.value,
            newsInput: newsInput.value
        };
        let newsJSON = JSON.stringify(news);


        if (useLocalStorage) {
            let newsList = storage.getObj("news");


            newsList.push(newsJSON);

            storage.setObj("news", newsList);
        } else {
            addData(news);
        }

        newsInput.value = "";
        titleInput.value = "";
    }
}

function useIndexedDb() {

    requestDB.onsuccess = function (event) {
        // get database from event
        db = event.target.result;
        checkStorage();
    };

    requestDB.onerror = function (event) {
        console.log('[onerror]', requestDB.error);
    };

    requestDB.onupgradeneeded = function (event) {
        var db = event.target.result;

        db.createObjectStore('news', {
            keyPath: 'id',
            autoIncrement: true
        });
        db.createObjectStore('fans', {
            keyPath: 'id',
            autoIncrement: true
        });
    };


}

function addData(data) {
    // create transaction from database
    let transaction = null;
    try {
        transaction = db.transaction('news', 'readwrite');
    } catch (e) {
        productsStore = db.createObjectStore('news', {
            keyPath: 'id',
            autoIncrement: true
        });
        transaction = db.transaction('news', 'readwrite');
    }

    // add success event handleer for transaction
    // you should also add onerror, onabort event handlers
    transaction.onsuccess = function (event) {
        console.log('[Transaction] ALL DONE!');
    };

    // get store from transaction
    productsStore = transaction.objectStore('news');

    // put products data in productsStore

    var db_op_req = productsStore.add(data);

    db_op_req.onsuccess = function (event) {
        console.log("ADDED"); // true
    }
}



function checkStorage() {
    if (useLocalStorage) {
        let news = storage.getObj("news");

        if (news == null) {
            storage.setObj("news", new Array());
        }
    } else {

    }

}
