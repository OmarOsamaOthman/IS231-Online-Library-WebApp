let books = [];     // Empty array to hold the list of books

// Initialize DOM elements
const bookSearch = document.getElementById('search-query');
const categorySelect = document.getElementById('category');
const searchButton = document.getElementById('search-button');
const resetButton = document.getElementById('reset-button');
const searchResults = document.getElementById('search-results');

// Fetch books from localStorage or JSON file
async function fetchBooks() {
    const storedBooks = JSON.parse(localStorage.getItem("allBooks"));
    
    if (storedBooks && storedBooks.length > 0) {
        books = storedBooks;
    } else {
        const response = await fetch('../js/books.json'); 
        books = await response.json();
        localStorage.setItem("allBooks", JSON.stringify(books));
    }
}

// Check if a book matches the search/category
function checkBookMatches(book, searchQuery, category) {
    const matchesSearchQuery = book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery);
    const matchesCategory = category === "" || book.category.toLowerCase() === category.toLowerCase();
    
    return matchesSearchQuery && matchesCategory;
}

// Attach click events to book links in search results
function attachClickEventsToLinks() {
    const bookLinks = document.querySelectorAll('.search-book-link');

    bookLinks.forEach(link => {
        link.onclick = function(event) {
            event.preventDefault();
            const bookId = link.getAttribute('data-id');
            localStorage.setItem("selectedBookId", bookId);
            window.location.href = "../html/book-detail.html";
        };
    });
}

// Search button logic
searchButton.onclick = function(event) {
    if(event) event.preventDefault(); 

    const currentSearchQuery = bookSearch.value.toLowerCase();
    const currentCategory = categorySelect.value;

    const matchedBooks = books.filter((book) => {
        return checkBookMatches(book, currentSearchQuery, currentCategory);
    });

    if (matchedBooks.length > 0) {
        let htmlOutput = ""; 
        
        matchedBooks.forEach((book) => {
            htmlOutput += `
                <div class="book">
                    <h2>${book.title}</h2>
                    <a href="#" class="search-book-link" data-id="${book.id}">
                        <img src="${book.image}" alt="${book.title}" style="width: 100px; border-radius: 5px;"/>
                    </a>
                    <p>by ${book.author}</p>
                </div>
            `;
        });
        
        searchResults.innerHTML = htmlOutput;
        
        attachClickEventsToLinks();
        
    } else {
        searchResults.innerHTML = "<p>No books found matching your search criteria.</p>";
    }
}

// Reset button logic
resetButton.onclick = function() {
    bookSearch.value = "";
    categorySelect.value = "";
    searchResults.innerHTML = "";
}

fetchBooks();   