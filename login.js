function handleLogin(event) {
    event.preventDefault();

    let name = document.getElementById("UserName").value;

    console.log(name);

    sessionStorage.setItem("UserName", name);

    window.location.href = "/pages/library/";
}
document.addEventListener("DOMContentLoaded", function () {

    let userName = sessionStorage.getItem("UserName");

    let loginBox = document.querySelector(".login");

    if (userName && loginBox) {
        loginBox.innerHTML = `
            <span>Welcome ${userName}</span>
            <button onclick="logout()">Logout</button>
        `;
    }

});

function logout() {
    sessionStorage.clear();
    location.reload();
}