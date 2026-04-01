// 📦 Data
const allBooks = JSON.parse(localStorage.getItem("allBooks")) || [];
let borrowed = JSON.parse(localStorage.getItem("Borrowed-Books")) || [];
const bookId = Number(localStorage.getItem("selectedBookId"));
const bookObj = allBooks.find((book) => book.id === bookId);
const isAdmin = JSON.parse(localStorage.getItem("is_admin")) || false;

// 🛑 حماية
if (!bookObj) {
  console.log("No selected book found");
}

// 📌 Elements
const title = document.getElementById("title-book");
const author = document.getElementById("author-book");
const category = document.getElementById("category-book");
const status = document.getElementById("status-book");
const description = document.getElementById("description-book");
const image = document.getElementById("image-book");

const changeStatus = document.getElementById("changeStatus");
const borrowBtn = document.getElementById("borrow");

// 🎯 Render Book Data
title.innerText = bookObj.title;
author.innerText = bookObj.author;
category.innerText = bookObj.category;
status.innerText = bookObj.status;
description.innerText = bookObj.description;
image.src = bookObj.image;

// 👨‍💼 Admin Mode
if (isAdmin) {
  changeStatus.style.display = "block";

  borrowBtn.innerText = "Edit";
  borrowBtn.style.backgroundColor = "red";

  borrowBtn.onclick = function () {
    handleEditBtn(bookObj);
  };
}

// 👤 User Mode
else {
  changeStatus.style.display = "none";

  if (bookObj.status !== "available") {
    borrowBtn.style.backgroundColor = "red";
    borrowBtn.innerText = "Borrowed";
  }

  borrowBtn.onclick = function () {
    handleBtnBorrow(bookObj.id);
  };
}

// 🔁 Change Status (Admin)
changeStatus.onclick = function () {
  bookObj.status = bookObj.status === "available" ? "borrowed" : "available";

  status.innerText = bookObj.status;

  allBooks.forEach((book) => {
    if (book.id === bookObj.id) {
      book.status = bookObj.status;
    }
  });

  localStorage.setItem("allBooks", JSON.stringify(allBooks));
  localStorage.setItem("selectedBookId", bookId);
};

// 📚 Borrow Logic
function handleBtnBorrow(id) {
  for (let i = 0; i < allBooks.length; i++) {
    if (id === allBooks[i].id) {
      if (allBooks[i].status === "available") {
        allBooks[i].status = "borrowed";
        borrowed.push(allBooks[i]);

        localStorage.setItem("allBooks", JSON.stringify(allBooks));
        localStorage.setItem("Borrowed-Books", JSON.stringify(borrowed));

        borrowBtn.innerText = "Borrowed";
        borrowBtn.style.backgroundColor = "red";

        showCongrats();
      } else {
        warning();
      }
      break;
    }
  }
}

// ✏️ Edit
function handleEditBtn(book) {
  localStorage.setItem("selectedBookId", bookId);
  window.location.href = "../html/Edit-book.html";
}

// 🎉 Alerts
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
