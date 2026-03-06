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
// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===== DARK THEME TOGGLE =====
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Check for saved theme preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("poak-theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDark.matches)) {
    body.classList.add("dark-theme");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      localStorage.setItem(
        "poak-theme",
        body.classList.contains("dark-theme") ? "dark" : "light",
      );
    });
  }

  // ===== HAMBURGER MENU - FIXED FOR ALL PAGES =====
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const bodyEl = document.body;

  if (hamburger && navMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      this.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Prevent body scrolling when menu is open
      if (navMenu.classList.contains("active")) {
        bodyEl.style.overflow = "hidden";
      } else {
        bodyEl.style.overflow = "";
      }
    });

    // Close menu when clicking on any nav link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        bodyEl.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        if (
          !navMenu.contains(e.target) &&
          !hamburger.contains(e.target) &&
          navMenu.classList.contains("active")
        ) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          bodyEl.style.overflow = "";
        }
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        bodyEl.style.overflow = "";
      }
    });

    // Handle window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 991 && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        bodyEl.style.overflow = "";
      }
    });
  }

  // ===== MOBILE DROPDOWNS =====
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a");

    link.addEventListener("click", function (e) {
      // Only for mobile
      if (window.innerWidth <= 991) {
        e.preventDefault();

        // Close other dropdowns
        dropdowns.forEach((d) => {
          if (d !== dropdown) {
            d.classList.remove("active");
          }
        });

        // Toggle current dropdown
        dropdown.classList.toggle("active");
      }
    });
  });

  // ===== ACTIVE NAV LINK =====
  function setActiveNavLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === currentPage) {
        link.classList.add("active");
      }
    });

    // Handle dropdown parent active state
    const activeDropdownLink = document.querySelector(
      ".dropdown-menu a.active",
    );
    if (activeDropdownLink) {
      const parentDropdown = activeDropdownLink.closest(".dropdown");
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector("> a");
        if (parentLink) {
          parentLink.classList.add("active");
        }
      }
    }
  }

  setActiveNavLink();

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

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    });
  }

  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for subscribing! You will receive updates from POAK.");
      this.reset();
    });
  }

  // ===== ANIMATED COUNTERS =====
  const stats = document.querySelectorAll(
    ".impact-number, .impact-number-large",
  );
  let animated = false;

  function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 100);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, 20);
  }

  function checkStats() {
    const statsSection = document.querySelector(
      ".impact-grid, .impact-stats-large",
    );
    if (!statsSection || animated) return;

    const position = statsSection.getBoundingClientRect().top;
    const screen = window.innerHeight / 1.3;

    if (position < screen) {
      stats.forEach((stat) => {
        const text = stat.textContent.replace(/[^0-9]/g, "");
        const target = parseInt(text);
        if (!isNaN(target)) {
          animateCounter(stat, target);
        }
      });
      animated = true;
    }
  }

  window.addEventListener("scroll", checkStats);
  checkStats();

  // ===== CATEGORY FILTERS =====
  const categoryBtns = document.querySelectorAll(".category-btn");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      categoryBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  console.log("POAK website loaded - Mobile navigation fixed!");
});
