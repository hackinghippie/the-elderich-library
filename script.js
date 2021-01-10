const tbody = document.getElementById("tbody");

//ANIMATIONS: move welcome heading up, replace the buttons, make it scary.
function enterBtnClick() {
    document.getElementById("h1").innerHTML="What is seen cannot be unseen";
    document.getElementById("h1").style.fontSize="3em";
    document.getElementById("enterBtn").style.opacity="0%";
    document.getElementById("addBtn").style.opacity="100%";
    document.getElementById("addBtn").style.transitionDuration="2s";
    document.getElementById("addBtn").style.transitionDelay="1s";
    document.getElementById("headerDiv").style.paddingTop="1%";
    document.getElementById("headerDiv").style.transitionDuration="1s";
    document.getElementById("wrapperDiv").style.opacity="100%";
    document.getElementById("wrapperDiv").style.transitionDuration="2s";
    document.getElementById("wrapperDiv").style.zIndex="0";
}

function addBtnClick() {
    document.getElementById("inputDiv").style.opacity="95%";
    document.getElementById("inputDiv").style.transitionDuration="1s";
    document.getElementById("inputDiv").style.zIndex="2";
    document.getElementById("body").style.overflow="auto";
}

//DELETE function
function remove(element) {
    element.parentElement.remove(element);
    console.log(element.parentElement);
    books.splice(tr, 1);
    set();
}

//book array
let books = [];

//the nitty gritty guts
const addBook =(ev)=>{
    ev.preventDefault();
    document.getElementById("inputDiv").style.opacity="0%";
    document.getElementById("inputDiv").style.transitionDuration="1s";
    document.getElementById("inputDiv").style.zIndex="-1";

    //the object
    let book = {
        title:document.getElementById("title").value, //.value gives what the user has written
        author:document.getElementById("author").value,
        pages:document.getElementById("pages").value,
        year:document.getElementById("year").value,
        read:document.getElementById("read").checked,
    }

    books.push(book);
    document.forms[0].reset(); //clear form for next input
    //document.querySelector("form").reset(); same thing

    books.map((book) => {
        let row = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        td5.classList.add("checkTd");
        let td6 = document.createElement("td6");
        td6.innerHTML = `<button class=deleteBtn onclick=remove(this.parentElement)>Destroy</button>`
      
        //write input into the cell, write unknown if input is empty
        td1.innerHTML = book.title;
        if (book.title == null || book.title == "") {
            td1.innerHTML = "Unknown"
        }
        td2.innerHTML = book.author;
        if (book.author == null || book.author == "") {
            td2.innerHTML = "Unnamed"
        }
        td3.innerHTML = book.pages;
        if (book.pages == null || book.pages == "") {
            td3.innerHTML = "X"
        }
        td4.innerHTML = book.year;
        if (book.year == null || book.year == "") {
            td4.innerHTML = "X"
        }
        td5.innerHTML = book.read ? "Aye" : "Nay";
        
        //append cells and rows
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);
        tbody.appendChild(row);
    })

    //adds book into array in local storage and removed duplicates
    var existingBooks = JSON.parse(localStorage.getItem("BookList"));
    if(existingBooks == null) existingBooks = [];
    existingBooks.push(book);
    localStorage.setItem("BookList", JSON.stringify(existingBooks));
    books.splice(0,1);
    console.log(books);
} 

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("submitBook").addEventListener("click", addBook);
})

