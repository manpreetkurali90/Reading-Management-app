document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const addBookForm = document.getElementById("add-book-form");

  // Modal elements
  const bookDetailModal = new bootstrap.Modal(document.getElementById("bookDetailModal"));
  const notesInput = document.getElementById("notesInput");
  const saveNotesBtn = document.getElementById("saveNotesBtn");
  const exportTextBtn = document.getElementById("exportTextBtn");
  const exportPdfBtn = document.getElementById("exportPdfBtn");
  const clearNotesBtn = document.getElementById("clearNotesBtn");
  const deleteBookBtn = document.getElementById("deleteBookBtn");

  let currentBookId = null;
  let currentBook = null;

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

  // 4. MODAL EVENT HANDLERS
  saveNotesBtn.addEventListener("click", () => {
    if (currentBookId !== null) {
      NotesManager.saveNotes(currentBookId, notesInput.value);
      alert("Notes saved successfully!");
    }
  });

  exportTextBtn.addEventListener("click", () => {
    if (currentBookId !== null && currentBook) {
      NotesManager.exportAsText(currentBookId, currentBook.title, currentBook.author);
    }
  });

  exportPdfBtn.addEventListener("click", () => {
    if (currentBookId !== null && currentBook) {
      NotesManager.exportAsPDF(currentBookId, currentBook.title, currentBook.author);
    }
  });

  clearNotesBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all notes for this book?")) {
      if (currentBookId !== null) {
        NotesManager.deleteNotes(currentBookId);
        notesInput.value = "";
        alert("Notes cleared successfully!");
      }
    }
  });

  deleteBookBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this book?")) {
      if (currentBookId !== null) {
        deleteBook(currentBookId);
        bookDetailModal.hide();
      }
    }
  });

  // HELPER FUNCTIONS
  function saveBook(book) {
    const books = JSON.parse(localStorage.savedbooklist);
    book.id = Date.now();
    books.push(book);
    localStorage.savedbooklist = JSON.stringify(books);
  }

  function truncateText(text, maxWords = 30) {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  }

  function displayAllBooks() {
    const books = JSON.parse(localStorage.savedbooklist);

    bookList.innerHTML = books
      .map((book) => {
        const totalPages = parseInt(book.pageCount) || 0;
        const pagesRead = parseInt(book.pagesRead) || 0;
        const progress = totalPages > 0 ? Math.min((pagesRead / totalPages) * 100, 100).toFixed(0) : 0;
        const hasNotes = NotesManager.getNotes(book.id).length > 0;

        return `
          <div class="col-md-4 mb-4">
              <div class="card h-100 cursor-pointer" onclick="window.openBookDetail(${book.id})">
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
                      <p>Notes: ${book.notesText ? truncateText(book.notesText, 35) : "—"}</p>
                      ${hasNotes ? '<span class="badge bg-success">📝 Has Notes</span>' : ""}
                      <br><small class="text-muted mt-2 d-block">Click to view details & manage notes</small>
                  </div>
              </div>
          </div>
        `;
      })
      .join("");
  }

  /**
   * Open book detail modal
   */
  window.openBookDetail = function (bookId) {
    const books = JSON.parse(localStorage.savedbooklist);
    const book = books.find((b) => b.id === bookId);

    if (!book) {
      alert("Book not found!");
      return;
    }

    currentBookId = bookId;
    currentBook = book;

    // Populate book details
    document.getElementById("detailTitle").textContent = book.title;
    document.getElementById("detailAuthor").textContent = `by ${book.author}`;
    document.getElementById("detailGenre").textContent = book.genre;
    document.getElementById("detailDate").textContent = book.publicationDate;
    document.getElementById("detailPages").textContent = book.pageCount;

    // Calculate and display progress
    const totalPages = parseInt(book.pageCount) || 0;
    const pagesRead = parseInt(book.pagesRead) || 0;
    const progress = totalPages > 0 ? Math.min((pagesRead / totalPages) * 100, 100).toFixed(0) : 0;
    document.getElementById("detailProgress").textContent = `${pagesRead} / ${totalPages} pages (${progress}%)`;

    // Load notes
    notesInput.value = NotesManager.getNotes(bookId);

    // Show modal
    bookDetailModal.show();
  };

  window.deleteBook = function (bookId) {
    let books = JSON.parse(localStorage.savedbooklist);
    books = books.filter((book) => book.id !== bookId);
    localStorage.savedbooklist = JSON.stringify(books);
    NotesManager.deleteNotes(bookId);
    displayAllBooks();
  };
});
