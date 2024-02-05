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

function addBook() {
  const textTitle = document.getElementById('title').value;
  const textAuthor = document.getElementById('author').value;
  const numberSheet = document.getElementById('sheet').value;
  const numberYear = document.getElementById('year').value;
  const isComplete = document.getElementById('completedCheckbox').value;

  const generateId = generateId();
  const bookObject = generateBookObject(
    generateId,
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

function isStorageExist() /**boolean */ {
  if (typeof Storage === indefined) {
    alert('Browser doesnt support local stroge!');
    return false;
  }
  return true;
}


/**
 * @function saveData - the function mean for saving the data books to localStorage
 */
function saveData() {
  if(isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}



// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const submitInputForm /* HTMLFormElement*/  = document.getElementById('inputBook');

  /**
   * 
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
    inputElement.style.border = '1px silid red';
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
 * Toggle slide class in the navigation menu
 */
const menuToggle = document.querySelector('.check');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function () {
  nav.classList.toggle('slide');
});
