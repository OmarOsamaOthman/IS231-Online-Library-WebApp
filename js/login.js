function handleLogin(event) {
  event.preventDefault();
  let name = document.getElementById("UserName").value;
  sessionStorage.setItem("UserName", name);
  window.location.href = "../html/books.html";
}
const adminCheckbox = document.getElementById("is-admin");

let isAdmin = JSON.parse(localStorage.getItem("is_admin")) || false;

// adminCheckbox.checked = isAdmin;

adminCheckbox.addEventListener("change", function () {
  isAdmin = adminCheckbox.checked;
  console.log(isAdmin)
  localStorage.setItem("is_admin", JSON.stringify(isAdmin));
});


function logout() {
  sessionStorage.clear();
  window.location.href = "../html/library.html";
}

window.onload = function () {
  let userName = sessionStorage.getItem("UserName");
  let loginContainer = document.querySelector(".login");

  if (userName && loginContainer) {
    loginContainer.innerHTML = `
            <span> Welcome ${userName}</span>
            <button onclick="logout()" style="margin-left:10px;">Logout</button>
        `;
  }
};
