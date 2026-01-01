function setLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.style.display = el.getAttribute("data-lang") === lang ? "block" : "none";
  });

  // 🔹 Form placeholders (important)
  if (lang === "gu") {
    document.getElementById("name").placeholder = "તમારું નામ";
    document.getElementById("phone").placeholder = "મોબાઇલ નંબર";
    document.getElementById("email").placeholder = "ઇમેઇલ";
    document.getElementById("message").placeholder = "તમારો સંદેશ";
    document.getElementById("interest").options[0].text = "તમારી જરૂરિયાત";
  } else {
    document.getElementById("name").placeholder = "Your Name";
    document.getElementById("phone").placeholder = "Mobile No";
    document.getElementById("email").placeholder = "Email Id";
    document.getElementById("message").placeholder = "Your Message";
    document.getElementById("interest").options[0].text = "Your Interest";
  }
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.style.display = el.getAttribute("data-lang") === lang ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("siteLang") || "gu";
  applyLanguage(lang);
});



