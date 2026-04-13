localStorage.setItem("is_admin", JSON.stringify(false));


function handleLogin(event) {
  event.preventDefault();
  let name = document.getElementById("UserName").value;
  let password = document.getElementById("Password").value;
  if (name === "admin" && password === "123") {
    window.location.href = "../html/books.html";
    localStorage.setItem("is_admin", JSON.stringify(true));
  }
  sessionStorage.setItem("UserName", name);
  window.location.href = "../html/books.html";
}

function logout() {
  sessionStorage.clear();
  window.location.href = "../html/index.html";
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
