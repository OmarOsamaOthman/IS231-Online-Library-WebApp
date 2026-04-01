const bookId = Number(localStorage.getItem("selectedBookId"));
let allBooks = JSON.parse(localStorage.getItem("allBooks")) || [];

const editBook = allBooks.find((book) => book.id === bookId);

let preview = document.getElementsByClassName("preview")[0];

const formSub = document.getElementById("form");

// preview elements section

// create containers
let card = document.createElement("div");
let img = document.createElement("img");
let title = document.createElement("h2");
let author = document.createElement("span");
let category = document.createElement("span");
let status = document.createElement("span");
let description = document.createElement("span");

// create texts
let titleText = document.createTextNode(editBook.title);
let authorText = document.createTextNode(editBook.author);
let categoryText = document.createTextNode(editBook.category);
let statusText = document.createTextNode(editBook.status);
let descriptionText = document.createTextNode(editBook.description);
let cover = document.createElement("img");

// set values
title.appendChild(titleText);
title.setAttribute("id", "book-title");

author.appendChild(authorText);
author.setAttribute("id", "book-author");

category.appendChild(categoryText);
category.setAttribute("id", "book-category");

status.appendChild(statusText);
status.setAttribute("id", "book-status");

description.appendChild(descriptionText);
description.setAttribute("id", "book-description");

cover.setAttribute("src", editBook.image);
cover.setAttribute("alt", "Book-cover");

card.innerHTML = `
            <div class="cover"></div>
            <div class="info">
                <div class="header"></div>
                <div class="author-cont">
                    <p>Author:</p>
                </div>
                <div class="category-cont">
                    <p>Category:</p>
                </div>
                <div class="status-cont">
                    <p>Status:</p>
                </div>
                <div class="description-cont">
                    <p>Description:</p>
                </div>
            </div>
`;

// appending the elements
preview.appendChild(card);
card.setAttribute("class", "card-div");

card.querySelector(".header").appendChild(title);
card.querySelector(".cover").appendChild(cover);

card.querySelector(".author-cont").firstElementChild.appendChild(author);
card.querySelector(".category-cont").firstElementChild.appendChild(category);
card.querySelector(".status-cont").firstElementChild.appendChild(status);
card
  .querySelector(".description-cont")
  .firstElementChild.appendChild(description);

// editing section

// create elements
let titleInput = document.querySelector("main form #book-title");
let authorInput = document.querySelector("main form #author");
let categoryInput = document.querySelector("main form #category");
let descriptionInput = document.querySelector("main form #description");
let statusInput = document.querySelector("main form #status");
let imageInput = document.querySelector("main form #book-image");

titleInput.setAttribute("value", titleText.nodeValue);
authorInput.setAttribute("value", authorText.nodeValue);

for (let i = 0; i < categoryInput.length; i++) {
  if (categoryInput.children[i].innerHTML == categoryText.nodeValue) {
    categoryInput.children[i].setAttribute("selected", "");
    break;
  }
}

descriptionInput.innerHTML = editBook.description;

for (let i = 0; i < statusInput.length; i++) {
  statusText.nodeValue =
    statusText.nodeValue[0].toUpperCase() + statusText.textContent.slice(1);
  if (statusInput.children[i].innerHTML == statusText.nodeValue) {
    statusInput.children[i].setAttribute("selected", "");
    break;
  }
}

titleInput.addEventListener("input", function () {
  title.textContent = titleInput.value.trim() || "Book Title";
});

authorInput.addEventListener("input", function () {
  author.textContent = authorInput.value.trim() || "Book Author";
});

categoryInput.addEventListener("input", function () {
  category.textContent = categoryInput.value.trim() || "Book category";
});

descriptionInput.addEventListener("input", function () {
  description.textContent = descriptionInput.value.trim() || "Book category";
});

statusInput.addEventListener("input", function () {
  status.textContent = statusInput.value.trim() || "Book category";
});

imageInput.addEventListener("change", function () {
  let file = imageInput.files[0];

  if (!file) return;

  cover.src = URL.createObjectURL(file);

  cover.setAttribute("alt", editBook.title);
});

console.log(allBooks);

formSub.onsubmit = function (p) {
  let titleValue = document.getElementById("book-title").value;
  let authorValue = document.getElementById("author").value;
  let categoryValue = document.getElementById("category").value;
  let descriptionValue = document.getElementById("description").value;
  let statusValue = document.getElementById("status").value;

  let file = document.getElementById("book-image").files[0];

  p.preventDefault();

  console.log(titleValue);
  console.log(authorValue);

  editBook.title = titleValue;
  editBook.author = authorValue;
  editBook.category = categoryValue;
  editBook.description = descriptionValue;
  editBook.status = statusValue;

  // if (!file) {
  //     alert("Please choose an image");
  //     return;
  // }

  const reader = new FileReader();

  reader.onload = function (e) {
    const imageBase64 = e.target.result;

    console.log(imageBase64.src);

    for (let i = 0; i < allBooks.length; i++) {
      console.log(editBook);
      if (allBooks[i].id == editBook.id) {
        allBooks[i].title = titleValue;
        allBooks[i].author = authorValue;
        allBooks[i].category = categoryValue;
        allBooks[i].description = descriptionValue;
        allBooks[i].status = statusValue;
        allBooks[i].id = editBook.id;
        allBooks[i].image = imageBase64;
      }

      console.log(allBooks[i]);
    }

    localStorage.setItem("allBooks", JSON.stringify(allBooks));
  };

  reader.readAsDataURL(file);
  window.location.href = "../html/books.html";
};
