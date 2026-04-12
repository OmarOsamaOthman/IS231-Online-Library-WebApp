function handleLogin(event) {
  event.preventDefault();
  let name = document.getElementById("UserName").value;
  sessionStorage.setItem("UserName", name);
  window.location.href = "../html/books.html";
}



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
