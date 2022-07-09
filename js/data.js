const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}
     
function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}
     
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
       
    let data = JSON.parse(serializedData);
       
    if(data !== null)
           books = data;
     
    document.dispatchEvent(new Event("ondataloaded"));
}
     
function updateDataToStorage() {
    if(isStorageExist())
    saveData();
}
     
function composeBookObject(title, year, author, isCompleted) {
    return {
        id: +new Date(),
        title,
        year,
        author,
        isCompleted
    };
}
     
function findBook(bookId) {
    for(book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
}
     
     
function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;
     
        index++;
    }
     
    return -1;
}

function refreshDataFromBooks() {
   const uncompletedBookList  = document.getElementById(UNCOMPLETED_BOOK_ID);
   let completedBookList = document.getElementById(COMPLETED_BOOK_ID);
   
   for(book of books){
       const newBook = bookList(book.title, book.year, book.author, book.isCompleted);
       newBook[BOOK_ID] = book.id;
 
 
       if(book.isCompleted){
        completedBookList.append(newBook);
       } else {
        uncompletedBookList.append(newBook);
       }
   }
}