/* POAK: Restore the saved theme before styles load to prevent a light-mode flash.
   Include this in <head> before the stylesheets and the main script. */
(function () {
  let theme = "light";
  try {
    const saved = localStorage.getItem("poak_theme") || localStorage.getItem("poak-theme");
    if (saved === "dark" || saved === "light") theme = saved;
  } catch (e) {}

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark-theme", theme === "dark");
  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.toggle("dark-theme", theme === "dark");
  });
})();
