// initialize elements
const sections = {
  Trending: document.getElementById("main-books"),
  Coding: document.getElementById("Coding-books"),
  Novels: document.getElementById("Novels"),
};

// const addBtn = document.getElementById("Add-book");
let isAdmin = JSON.parse(localStorage.getItem("is_admin")) || false;
let borrowed = JSON.parse(localStorage.getItem("Borrowed-Books")) || [];
let books = JSON.parse(localStorage.getItem("allBooks")) || [];

setupAdmin();
loadBooks();

// if the user is admin...
function setupAdmin() {
  const statusTexts = document.querySelectorAll(".statusofbook");
  const btns = document.querySelectorAll(".borrowbtn");
  if (isAdmin) {
    document.getElementById("borrowed-li").style.display = "none";
    document.getElementById("Add-li").style.visibility = "block";
  } else {
    document.getElementById("borrowed-li").style.visibility = "block";
    document.getElementById("Add-li").style.display = "none";
  }

  statusTexts.forEach((el) => (el.style.display = isAdmin ? "block" : "none"));
  btns.forEach((btn) => (btn.style.display = isAdmin ? "none" : "block"));
}

// get books data
function loadBooks() {
  if (books.length > 0) {
    renderBooks(books);
  } else {
    fetch("../js/books.json")
      .then((res) => res.json())
      .then((data) => {
        books = data;
        localStorage.setItem("allBooks", JSON.stringify(books));
        renderBooks(books);
      });
  }
}

// render books in the UI
function renderBooks(books) {
  sections.Trending.innerHTML = "";
  sections.Coding.innerHTML = "";
  sections.Novels.innerHTML = "";
  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book";

    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <a href="#" data-id="${book.id}">
        <img src="${book.image}" alt="${book.title}" />
      </a>
      <p>by ${book.author}</p>
      <p class="statusofbook" style="display:none">${book.status}</p>
      <button class="borrowbtn"
        onclick="handleBtnBorrow(${book.id})"
        ${book.status !== "available" ? "disabled" : ""}
        style="background-color: ${book.status === "available" ? "#2d64d8" : "red"}"
      >
        ${book.status === "available" ? "Borrow" : "Borrowed"}
      </button>

    `;
    if (book.category === "Trending") {
      sections.Trending.appendChild(bookCard);
    } else if (book.category === "Coding") {
      sections.Coding.appendChild(bookCard);
    } else if (book.category === "Novels") {
      sections.Novels.appendChild(bookCard);
    }
  });
  addBookClickEvents(books);
  setupAdmin();
}

// if the admin click add button...
function addBookClickEvents(books) {
  document.querySelectorAll(".book a").forEach((anchor) => {
    anchor.onclick = (e) => {
      e.preventDefault();

      const id = Number(anchor.dataset.id);
      localStorage.setItem("selectedBookId", id);

      window.location.href = "./book-detail.html";
    };
  });
}

// when the user click borrow
function handleBtnBorrow(id) {
  const book = books.find((b) => b.id === id);

  if (!book) return;

  if (book.status === "available") {
    book.status = "borrowed";
    borrowed.push(book);

    saveData();
    showCongrats();
    setTimeout(() => location.reload(), 800);
  } else {
    warning();
  }
}

// handle local storage
function saveData() {
  localStorage.setItem("allBooks", JSON.stringify(books));
  localStorage.setItem("Borrowed-Books", JSON.stringify(borrowed));
}


function showCongrats() {
  toggleMessage("congrats");
}

function warning() {
  toggleMessage("warning");
}

function toggleMessage(id) {
  const el = document.getElementById(id);
  el.style.display = "block";
  setTimeout(() => (el.style.display = "none"), 3000);
}
