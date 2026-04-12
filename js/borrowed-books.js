let borrowedBooks = [];
let allBooks = [];

const borrowedContainer = document.querySelector('.borrowed-books');

// 1. Fetch Data
function fetchData() {
    // Grab both arrays from localStorage. If they don't exist, default to empty arrays []
    borrowedBooks = JSON.parse(localStorage.getItem("Borrowed-Books")) || [];
    allBooks = JSON.parse(localStorage.getItem("allBooks")) || [];
    
    renderBorrowedBooks();
}

// 2. Render the HTML
function renderBorrowedBooks() {
    // If the user hasn't borrowed anything, show the default HTML message
    if (borrowedBooks.length === 0) {
        borrowedContainer.innerHTML = '<p>You have not borrowed any books yet. <a href="../html/books.html">Browse books</a></p>';
        return;
    }

    // Start building the HTML string with a flex container so cards sit next to each other
    let htmlOutput = '<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 20px;">';

    borrowedBooks.forEach(book => {
        // Reusing your ".book" CSS class from the main books page!
        htmlOutput += `
            <div class="book">
                <h2>${book.title}</h2>
                <a href="#" class="borrowed-book-link" data-id="${book.id}">
                    <img src="${book.image}" alt="${book.title}" style="width: 150px; border-radius: 5px;"/>
                </a>
                <p>by ${book.author}</p>
                <p><strong>Category:</strong> ${book.category}</p>
                <button 
                    onclick="returnBook(${book.id})" 
                    style="background-color: #ff9800; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px; width: 100%;">
                    Return Book
                </button>
            </div>
        `;
    });

    htmlOutput += '</div>';
    
    // Inject the HTML into the <main> tag
    borrowedContainer.innerHTML = htmlOutput;

    // Attach click events so the images lead to the details page
    attachClickEventsToLinks();
}

// 3. The Action: Returning a Book
window.returnBook = function(id) {
    // A. Filter out the returned book from the borrowed array
    borrowedBooks = borrowedBooks.filter(book => book.id !== id);

    // B. Find the exact book in the main library array and reset its status
    const bookInLibrary = allBooks.find(book => book.id === id);
    if (bookInLibrary) {
        bookInLibrary.status = "available";
    }

    // C. Save both updated arrays back into localStorage
    localStorage.setItem("Borrowed-Books", JSON.stringify(borrowedBooks));
    localStorage.setItem("allBooks", JSON.stringify(allBooks));

    // D. Re-render the screen. The returned book will instantly disappear!
    renderBorrowedBooks();
}

// 4. Click Events (Identical to your Search Page logic)
function attachClickEventsToLinks() {
    const bookLinks = document.querySelectorAll('.borrowed-book-link');
    
    bookLinks.forEach(link => {
        link.onclick = function(event) {
            event.preventDefault();
            const bookId = Number(link.getAttribute('data-id'));
            localStorage.setItem("selectedBookId", bookId);
            window.location.href = "../html/book-detail.html";
        };
    });
}

// Kickstart the logic when the file loads
fetchData();