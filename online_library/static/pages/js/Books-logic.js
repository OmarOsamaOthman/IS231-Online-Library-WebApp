
// initialize elements
const sections = {
  Trending: document.getElementById("main-books"),
  Coding: document.getElementById("Coding-books"),
  Novels: document.getElementById("Novels"),
};

setupAdmin();

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

// when the user clicks borrow
function handleBtnBorrow(bookId) {
  fetch(`/borrow/${bookId}/`, {
    method: "POST",
    headers: {
      "X-CSRFToken": getCSRF(),
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // update button UI without reloading
        const btn = document.querySelector(`[data-book-id="${bookId}"]`);
        btn.disabled = true;
        btn.textContent = "Borrowed";
        btn.style.backgroundColor = "red";
        showCongrats();
      } else {
        showWarning();
      }
    })
    .catch(() => showWarning());
}

// get CSRF token from cookies
function getCSRF() {
  const cookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : "";
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