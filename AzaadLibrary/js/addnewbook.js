document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const addBookForm = document.getElementById("add-book-form");

  // 1. INITIALIZE STORAGE
  if (!localStorage.savedbooklist) {
    localStorage.savedbooklist = JSON.stringify([]);
  }

  // 2. DISPLAY EXISTING BOOKS
  displayAllBooks();

  // 3. FORM SUBMISSION
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBook = {
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      genre: document.getElementById("genre").value,
      publicationDate: document.getElementById("publication-date").value,
      pageCount: document.getElementById("page-count").value,
      pagesRead: document.getElementById("pages-read").value || 0,
      notesText: document.getElementById("book-notes").value || null,
    };
    

    const fileInput = document.getElementById("notes-file");
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        newBook.notesFile = {
          name: file.name,
          type: file.type,
          content: reader.result,
        };

        saveBook(newBook);
        displayAllBooks();
        addBookForm.reset();
      };
      reader.readAsDataURL(file);
    } else {
      saveBook(newBook);
      displayAllBooks();
      addBookForm.reset();
    }
  });

  // HELPER FUNCTIONS
  function saveBook(book) {
    const books = JSON.parse(localStorage.savedbooklist);
    book.id = Date.now();
    books.push(book);
    localStorage.savedbooklist = JSON.stringify(books);
  }

  function displayAllBooks() {
    const books = JSON.parse(localStorage.savedbooklist);

    bookList.innerHTML = books
      .map((book) => {
        const totalPages = parseInt(book.pageCount) || 0;
        const pagesRead = parseInt(book.pagesRead) || 0;
        const progress = totalPages > 0 ? Math.min((pagesRead / totalPages) * 100, 100).toFixed(0) : 0;

        return `
          <div class="col-md-4 mb-4">
              <div class="card">
                  <div class="card-body">
                      <h5>${book.title}</h5>
                      <p>Author: ${book.author}</p>
                      <p>Genre: ${book.genre}</p>
                      <p>Published: ${book.publicationDate}</p>
                      <p>Pages: ${book.pageCount}</p>
                      <div class="progress mb-2">
                          <div class="progress-bar" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                              ${progress}%
                          </div>
                      </div>
                      ${book.notesFile ? `<p><strong>Notes File:</strong> <a href="${book.notesFile.content}" download="${book.notesFile.name}">${book.notesFile.name}</a></p>` : ""}
                      <p>Notes: ${book.notesText ? book.notesText : "—"}</p>
                      <button class="btn btn-danger mt-2" onclick="deleteBook(${book.id})">Delete</button>
                  </div>
              </div>
          </div>
        `;
      })
      .join("");
  }

  window.deleteBook = function (bookId) {
    let books = JSON.parse(localStorage.savedbooklist);
    books = books.filter((book) => book.id !== bookId);
    localStorage.savedbooklist = JSON.stringify(books);
    displayAllBooks();
  };
});
