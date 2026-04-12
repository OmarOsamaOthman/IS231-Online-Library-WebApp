function handleLogin(event) {
  event.preventDefault();
  let nameInput = document.getElementById("UserName");

  if (nameInput) {
    let name = nameInput.value;
    sessionStorage.setItem("UserName", name);
    window.location.href = "../html/books.html";
  }
}

const adminCheckbox = document.getElementById("is-admin");

let isAdmin = JSON.parse(localStorage.getItem("is_admin")) || false;

// adminCheckbox.checked = isAdmin;

adminCheckbox.addEventListener("change", function () {
  isAdmin = adminCheckbox.checked;
  console.log(isAdmin);
  localStorage.setItem("is_admin", JSON.stringify(isAdmin));
});

function logout() {
  sessionStorage.removeItem("UserName");
  window.location.reload();
}

window.onload = function () {
  let username = sessionStorage.getItem("UserName");
  let loginContainer = document.querySelector(".login");

  if (username && loginContainer) {
    loginContainer.innerHTML = `
                <span style="color: white; margin-right: 10px;">مرحباً ${username}</span>
                <button onclick="logout()" style="cursor:pointer; padding: 5px 10px;">Logout</button>
            `;
  }
};
