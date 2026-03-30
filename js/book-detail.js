let borrowed = JSON.parse(localStorage.getItem("Borrowed-Books")) || [];
const myBook = localStorage.getItem("selectedBook");
const bookObj = JSON.parse(myBook);
console.log("book: " + bookObj);
console.log(bookObj.title);
console.log(bookObj.author);
console.log(bookObj.category);
console.log(bookObj.status);
document.getElementById("title-book").innerText = bookObj.title;
document.getElementById("author-book").innerText = bookObj.author;
document.getElementById("category-book").innerText = bookObj.category;
document.getElementById("status-book").innerText = bookObj.status;
document.getElementById("description-book").innerText = bookObj.description;
document.getElementById("image-book").src = bookObj.image;
const borrowBtn = document.getElementById("borrow");
borrowBtn.addEventListener("click", function () {
  handleBtnBorrow(bookObj.id);
});

if (bookObj.status !== "available") {
  console.log("not avil");
  borrowBtn.style.backgroundColor = "red";
  borrowBtn.innerText = "borrowed";
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
        borrowBtn.style.backgroundColor = "red";
        borrowBtn.innerText = "borrowed";
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
