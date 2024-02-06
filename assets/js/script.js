/**
 * [
 *    {
 *      id: <int>
 *      title: <string>
 *      author: <string>
 *      sheet: <number>
 *      year: <number>
 *      isCompleted: <boolean>
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
 * eventListener DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  const submitInputForm /* HTMLFormElement*/  = document.getElementById('inputBook');

  /**
   * 
   * @param {string} title - title validation 
   * @returns {boolean} - give back value boolean is empty or no 
   */
  function validateTitle(title){
    return title.trim() !== '';
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
