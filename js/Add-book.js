const formSub = document.getElementById("form");

let storedBooks = JSON.parse(localStorage.getItem("allBooks")) || [];

formSub.onsubmit = function (p) {
  p.preventDefault();

  let titleValue = document.getElementById("book-title").value;
  let authorValue = document.getElementById("author").value;
  let categoryValue = document.getElementById("category").value;
  let descriptionValue = document.getElementById("description").value;
  let statusValue = document.getElementById("status").value;
  let file = document.getElementById("book-image").files[0];

  if (!file) {
    alert("Please choose an image");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const imageBase64 = e.target.result;

    const obj = {
      id: storedBooks.length + 1,
      title: titleValue,
      author: authorValue,
      category: categoryValue,
      description: descriptionValue,
      status: statusValue,
      image: imageBase64,
    };

    storedBooks.push(obj);
    localStorage.setItem("allBooks", JSON.stringify(storedBooks));

    console.log(storedBooks);
    alert("Book added successfully");
    formSub.reset();
  };

  reader.readAsDataURL(file);

};



const cansel_btn = document.getElementById("cancel");

cansel_btn.onclick = function () {
  window.location.href = ("../html/books.html");
}

console.log(storedBooks);