let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        noOfPages: 295,
        isRead: true
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        noOfPages: 281,
        isRead: false
    },
    {
        title: "1984",
        author: "George Orwell",
        noOfPages: 328,
        isRead: true
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        noOfPages: 432,
        isRead: false
    }                
];

class Book {
    constructor(title, author, noOfPages, isRead) {
        this.title = title,
        this.author = author,
        this.noOfPages = noOfPages,
        this.isRead = isRead
    }
}

function addBookToLibrary(title, author, noOfPages, isRead=false) {
    const book = new Book(title, author, noOfPages, isRead);
    myLibrary.push(book);
    addBookToDisplay(book);
}

function createKeyValueContainer(key, value) {
    const container = document.createElement('div');
    container.classList.add('info');
    
    const keyInfo = document.createElement('p');
    keyInfo.classList.add('key-info');
    keyInfo.textContent = key;
    container.appendChild(keyInfo);

    const valueInfo = document.createElement('p');
    valueInfo.classList.add('value-info');
    valueInfo.textContent = value;
    container.appendChild(valueInfo);

    return container;
}

function addBookToDisplay (book) {
    const booksContainer = document.querySelector('.books-container');

    // Book: titoe, author ...
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book');
    booksContainer.appendChild(bookContainer);

    // Title
    const title = document.createElement('h3');
    title.textContent = book.title;
    bookContainer.appendChild(title);

    // Author
    const author = createKeyValueContainer('Author', book.author)
    bookContainer.appendChild(author);

    // No of Pages
    const noOfPages = createKeyValueContainer('# of Pages', book.noOfPages)
    bookContainer.appendChild(noOfPages);

    // Read Status
    const readStatusContainer = document.createElement('div');
    readStatusContainer.classList.add('info');
    bookContainer.appendChild(readStatusContainer)

    const readStatus = document.createElement('label');
    readStatus.classList.add('key-info');
    readStatus.htmlFor = `book-${booksContainer.children.length}`;
    readStatus.textContent = 'Read Status: ';
    readStatusContainer.appendChild(readStatus);

    const isRead = document.createElement('input');
    isRead.classList.add('value-info');
    isRead.id = `book-${booksContainer.children.length}`;
    isRead.type = 'checkbox';
    isRead.checked = book.isRead;
    readStatusContainer.appendChild(isRead);

    // Read Status
    isRead.addEventListener('click', (e) => {
        myLibrary[e.target.id] = e.target.checked;
    })

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.id = booksContainer.children.length;
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    bookContainer.appendChild(deleteButton);

    deleteButton.addEventListener('click', (event) => {
        booksContainer.removeChild(bookContainer);
        myLibrary.splice(event.target.id - 1, 1);
    })
}

for (const book of myLibrary) {
    addBookToDisplay(book);
}

// Interative Form 
const dialog = document.querySelector('dialog');
const closeDialog = document.querySelector('button.close-dialog');

// Listen to Add Button
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', () => {
    dialog.showModal();
})

// Close Dialog
closeDialog.addEventListener('click', () => {
    dialog.close();
})


// Receive New Book request
const addBookForm = document.querySelector('dialog form');
addBookForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    addBookToLibrary(...data.entries().map((d) => d[1]));
});
