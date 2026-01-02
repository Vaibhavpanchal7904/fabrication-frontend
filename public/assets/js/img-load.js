(function () {
  const gallery = document.getElementById("imageGallery");
  const dotsContainer = document.getElementById("sliderDots");

  // ✅ Safe exit (NO illegal return)
  if (!gallery || !dotsContainer) {
    console.warn("Slider not found on this page");
    return;
  }

  const API_BASE = "https://fabrication-backend.onrender.com";
  const endpoint = gallery.dataset.endpoint;

  let currentIndex = 0;
  let slideWidth = 0;

  /* CALCULATE REAL SLIDE WIDTH */
  function updateSlideWidth() {
    const firstSlide = gallery.querySelector(".slider-item");
    if (!firstSlide) return;

    const style = window.getComputedStyle(gallery);
    const gap = parseInt(style.columnGap || style.gap || 0);

    slideWidth = firstSlide.offsetWidth + gap;
  }

  /* UPDATE DOTS */
  function updateDots() {
    [...dotsContainer.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  /* CREATE DOTS */
  function createDots(count) {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => {
        currentIndex = i;
        gallery.scrollTo({
          left: slideWidth * currentIndex,
          behavior: "smooth"
        });
        updateDots();
      });
      dotsContainer.appendChild(dot);
    }

    updateDots();
  }

  /* ARROWS (GLOBAL for HTML onclick) */
  window.slideLeft = function () {
    if (currentIndex > 0) currentIndex--;
    gallery.scrollTo({
      left: slideWidth * currentIndex,
      behavior: "smooth"
    });
    updateDots();
  };

  window.slideRight = function () {
    if (currentIndex < gallery.children.length - 1) currentIndex++;
    gallery.scrollTo({
      left: slideWidth * currentIndex,
      behavior: "smooth"
    });
    updateDots();
  };

  /* SYNC DOTS ON MANUAL SWIPE */
  gallery.addEventListener("scroll", () => {
    if (!slideWidth) return;
    currentIndex = Math.round(gallery.scrollLeft / slideWidth);
    updateDots();
  });

  /* LOAD IMAGES */
  fetch(`${API_BASE}/api/images/${endpoint}`)
    .then(res => res.json())
    .then(images => {
      gallery.innerHTML = images.map(img => `
        <div class="slider-item">
          <img src="${API_BASE}/uploads/${img.image}" alt="">
        </div>
      `).join("");

      requestAnimationFrame(() => {
        updateSlideWidth();
        createDots(images.length);
      });
    })
    .catch(err => console.error("Slider load error:", err));

  /* RECALCULATE ON RESIZE */
  window.addEventListener("resize", updateSlideWidth);
})();
