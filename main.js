function login(event) {
    event.preventDefault();

    let username = document.getElementById("UserName").value;

    if (!username) {
        alert("Enter username");
        return;
    }

    localStorage.setItem("username", username);

    // redirect مضمون
    window.location.assign("library.html");
}

window.onload = function () {
    let username = localStorage.getItem("username");

    if (username) {
        // نخفي login و signup
        document.querySelector(".login").innerHTML = 
        `<p>Welcome ${username}</p>`;
    }
};

function logout() {
    localStorage.removeItem("username");
    window.location.reload();
}
