const trendingSection = document.getElementById("main-books");
const codingSection = document.getElementById("Coding-books");
const novelsSection = document.getElementById("Novels");

fetch("../js/books.json")
  .then((response) => response.json())
  .then((books) => {
    books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book";
      bookCard.innerHTML = `
        <h2>${book.title}</h2>
        <a href="#" data-id="${book.id}">
          <img src="${book.image}" alt="${book.title}" />
        </a>
        <p>by ${book.author}</p>
        <button>Borrow</button>
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
  });

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
