document.addEventListener("DOMContentLoaded", () => {

  console.log(document.getElementById("book-title"));
  console.log(document.getElementById("id_author"));
  console.log(document.getElementById("id_category"));
  console.log(document.getElementById("id_status"));
  console.log(document.getElementById("id_description"));
  console.log(document.getElementById("id_cover"));

  const titleInput = document.getElementById("book-title");
  const authorInput = document.getElementById("auther");
  const categoryInput = document.getElementById("category");
  const statusInput = document.getElementById("status");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("book-image");


  const preview = document.querySelector(".preview");

  preview.innerHTML = `
    <div class="card-div">
      <div class="cover">
        <img id="preview-cover" src="" alt="Book cover" />
      </div>
      <div class="info">
        <div class="header">
          <h2 id="preview-title"></h2>
        </div>
        <div class="author-cont">
          <p>Author: <span id="preview-author"></span></p>
        </div>
        <div class="category-cont">
          <p>Category: <span id="preview-category"></span></p>
        </div>
        <div class="status-cont">
          <p>Status: <span id="preview-status"></span></p>
        </div>
        <div class="description-cont">
          <p>Description: <span id="preview-description"></span></p>
        </div>
      </div>
    </div>
    `;

  const previewTitle = document.getElementById("preview-title");
  const previewAuthor = document.getElementById("preview-author");
  const previewCategory = document.getElementById("preview-category");
  const previewStatus = document.getElementById("preview-status");
  const previewDescription = document.getElementById("preview-description");
  const previewCover = document.getElementById("preview-cover");

  // const currentImageLink = document.querySelector('a[href*="book_covers"]');
  // if (currentImageLink) {
  //   previewCover.src = currentImageLink.href;
  // }

  previewCover.src = imageInput.dataset.url || "";

  // Seed preview
  previewTitle.textContent = titleInput.value;
  previewAuthor.textContent = authorInput.value;
  previewCategory.textContent = categoryInput.options[categoryInput.selectedIndex]?.text;
  previewStatus.textContent = statusInput.options[statusInput.selectedIndex]?.text;
  previewDescription.textContent = descriptionInput.value;

  // Live listeners
  titleInput.addEventListener("input", () => {
    previewTitle.textContent = titleInput.value.trim() || "Book Title";
  });

  authorInput.addEventListener("input", () => {
    previewAuthor.textContent = authorInput.value.trim() || "—";
  });

  categoryInput.addEventListener("change", () => {
    previewCategory.textContent = categoryInput.options[categoryInput.selectedIndex].text;
  });

  statusInput.addEventListener("change", () => {
    previewStatus.textContent = statusInput.options[statusInput.selectedIndex].text;
  });

  descriptionInput.addEventListener("input", () => {
    previewDescription.textContent = descriptionInput.value.trim() || "—";
  });

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;
    previewCover.src = URL.createObjectURL(file);
  });

  // Cancel
  document.getElementById("cancel").addEventListener("click", () => {
    const pk = document.getElementById("cancel").dataset.pk;
    window.location.href = `/book/${pk}/`;
  });

}); // end DOMContentLoaded