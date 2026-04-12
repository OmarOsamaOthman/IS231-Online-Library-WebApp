
const sections = {
  Trending: document.getElementById("main-books"),
  Coding: document.getElementById("Coding-books"),
  Novels: document.getElementById("Novels"),
};

localStorage.clear();



function loadBooks() {
  fetch("../js/books.json")
    .then((res) => res.json())
    .then((data) => {
      books = data;
      localStorage.setItem("allBooks", JSON.stringify(books));
      renderBooks(books);
    });
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
      

    `;
    if (book.category === "Trending") {
      sections.Trending.appendChild(bookCard);
    } else if (book.category === "Coding") {
      sections.Coding.appendChild(bookCard);
    } else if (book.category === "Novels") {
      sections.Novels.appendChild(bookCard);
    }
  });
  // addBookClickEvents(books);
  initCategorySliders();
  // setupAdmin();
}

function initCategorySliders() {
  document.querySelectorAll(".slider-btn").forEach((btn) => {
    const track = document.getElementById(btn.dataset.target);
    if (!track) return;

    const width = track.clientWidth;

    btn.onclick = () => {
      const dir = btn.classList.contains("next") ? 1 : -1;
      track.scrollBy({ left: dir * width, behavior: "smooth" });
    };
  });
}

loadBooks();
