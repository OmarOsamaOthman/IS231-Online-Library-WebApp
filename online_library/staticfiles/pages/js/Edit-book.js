document.addEventListener("DOMContentLoaded", () => {

  // ── Get form inputs ──
  const titleInput = document.getElementById("id_title");
  const authorInput = document.getElementById("id_author");
  const categoryInput = document.getElementById("id_category");
  const statusInput = document.getElementById("id_status");
  const descriptionInput = document.getElementById("id_description");
  const imageInput = document.getElementById("id_cover");

  // ── Build the preview card ──
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

  // ── Seed preview with current values ──
  previewTitle.textContent = titleInput.value;
  previewAuthor.textContent = authorInput.value;
  previewCategory.textContent = categoryInput.options[categoryInput.selectedIndex]?.text;
  previewStatus.textContent = statusInput.options[statusInput.selectedIndex]?.text;
  previewDescription.textContent = descriptionInput.value;


  const currentImageLink = document.querySelector('a[href*="book_covers"]');
  if (currentImageLink) previewCover.src = currentImageLink.href;

  // ── Live update listeners ──
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

  // ── Cancel button ──
  document.getElementById("cancel").addEventListener("click", () => {
    const pk = document.getElementById("cancel").dataset.pk;
    window.location.href = `/book/${pk}/`;
  });

}); // end DOMContentLoaded