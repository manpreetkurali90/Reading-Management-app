



let bookList;

function displayBook(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'col-md-4 mb-4'; // Bootstrap classes for layout
    bookCard.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text"><strong>Author:</strong> ${book.author}</p>
                <p class="card-text"><strong>Genre:</strong> ${book.genre}</p>
                <p class="card-text"><strong>Publication Date:</strong> ${book['publication-date'] || book.publicationDate}</p>
                <p class="card-text"><strong>Page Count:</strong> ${book['page-count'] || book.pageCount}</p>
            </div>
        </div>
    `;

    // Add the book card to the book list
    bookList.appendChild(bookCard);
};

function displayBooks() {
    if (!bookList) return;

    const books = JSON.parse(localStorage.savedbooklist || '[]');
    bookList.innerHTML = '';

    if (books.length === 0) {
        bookList.innerHTML = '<div class="col-12"><p class="text-muted">No books found yet. Add a book first in addnewbook.html.</p></div>';
        return;
    }

    books.forEach(book => displayBook(book));
}

// Initialize and display books on page load
document.addEventListener("DOMContentLoaded", () => {
    bookList = document.getElementById("book-list");

    // Initialize storage if not exists
    if (!localStorage.savedbooklist) {
        localStorage.savedbooklist = JSON.stringify([]);
    }

    displayBooks();
});
 
