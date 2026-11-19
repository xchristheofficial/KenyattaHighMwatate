const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
function toggleMenu(open) {
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
}
menu.addEventListener("click", () =>
  toggleMenu(!nav.classList.contains("open")),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    toggleMenu(false);
    menu.focus();
  }
});
const theme = document.querySelector("#theme");
function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  theme.setAttribute("aria-pressed", String(dark));
}
try {
  setTheme(localStorage.getItem("darkMode") === "true");
} catch {}
theme.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark");
  setTheme(dark);
  try {
    localStorage.setItem("darkMode", String(dark));
  } catch {}
});
const photo = document.querySelector("#slide");
if (photo) {
  const slides = [
    ["entrance.webp", "The main entrance"],
    ["science.webp", "Science in action"],
    ["sports.webp", "On the sports field"],
  ];
  let i = 0;
  function advance(step) {
    i = (i + step + slides.length) % slides.length;
    const [file, title] = slides[i];
    photo.src = `images/${file}`;
    photo.alt = title;
    document.querySelector("#caption").innerHTML =
      `<b>0${i + 1} / 03</b> &nbsp; ${title}`;
  }
  document.querySelector("#next").onclick = () => advance(1);
  document.querySelector("#prev").onclick = () => advance(-1);
}
const lightbox = document.querySelector(".viewer");
if (lightbox) {
  const cards = Array.from(document.querySelectorAll(".gallery button"));
  const photo = lightbox.querySelector("img");
  let current = 0;
  function show(index) {
    current = (index + cards.length) % cards.length;
    const image = cards[current].querySelector("img");
    photo.src = image.src;
    photo.alt = image.alt;
    lightbox.querySelector("small").textContent =
      `Photo ${current + 1} of ${cards.length}`;
    lightbox.querySelector("strong").textContent = image.alt;
  }
  cards.forEach((card, i) =>
    card.addEventListener("click", () => {
      show(i);
      lightbox.showModal();
    }),
  );
  lightbox.querySelector("[data-close]").onclick = () => lightbox.close();
  lightbox.querySelector("[data-prev]").onclick = () => show(current - 1);
  lightbox.querySelector("[data-next]").onclick = () => show(current + 1);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      show(current + (e.key === "ArrowRight" ? 1 : -1));
    }
  });
  const stage = lightbox.querySelector(".viewer-stage");
  let start;
  stage.onpointerdown = (e) => {
    if (!e.isPrimary) {
      start = null;
      return;
    }
    start = [e.clientX, e.clientY];
    stage.setPointerCapture(e.pointerId);
  };
  stage.onpointercancel = () => {
    start = null;
  };
  stage.onpointerup = (e) => {
    if (!start) return;
    const dx = e.clientX - start[0],
      dy = e.clientY - start[1];
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5)
      show(current + (dx < 0 ? 1 : -1));
    start = null;
  };
}
const form = document.querySelector("#contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
  location.href = `mailto:Kenyattataita@gmail.com?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(body)}`;
});
