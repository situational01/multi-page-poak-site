document.addEventListener("DOMContentLoaded", function () {
  // Set current year
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // ===== MOBILE DROPDOWNS =====
  if (window.innerWidth <= 991) {
    document.querySelectorAll(".dropdown > a").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const dropdown = this.parentElement;
        dropdown.classList.toggle("active");
      });
    });
  }

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // ===== SCROLL TO TOP =====
  const scrollTop = document.getElementById("scrollTop");
  if (scrollTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTop.classList.add("show");
      } else {
        scrollTop.classList.remove("show");
      }
    });
    scrollTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
