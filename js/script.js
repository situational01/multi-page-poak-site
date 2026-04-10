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
        body.classList.contains("dark-theme") ? "dark" : "light"
      );
    });
  }

  // ===== HAMBURGER MENU & MOBILE DROPDOWNS (FIXED) =====
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const bodyEl = document.body;

  if (hamburger && navMenu) {
    // Toggle menu open/close
    hamburger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
      bodyEl.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    });

    // Handle clicks on all nav links
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const parentLi = this.closest("li");
        const isDropdownToggle = parentLi && parentLi.classList.contains("dropdown");

        // If it's a dropdown toggle (e.g., "Programs"), do NOT close the menu
        if (isDropdownToggle) {
          if (window.innerWidth <= 991) {
            e.preventDefault(); // prevent navigation

            // Toggle the clicked dropdown
            parentLi.classList.toggle("active");

            // Optional: close other dropdowns for cleaner UX
            const allDropdowns = navMenu.querySelectorAll(".dropdown");
            allDropdowns.forEach((dd) => {
              if (dd !== parentLi) {
                dd.classList.remove("active");
              }
            });
          }
          // On desktop, allow normal hover behavior
          return;
        }

        // For regular links (Home, About, etc.), close the mobile menu
        if (window.innerWidth <= 991) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          bodyEl.style.overflow = "";
        }
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

    // Close with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        bodyEl.style.overflow = "";
      }
    });

    // Reset on window resize (when crossing breakpoint)
    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) {
        if (navMenu.classList.contains("active")) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          bodyEl.style.overflow = "";
        }
        // Remove any active dropdown classes
        document.querySelectorAll(".dropdown.active").forEach((dd) => {
          dd.classList.remove("active");
        });
      }
    });
  }

  // ===== ACTIVE NAV LINK =====
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === currentPage) {
        link.classList.add("active");
      }
    });

    const activeDropdownLink = document.querySelector(".dropdown-menu a.active");
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

  // ===== TEAM MODAL FUNCTIONALITY =====
  const teamMembers = {
    luke: {
      name: "Luke Alela",
      title: "Executive Director",
      bio: "Horus Alela Ambasu is an Executive Director with a strong background in project design, planning, fundraising, and proposal writing, as well as data analysis and impact assessment. He brings over seven years of experience working on community-based sustainable development projects, supporting impactful and evidence-driven programs. Passionate about sustainable development and community empowerment, Horus is committed to leveraging data and innovation to improve program impact and strengthen organizational performance.",
    },
    sheilla: {
      name: "Sheilla Muhindi",
      title: "Programs Director",
      bio: "Dedicated and impact-driven professional with a strong background in counselling psychology, youth-focused programming, and psychosocial support, experienced in designing and implementing initiatives that improve well-being, including mental health programs, school-based interventions, and health outreach activities. Skilled in project coordination, stakeholder engagement, and facilitation, with a proven ability to lead teams and deliver results in resource-limited settings, while remaining passionate about empowering adolescents and vulnerable populations through counseling support, program monitoring, and community mobilization, and committed to creating sustainable, high-impact solutions within NGO and community-based environments.",
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

// ===== NEWSLETTER SUBSCRIPTION (Google Sheets Integration) =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletterForm');
    const messageEl = document.getElementById('newsletterMessage');
    
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxkTC3rruLZFcHGEW0lP7KP3QcMLgLA4CVM3ufmyYJXHrIwXqp_h3yBMI-qeu00zDRaaw/exec';
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showMessage('Please enter your email address.', 'error');
                return;
            }
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            })
            .then(() => {
                showMessage('Thank you! You are now subscribed.', 'success');
                emailInput.value = '';
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Something went wrong. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
    
    function showMessage(text, type) {
        messageEl.textContent = text;
        messageEl.className = 'form-message ' + type;
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});