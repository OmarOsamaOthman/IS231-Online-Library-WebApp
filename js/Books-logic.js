const trendingSection = document.getElementById("main-books");
const codingSection = document.getElementById("Coding-books");
const novelsSection = document.getElementById("Novels");

let borrowed = JSON.parse(localStorage.getItem("Borrowed-Books")) || [];

let storedBooks = JSON.parse(localStorage.getItem("allBooks"));

if (storedBooks) {
  renderBooks(storedBooks);
} else {
  fetch("../js/books.json")
    .then((response) => response.json())
    .then((books) => {
      localStorage.setItem("allBooks", JSON.stringify(books));
      renderBooks(books);
    });
}

function renderBooks(books) {
  localStorage.setItem("allBooks", JSON.stringify(books));
  let count = 0;
  books.forEach((book) => {
    count++;
    const bookCard = document.createElement("div");
    bookCard.className = "book";
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
        <a href="#" data-id="${book.id}">
          <img src="${book.image}" alt="${book.title}" />
        </a>
        <p>by ${book.author}</p>
        <button id= "${count}" onclick = "handleBtnBorrow(${count})">Borrow</button>
      `;

    if (book.category === "Trending") {
      trendingSection.appendChild(bookCard);
    } else if (book.category === "Coding") {
      codingSection.appendChild(bookCard);
    } else if (book.category === "Novels") {
      novelsSection.appendChild(bookCard);
    }
  });

  addBookClickEvents(books);
}

function addBookClickEvents(books) {
  const bookAnchors = document.querySelectorAll(".book a");
  bookAnchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const bookId = Number(anchor.dataset.id);
      const selectedBook = books.find((book) => book.id === bookId);

      localStorage.setItem("selectedBook", JSON.stringify(selectedBook));
      window.location.href = "./book-detail.html";
    });
  });
}

function handleBtnBorrow(id) {
  const booksList = JSON.parse(localStorage.getItem("allBooks"));
  for (let i = 0; i < booksList.length; i++) {
    if (id === booksList[i].id) {
      console.log("YES - found book:", booksList[i]);
      if (booksList[i].status === "available") {
        borrowed.push(booksList[i]);
        booksList[i].status = "borrowed";
        localStorage.setItem("allBooks", JSON.stringify(booksList));

        localStorage.setItem("Borrowed-Books", JSON.stringify(borrowed));
        console.log(`Book avilabile`);
        showCongrats();
      } else {
        warning();
        console.log(`Book Unavilabile`);
      }
      break;
    }
  }
}

function showCongrats() {
  const congrats = document.getElementById("congrats");
  congrats.style.display = "block";

  setTimeout(() => {
    congrats.style.display = "none";
  }, 3000);
}

function warning() {
  const warn = document.getElementById("warning");
  warn.style.display = "block";

  setTimeout(() => {
    warn.style.display = "none";
  }, 3000);
}

// const myAnchors = document.querySelectorAll("a");
// console.log(myAnchors);
// const title = document.getElementById("title-book");
// const MyBooksAnchors = Array.from(myAnchors).slice(5);
// console.log(MyBooksAnchors);
// MyBooksAnchors.forEach((book) => {
//   book.removeAttribute("href");
//   book.onclick = function (e) {
//     e.preventDefault();
//     console.log(book);
//     const number = book.id;
//     console.log(number);
//     fetch("./books.json")
//       .then((response) => response.json())
//       .then((json) => {
//         const storedBook = json[number - 1];
//         localStorage.setItem("selectedBook", JSON.stringify(storedBook));
//         window.location.href = "./book-detail.html";
//       });
//   };
// });
