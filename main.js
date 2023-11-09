/*
1. add function to script - take user input and store new book obj into array
2. function loop array - display each book on page, eg.table or card
3. add "NEW BOOK" btn that brings up form allowing users to input
    details for new book: author, title, number of pages, whether been read
    etc.
4. add BTN on each book display to remove book from library
    - need to associate DOM elements to actual bok obj eg. data-attribute
      that correponds to the index of the library array.
5. add BTN to each book diplay to change -read- status
    - toggle
*/

let myLibrary = [];
const submit = document.querySelector('#submit');

submit.addEventListener('click', addBookToLibrary);

// const form = document.querySelector('#form');
const library = document.querySelector('.libraryGrid');
const bookTitle = document.getElementById('title').value;
const bookAuthor = document.getElementById('author').value;
const bookPages = document.getElementById('pages').value;
const bookRead = document.getElementById('read').checked;

class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = form.pages.value;
        this.read = form.read.value;
    }
}

// console.log(Book);
function addBookToLibrary(e) {
    e.preventDefault;
    //on submit, add "Book" to myLibrary[]

//get new book value
    let newBook = new Book(title, author, pages, read);
    
    myLibrary.push(newBook);
    setData();
    renderBooks();
    console.log('push new book into library');
    // console.log(bookTitle, bookAuthor, bookPages, bookRead);
}

// display book value on DOM via createBook
function renderBooks () {
    const books = document.querySelectorAll('.book');
    books.forEach(book => library.removeChild(book));

    for (i = 0; i < myLibrary.length; i++){
        createBook(myLibrary[i]);

    console.log('display book list');
    }
}

// create book DOM, for renderBooks()
function createBook(item) {
    const book = document.createElement('div');
    const newTitle = document.createElement('div');
    const newAuthor = document.createElement('div');
    const newPages = document.createElement('div');
    const newReadBtn = document.createElement('button');
    const newRemoveBtn = document.createElement('button');

    // book.classList.add('book');
    book.setAttribute('id', myLibrary.indexOf(item));

    newTitle.textContent = item.title;
    newTitle.classList.add('item', 'title');
    book.appendChild(newTitle);

    newAuthor.textContent = item.author;
    newAuthor.classList.add('item', 'author');
    book.appendChild(newAuthor);

    newPages.textContent = item.pages;
    newPages.classList.add('item', 'pages');
    book.appendChild(newPages);

    newReadBtn.classList.add('item', 'read');
    book.appendChild(newReadBtn);
    if(item.read === false) {
        newReadBtn.textContent = 'Not Read';
        newReadBtn.style.backgroundColor = 'red';
    } else {
        newReadBtn.textContent = 'Read';
        newReadBtn.style.backgroundColor = 'green';
    }

    newRemoveBtn.textContent = 'Remove Book';
    newRemoveBtn.setAttribute('id', 'removeBtn');
    newRemoveBtn.classList.add('item');
    book.appendChild(newRemoveBtn);

    library.appendChild(book);

    newRemoveBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData();
        renderBooks();
    });

    newReadBtn.addEventListener('click', () => {
        item.read = !item.read;
        setData();
        renderBooks();
    });

}


//store library in local storage
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

// pull books from local storage when page is loaded/refreshed
function restore() {
    if(!localStorage.myLibrary) {
        renderBooks();
        console.log('no books rendered');
    } else {
        let objects = localStorage.getItem(`myLibrary`);
        // get info from local storage to use in below loop to create DOM
        objects = JSON.parse(objects);
        myLibrary = objects;
        renderBooks();
        console.log('local storage books rendered');
    }
}

restore();