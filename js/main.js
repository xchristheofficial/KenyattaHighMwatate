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
      `<b>0${i + 1} / 03</b> &nbsp; ${title.toUpperCase()}`;
  }
  document.querySelector("#next").onclick = () => advance(1);
  document.querySelector("#prev").onclick = () => advance(-1);
}
const lightbox = document.querySelector("dialog");
if (lightbox) {
  document.querySelectorAll(".gallery button").forEach(
    (card) =>
      (card.onclick = () => {
        const img = card.querySelector("img");
        Object.assign(lightbox.querySelector("img"), {
          src: img.src,
          alt: img.alt,
        });
        lightbox.querySelector("p").textContent = img.alt;
        lightbox.showModal();
      }),
  );
  lightbox.querySelector("button").onclick = () => lightbox.close();
  lightbox.onclick = (e) => {
    if (e.target === lightbox) lightbox.close();
  };
}
const form = document.querySelector("#contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
  location.href = `mailto:Kenyattataita@gmail.com?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(body)}`;
});
