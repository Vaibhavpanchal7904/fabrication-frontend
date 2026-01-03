const API_BASE = "https://fabrication-backend.onrender.com";

const categories = [
  "gate",
  "staircase",
  "boundary",
  "roofing",
  "shutter",
  "grill",
  "custom",
  "fineart"
];

const galleryGrid = document.getElementById("galleryGrid");
const buttons = document.querySelectorAll(".filter-btn");

let allImages = [];

// Load ALL categories
async function loadGallery() {
  for (const cat of categories) {
    try {
      const res = await fetch(`${API_BASE}/api/images/${cat}`);
      const data = await res.json();

      data.forEach(img => {
        allImages.push({
          category: cat,
          src: img.image
        });
      });
    } catch (err) {
      console.error(`Error loading ${cat}`, err);
    }
  }
  renderGallery("all");
}

function renderGallery(category) {
  galleryGrid.innerHTML = "";

  allImages
    .filter(img => category === "all" || img.category === category)
    .forEach(img => {
      galleryGrid.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="gallery-item">
            <img src="${img.src}" alt="">
          </div>
        </div>
      `;
    });
}

// Button click
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.category);
  });
});

loadGallery();
