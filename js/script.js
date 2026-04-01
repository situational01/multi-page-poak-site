// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // ===== SET CURRENT YEAR =====
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===== DARK THEME TOGGLE =====
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

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

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const bodyEl = document.body;

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      this.classList.toggle("active");
      navMenu.classList.toggle("active");

      if (navMenu.classList.contains("active")) {
        bodyEl.style.overflow = "hidden";
      } else {
        bodyEl.style.overflow = "";
      }
    });

    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        bodyEl.style.overflow = "";
      });
    });

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

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        bodyEl.style.overflow = "";
      }
    });

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
      if (window.innerWidth <= 991) {
        e.preventDefault();

        dropdowns.forEach((d) => {
          if (d !== dropdown) {
            d.classList.remove("active");
          }
        });

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

  // ===== TEAM MODAL FUNCTIONALITY =====
  const teamMembers = {
    luke: {
      name: "Luke Alela",
      title: "Executive Director",
      bio: "Horus Alela Ambasu is an Executive Director  with a strong background in project design, planning, fundraising, and proposal writing, as well as data analysis and impact assessment. He brings over seven years of experience working on community-based sustainable development projects, supporting impactful and evidence-driven programs. Passionate about sustainable development and community empowerment, Horus is committed to leveraging data and innovation to improve program impact and strengthen organizational performance.",
    },
    sheilla: {
      name: "Sheilla Muhindi",
      title: "Programs Director",
      bio: "Dedicated and impact-driven professional with a strong background in counselling psychology,  youth-focused programming, and psychosocial support, experienced in designing and implementing initiatives that improve well-being, including mental health programs, school-based interventions, and health outreach activities. Skilled in project coordination, stakeholder engagement, and facilitation, with a proven ability to lead teams and deliver results in resource-limited settings, while remaining passionate about empowering adolescents and vulnerable populations through counseling support, program monitoring, and community mobilization, and committed to creating sustainable, high-impact solutions within NGO and community-based environments.",
    },
    fidel: {
      name: "Fidel Maina",
      title: "Monitoring, Evaluation & Learning Lead",
      bio: "Fidel leads our monitoring, evaluation, and learning efforts. He ensures program effectiveness, data-driven decision making, and accountability. With expertise in results-based management, he helps POAK measure and improve its impact across all programs.",
    },
    marvin: {
      name: "Marvin Kabuka",
      title: "Field Programs Coordinator",
      bio: "Marvin coordinates field operations across POAK's program locations. He works directly with community partners, oversees volunteer teams, and ensures smooth implementation of our youth and women's empowerment initiatives. With extensive field experience, Marvin has trained over 500 young Kenyans in digital skills.",
    },
    samuel: {
      name: "Samuel Otia",
      title: "IT and Digital Marketing",
      bio: "Samuel manages our IT infrastructure and digital marketing efforts. He ensures our online presence is strong and secure, while also supporting our data management and communications strategies. With a background in IT and digital marketing, Samuel helps POAK reach a wider audience and engage supporters effectively.",
    },
  };

  const modal = document.getElementById("teamModal");
  const modalClose = document.querySelector(".modal-close");
  const modalImage = document.getElementById("modalImage");
  const modalName = document.getElementById("modalName");
  const modalTitle = document.getElementById("modalTitle");
  const modalBio = document.getElementById("modalBio");

  const teamCards = document.querySelectorAll(".team-card");

  teamCards.forEach((card) => {
    card.addEventListener("click", function () {
      const memberId = this.getAttribute("data-member");
      const member = teamMembers[memberId];

      if (member) {
        const imgSrc = this.querySelector(".team-image img").src;

        modalImage.src = imgSrc;
        modalName.textContent = member.name;
        modalTitle.textContent = member.title;
        modalBio.textContent = member.bio;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  console.log("POAK website loaded successfully!");
});
