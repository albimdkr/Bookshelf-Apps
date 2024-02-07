/**
 * [
 *    {
 *      id: <int>
 *      title: <string>
 *      author: <string>
 *      sheet: <number>
 *      year: <number>
 *      isComplete: <boolean>
 *    }
 * ]
 */

const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const DELETED_EVENT = 'deleted-book';
const UNDO_EVENT = 'undo-book';
const STORAGE_KEY = 'BOOKS_APP';

/**
 * generate uniq id of each book
 * @returns {number}
 */
function generateId (){
  return +new Date();
}

/**
 * generate Book Object
 * @param {int} id 
 * @param {string} title 
 * @param {string} author 
 * @param {number} sheet 
 * @param {number} year 
 * @param {Boolean} isComplete 
 * @returns 
 */
function generateBookObject(id, title, author, sheet, year, isComplete) {
  return {
    id,
    title,
    author,
    sheet,
    year,
    isComplete,
  };
}

/**
 * @function findBook - this mean for search book from bookId
 * @param {id} bookId 
 * @returns 
 */
function findBook(bookId) {
  return books.find(bookItem => bookItem.id === bookId) || null;
}

/**
 * @function findBookIndex - this mean for find book index from id
 * @param {id} bookId 
 * @returns 
 */
function findBookIndex(bookId) {
  return books.findIndex(book => book.id === bookId);
}

/**
 * @function isStorageExist - this function mean the to check the localStorage are support or not
 * @returns {boolean}
 */
function isStorageExist() /**boolean */ {
  return typeof Storage !== 'undefined' ? true : (alert(messageFailure), false);
}

/**
 * @function saveData - the function mean for saving the data books to localStorage
 * @see {STORAGE_KEY}
 * @see {SAVED_EVENT}
 */
function saveData() {
  isStorageExist() && (localStorage.setItem(STORAGE_KEY, JSON.stringify(books)), document.dispatchEvent(new Event(SAVED_EVENT)));
}


/**
 * @function loadDataFromStorage - that mean loaded Data from localStorage to push render in book
 * @see {RENDER_EVENT}
 */
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data){
      books.push(book);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

/**
 * @function makeBookItem - this mean to create the element html dynamic
 */
function makeBookItem(bookObject) {
  const {id, title, author, sheet, year, isComplete } = bookObject;

  const textTitle = document.createElement('h1');
  textTitle.innerText = title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = author;

  const numberSheet = document.createElement('p');
  numberSheet.innerText = sheet;

  const numberYear = document.createElement('p');
  numberYear.innerText = year;

  const wripperSectionBooks = document.createElement('div');
  wripperSectionBooks.classList.add('inner');
  wripperSectionBooks.append(textTitle, textAuthor, numberSheet, numberYear);
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('item', 'shadow');
  wrapper.append(wripperSectionBooks);
  wrapper.setAttribute('id', `book-${id}`);
  
  if (isComplete){
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
    undoButton.addEventListener('click', () => { undoBookFromCompleted(id) });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.addEventListener('click', () => { removeBookFromCompleted(id) });
    wrapper.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', () => { addBookToCompleted(id) });
    wrapper.append(checkButton);
  }
  return wrapper;
}

/**
 * @function addBook - mean the book data saved to array books (database)
 */
function addBook() {
  const textTitle = document.getElementById('title').value;
  const textAuthor = document.getElementById('author').value;
  const numberSheet = document.getElementById('sheet').value;
  const numberYear = document.getElementById('year').value;
  const isComplete = document.getElementById('completeCheckbox').value;

  const generatedID = generateId();
  const bookObject = generateBookObject(
    generatedID,
    textTitle,
    textAuthor,
    numberSheet,
    numberYear,
    isComplete
  );
  books.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

/**
 * @function addBookComplete - this mean to add book when complete to section finished read
 * @param {id} bookId 
 * @returns 
 */
function addBookComplete(bookId) {
  const bookTarget = findBook(bookId);
  if(bookTarget == null) return;
  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

/**
 * @function removeBookFromCompleted - this mean for remove book from section finished
 * @param {id} bookId 
 * @returns 
 */
function removeBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget === -1) return;
  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

/**
 * @function undoBookFromCompleted - this mean action undo from Finished to should Read
 * @param {id} bookId 
 * @returns 
 */
function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;
  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const submitInputForm /* HTMLFormElement*/  = document.getElementById('inputBook');
  /** 
   * @param {string} - title,author, sheet, year validation 
   * @returns {boolean} - give back value boolean is empty or no 
   */
  function validateTitle(title){
    return title.trim() !== '';
  }

  function validateAuthor(author) {
    return author.trim() !== '';
  }

  function validateSheet(sheet) {
    return sheet.trim() !== '';
  }

  function validateYear(year) {
    return year.trim() !== '';
  }

  /**
   * 
   * @param {messageFailure} messageFailure - for handling message when the submited are not valid.
   */
  function handleValidationFailure(messageFailure){
    const inputElement = document.activeElement;
    inputElement.style.border = '1px solid red';
    // custome alert
  }
  
  submitInputForm.addEventListener('submit', (event) => {
    const formTitle = document.getElementById('title').value;
    const formAuthor = document.getElementById('author').value;
    const formSheet = document.getElementById('sheet').value;
    const formYear = document.getElementById('year').value;

    /**
     * @param {boolean} - validation switchcase
     */
    switch (true){
      case !validateTitle(formTitle):
        event.preventDefault();
        handleValidationFailure('The data title is empty, try again!');
      break;
      case !validateAuthor(formAuthor):
        event.preventDefault();
        handleValidationFailure('The data writes/author is empty, try again!');
      break;
      case !validateSheet(formSheet):
        event.preventDefault();
        handleValidationFailure('The data sheet is empty, try again!');
      break;
      case !validateYear(formYear):
        event.preventDefault();
        handleValidationFailure('The data year is empty, try again!');
      default:
        event.preventDefault();
        addBook();
      break;
    }
  });
});

/**
 * COSTUME EVENT: @see {RENDER_EVENT}
 */
document.addEventListener(RENDER_EVENT, () => {
  const uncompletedBOOKList = document.getElementById('books');
  const listCompleted = document.getElementById('complete-books');

  uncompletedBOOKList.innerHTML = '';
  listCompleted.innerHTML = '';

  /**
   * this mean for list categorize if book completed or not
   */
  for (const bookItem of books){
    const bookElement = makeBookItem(bookItem);
    if (bookItem.isComplete){
      listCompleted.append(bookElement);
    } else {
      uncompletedBOOKList.append(bookElement);
    }
  }
});

/**
 * Toggle slide class in the navigation menu
 */
const menuToggle = document.querySelector('.check');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function () {
  nav.classList.toggle('slide');
});
