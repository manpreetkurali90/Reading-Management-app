



function displayBook(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'col-md-4 mb-4'; // Bootstrap classes for layout
    bookCard.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text"><strong>Author:</strong> ${book.author}</p>
                <p class="card-text"><strong>Genre:</strong> ${book.genre}</p>
                <p class="card-text"><strong>Publication Date:</strong> ${book['publication-date']}</p>
                <p class="card-text"><strong>Page Count:</strong> ${book['page-count']}</p>
            </div>
        </div>
    `;

    // Add the book card to the book list
    bookList.appendChild(bookCard);
};

