let myLibrary = [];
const submit = document.querySelector('#submit');

submit.addEventListener('click',addBookToLibrary);

// const form = document.querySelector('#form');
const library = document.querySelector('.libraryGrid');
const bookTitle = document.querySelector('#title').value;
const bookAuthor = document.querySelector('#author').value;
const bookPages = document.querySelector('#pages').value;
const bookStatus = document.querySelector('#bstatus');


class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = form.pages.value;
        this.bstatus = form.bstatus.options[bstatus.selectedIndex].value;
    }
}

    //add "Book" to myLibrary[]
function addBookToLibrary(e) {
    e.preventDefault;

//create new book value
    let newBook = new Book(title, author, pages, bstatus);
    
    myLibrary.push(newBook);
    setData();
    renderBooks();
    form.reset();
}

// display book value on DOM via createBook
function renderBooks() {
    const books = document.querySelectorAll('.book');
    books.forEach(book => library.removeChild(book));

    for (i = 0; i < myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}

// create book DOM, for renderBooks()
function createBook(item) {
    const bookDiv = document.createElement('div');
    const newTitle = document.createElement('div');
    const newAuthor = document.createElement('div');
    const newPages = document.createElement('div');
    const newStatusBtn = document.createElement('button');
    const newRemoveBtn = document.createElement('button');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    newTitle.textContent = 'Title: ' + item.title;
    newTitle.classList.add('title');
    bookDiv.appendChild(newTitle);

    newAuthor.textContent = 'Author: ' + item.author;
    newAuthor.classList.add('author');
    bookDiv.appendChild(newAuthor);

    newPages.textContent = 'Pages: ' + item.pages;
    newPages.classList.add('pages');
    bookDiv.appendChild(newPages);


    const read = () => {
        newStatusBtn.textContent = 'Read';
        newStatusBtn.style.backgroundColor = 'green';
    }

    const reading = () => {
        newStatusBtn.textContent = 'Reading';
        newStatusBtn.style.backgroundColor = 'yellow';
    }

    const unread = () => {
        newStatusBtn.textContent = 'Not Read';
        newStatusBtn.style.backgroundColor = 'red';
    }


    // change reading status on dropdown options
    newStatusBtn.classList.add('bstatus');
    bookDiv.appendChild(newStatusBtn);
    if(item.bstatus === "read") {
        read();
    } else if(item.bstatus === "reading" ) {
        reading();
    } else {
        unread();
    }

    //append remove book button
    newRemoveBtn.textContent = 'Remove Book';
    newRemoveBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(newRemoveBtn);
    library.appendChild(bookDiv);

    // remove button function
    newRemoveBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData();
        renderBooks();
    });

    // toggle status button
    newStatusBtn.addEventListener('click', () => {

            if(item.bstatus === "read"){
                item.bstatus = "reading";
                reading();
            }else if(item.bstatus === "reading") {
                item.bstatus = "unread";
                unread();
            }else {
                item.bstatus = "read"
                read;
            }
        // console.log("whats this1"+item.bstatus);
        // console.log("whats this2"+myLibrary[i]);
        setData();
        renderBooks();

console.log(myLibrary);
    });
}

function reset() {
    form.title.value = "";
    form.author.value = "";
    form.pages.value = "";
    form.bstatus.options[bstatus.selectedIndex].value = "";
}


//store library in local storage
function setData() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// pull books from local storage when page is loaded/refreshed
function restore() {
    if(!localStorage.myLibrary) {
        renderBooks();
    } else {
        let objects = localStorage.getItem("myLibrary");
        // get info from local storage to use in below loop to create DOM
        objects = JSON.parse(objects);
        myLibrary = objects;
        renderBooks();
    }
}

restore();