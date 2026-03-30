let liveBook = document.createElement("div");

liveBook.innerHTML = `
        <div class="details-card">
            <img id="image-book" src="" alt="" />
            <div class="book-info">
                <h2 id="title-book"></h2>
                <p><strong>Author:</strong> <span id="author-book"></span></p>
                <p><strong>Category:</strong> <span id="category-book"></span></p>
                <p><strong>Status:</strong> <span id="status-book"></span></p>
                <p>
                    <strong>Description:</strong> <span id="description-book"></span>
                </p>
            </div>
        </div>
`;



let card = document.createElement("div");
let img = document.createElement("img");
let title = document.createElement("h2");
let author = document.createElement("span");
let category = document.createElement("span");
let status = document.createElement("span");
let description = document.createElement("span");


let titleText = document.createTextNode("Python Book");
// let authorText = document.createTextNode();
// let categoryText = document.createTextNode();
// let statusText = document.createTextNode();

title.appendChild(titleText);


// let title = document.createElement("h2");
// title = liveBook.querySelector("#title-book");
// // title = liveBook.querySelector("#title-book");
// let author = liveBook.querySelector("#author-book");
// let category = liveBook.querySelector("#category-book");
// let stat = liveBook.querySelector("#status-book")
// let desc = liveBook.querySelector("#description-book");


// title.innerText = "Python Book";
// let bookName = title.innerText;

// console.log(img);
// console.log(bookName);
// console.log(author);
// console.log(category);
// console.log(stat);
// console.log(desc);


let preview = document.getElementsByClassName("preview")[0];

console.log(preview);

preview.appendChild(title);


