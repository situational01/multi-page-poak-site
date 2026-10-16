/* POAK: Force light mode at the start of every page navigation.
   Load this in <head> before styles and other theme scripts. */
(function () {
  document.documentElement.setAttribute("data-theme", "light");
  document.documentElement.classList.remove("dark-theme");
  try {
    localStorage.removeItem("poak_theme");
    localStorage.removeItem("poak-theme");
  } catch (e) {}
  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.remove("dark-theme");
    document.documentElement.setAttribute("data-theme", "light");
  });
})();
