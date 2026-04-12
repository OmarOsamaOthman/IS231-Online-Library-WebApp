const mainContainer = document.querySelector("main");

let borrowedBooks = JSON.parse(localStorage.getItem("Borrowed-Books")) || [];
let allBooks = JSON.parse(localStorage.getItem("allBooks")) || [];

function loadBorrowedBooks() {
    mainContainer.innerHTML = ""; 

    if (borrowedBooks.length === 0) {
        mainContainer.innerHTML = '<p>You have not borrowed any books yet. <a href="../html/books.html">Browse books</a></p>';
        return;
    }

    const grid = document.createElement("div");
    grid.style.display = "flex";
    grid.style.flexWrap = "wrap";
    grid.style.gap = "20px";
    grid.style.justifyContent = "center";
    grid.style.marginTop = "20px";

    borrowedBooks.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book";

        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <a href="#" class="borrowed-link" data-id="${book.id}">
                <img src="${book.image}" alt="${book.title}" style="width: 150px; border-radius: 5px;" />
            </a>
            <p>by ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <button class="return-btn" data-id="${book.id}" style="background-color: #006eff; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px; width: 100%;">
                Return Book
            </button>
        `;
        grid.appendChild(bookCard);
    });

    mainContainer.appendChild(grid);
    attachEvents();
}

function attachEvents() {
    document.querySelectorAll(".return-btn").forEach((btn) => {
        btn.onclick = (e) => {
            const bookId = Number(e.target.getAttribute("data-id"));
            handleReturn(bookId);
        };
    });

    document.querySelectorAll(".borrowed-link").forEach((anchor) => {
        anchor.onclick = (e) => {
            e.preventDefault();
            const id = Number(anchor.dataset.id);
            localStorage.setItem("selectedBookId", id);
            window.location.href = "../html/book-detail.html";
        };
    });
}

function handleReturn(id) {
    borrowedBooks = borrowedBooks.filter((b) => b.id !== id);
    const bookInLibrary = allBooks.find((b) => b.id === id);

    if (bookInLibrary) {
        bookInLibrary.status = "available"; 
    }

    localStorage.setItem("Borrowed-Books", JSON.stringify(borrowedBooks));
    localStorage.setItem("allBooks", JSON.stringify(allBooks));

    location.reload(); 
}

loadBorrowedBooks();
