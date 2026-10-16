/* POAK About: accessible auto-advancing Journey milestones */
document.addEventListener("DOMContentLoaded", () => {
  const showcase = document.querySelector(".journey-showcase");
  if (!showcase) return;
  const slides = [...showcase.querySelectorAll(".journey-slide")];
  const count = showcase.querySelector(".journey-count");
  const prev = showcase.querySelector(".journey-prev");
  const next = showcase.querySelector(".journey-next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let interval = null;
  const delay = 5500;
  function show(target) {
    index = (target + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.querySelectorAll("a, button").forEach(el => { el.tabIndex = active ? 0 : -1; });
    });
    count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  }
  function stop() { if (interval) clearInterval(interval); interval = null; }
  function start() { stop(); if (!reduceMotion.matches && !document.hidden && slides.length > 1) interval = setInterval(() => show(index + 1), delay); }
  prev.addEventListener("click", () => {show(index - 1);start();});
  next.addEventListener("click", () => {show(index + 1);start();});
  showcase.addEventListener("mouseenter", stop);
  showcase.addEventListener("mouseleave", start);
  showcase.addEventListener("focusin", stop);
  showcase.addEventListener("focusout", event => { if (!showcase.contains(event.relatedTarget)) start(); });
  document.addEventListener("visibilitychange", start);
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", start);
  show(0);start();
});
