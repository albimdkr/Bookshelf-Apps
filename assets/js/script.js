// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const submitInputForm /* HTMLFormElement*/  = document.getElementById('inputBook');
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
  // Render Data From Local Storage
  isStorageExist() && loadDataFromStorage();
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
