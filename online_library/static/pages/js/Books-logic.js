
// initialize elements
const sections = {
  Trending: document.getElementById("main-books"),
  Coding: document.getElementById("Coding-books"),
  Novels: document.getElementById("Novels"),
};

// console.log(books)

setupAdmin();

// if the user is admin...
function setupAdmin() {
  const statusTexts = document.querySelectorAll(".statusofbook");

  // if (isAdmin) {
  //   document.getElementById("borrowed-li").style.display = "none";
  //   document.getElementById("Add-li").style.display = "block";
  // } else {
  //   document.getElementById("borrowed-li").style.display = "block";
  //   document.getElementById("Add-li").style.display = "none";
  // }

  statusTexts.forEach((el) => (el.style.display = isAdmin ? "block" : "none"));

  // ← Don't touch .borrowbtn visibility here at all
  // The Django template already handles showing admin vs user buttons
  // via {% if role == "Admin" %} so JS doesn't need to touch them
}
// when the user clicks borrow
function handleBtnBorrow(bookId) {
  const btn = document.querySelector(`[data-book-id="${bookId}"]`);
  showCongrats();
}


function handleStatusChange(bookId, newStatus) {
  console.log(`Changing status of book ${bookId} to ${newStatus}`);
  const btn = document.querySelector(`[data-book-id="${bookId}"]`);
  showAdminCongrats();
}

function showCongrats() {
  toggleMessage("congrats");
}

function showWarning() {
  toggleMessage("warning");
}

function toggleMessage(id) {
  const el = document.getElementById(id);
  el.style.display = "block";
  setTimeout(() => (el.style.display = "none"), 3000);
}

function showAdminCongrats() {
  toggleMessage("adminCongrats");
}
