
const gallery = document.getElementById("imageGallery");
const dotsContainer = document.getElementById("sliderDots");
let currentIndex = 0;

function updateDots() {
  [...dotsContainer.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function createDots(count) {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      currentIndex = i;
      gallery.scrollTo({
        left: gallery.clientWidth * i,
        behavior: "smooth"
      });
      updateDots();
    });
    dotsContainer.appendChild(dot);
  }
  updateDots();
}

function slideLeft() {
  if (currentIndex > 0) currentIndex--;
  gallery.scrollTo({
    left: gallery.clientWidth * currentIndex,
    behavior: "smooth"
  });
  updateDots();
}

function slideRight() {
  if (currentIndex < gallery.children.length - 1) currentIndex++;
  gallery.scrollTo({
    left: gallery.clientWidth * currentIndex,
    behavior: "smooth"
  });
  updateDots();
}

/* AFTER IMAGES LOAD */
fetch(`${API_BASE}/api/images/boundary`)
  .then(res => res.json())
  .then(images => {
    gallery.innerHTML = images.map(img => `
      <div class="slider-item">
        <img src="${API_BASE}/uploads/${img.image}">
      </div>
    `).join("");

    createDots(images.length);
  });

