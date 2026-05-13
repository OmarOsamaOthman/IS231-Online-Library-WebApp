const cancel_btn = document.getElementById("cancel");

cancel_btn.onclick = function () {
  window.location.href = cancel_btn.dataset.url;
};

console.log("JS");