const UNCOMPLETED_BOOK_ID = "books";
const COMPLETED_BOOK_ID = "completed-books";
const BOOK_ID = "itemId";

function addBook() {
     const uncompletedBookList  = document.getElementById(UNCOMPLETED_BOOK_ID);
     const completedBookList = document.getElementById(COMPLETED_BOOK_ID);

        const bookTitle = document.getElementById("title").value;
        const bookYear = document.getElementById("year").value;
        const bookAuthor = document.getElementById("author").value;
        const isCompleted = document.getElementById("bookIsCompleted").checked;

        const book = bookList(bookTitle, bookYear, bookAuthor, isCompleted);
        const bookObject = composeBookObject(bookTitle, bookYear, bookAuthor, isCompleted);

        book[BOOK_ID] = bookObject.id;
        books.push(bookObject);

            if (isCompleted){
                completedBookList.append(book);  
            }else{
                uncompletedBookList.append(book);
            }
            updateDataToStorage();
    }

    function bookList(title, year, author, isCompleted) {
        const textTitle = document.createElement("h2");
        textTitle.innerText = title;
     
        const textYear = document.createElement("p");
        textYear.innerText = "Terbit : " + year;

        const textAuthor = document.createElement("small");
        textAuthor.innerText = "Oleh : " + author;
     
        const textContainer = document.createElement("div");
        textContainer.classList.add("inner");
        textContainer.append(textTitle, textYear, textAuthor);
     
        const container = document.createElement("div");
        container.classList.add("item", "shadow");
        container.append(textContainer);

        if(isCompleted){
            container.append(
                createUndoButton(),
                createTrashButton()
                );
        } else {
            container.append(
                createCheckButton(),
                createTrashButton()
                );
        }
        return container;
    }

        function createButton(buttonTypeClass , eventListener) {
        const button = document.createElement("button");
        button.classList.add(buttonTypeClass);
        button.addEventListener("click", function (event) {
            eventListener(event);
        });
        return button;
    }

        function addTaskToCompleted(taskElement) {
            const taskTitle = taskElement.querySelector(".inner > h2").innerText;
            const taskYear = taskElement.querySelector(".inner > p").innerText.replace('Terbit : ', '');
            const taskAuthor = taskElement.querySelector(".inner > small").innerText.replace('Oleh : ', '');

            const newBook = bookList(taskTitle, taskYear, taskAuthor, true);

            const book = findBook(taskElement[BOOK_ID]);
            book.isCompleted = true;
            newBook[BOOK_ID] = book.id;

            const completedBookList = document.getElementById(COMPLETED_BOOK_ID);
            completedBookList.append(newBook);
            taskElement.remove();

            updateDataToStorage();
    } 
        function createCheckButton() {
        return createButton("check-button", function(event){
             addTaskToCompleted(event.target.parentElement);
        });
    }
        function removeTaskFromCompleted(taskElement) {
            const bookPosition = findBookIndex(taskElement[BOOK_ID]);
            books.splice(bookPosition, 1);

            taskElement.remove();
            updateDataToStorage();
    }
        function createTrashButton() {
        return createButton("trash-button", function(event){
            removeTaskFromCompleted(event.target.parentElement);
        });
    }
        function undoTaskFromCompleted(taskElement){
        const taskTitle = taskElement.querySelector(".inner > h2").innerText;
        const taskYear = taskElement.querySelector(".inner > p").innerText.replace('Terbit :', '');
        const taskAuthor = taskElement.querySelector(".inner > small").innerText.replace('Oleh :', '');
     
        const newBook = bookList(taskTitle, taskYear, taskAuthor, false);
        
        const book = findBook(taskElement[BOOK_ID]);
        book.isCompleted = false;
        newBook[BOOK_ID] = book.id;

        const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_ID);
        uncompletedBookList.append(newBook);
        taskElement.remove();

        updateDataToStorage();
    }
        function createUndoButton() {
        return createButton("undo-button", function(event){
            undoTaskFromCompleted(event.target.parentElement);
        });
    }

    const booksLength = () => {
        const jumlahbuku = document.getElementById('jumlahbuku');
        jumlahbuku.innerText = books.length;
    }