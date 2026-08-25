// ===== Shared Footer =====
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-main">
        <div class="footer-brand">
          <a href="index.html" class="footer-brand-link">
            <img src="images/logo_POAK.png" alt="POAK - Poverty Africa Kenya" class="footer-logo">
          </a>
          <p class="footer-description">
            Fighting poverty across Kenya by empowering communities,
            expanding opportunities, and building sustainable pathways out of poverty.
          </p>
          <div class="footer-founded">
            <span class="footer-founded-icon"><i class="fas fa-calendar-alt"></i></span>
            <div>
              <small>Established</small>
              <strong>7th December 1997</strong>
            </div>
          </div>
        </div>

        <div class="footer-column">
          <h4>Our Programs</h4>
          <span class="footer-heading-line"></span>
          <ul class="footer-links">
            <li><a href="education-program.html"><i class="fas fa-chevron-right"></i> Education</a></li>
            <li><a href="community-empowerment-program.html"><i class="fas fa-chevron-right"></i> Community Empowerment</a></li>
            <li><a href="peer-program.html"><i class="fas fa-chevron-right"></i> Peer Program</a></li>
            <li><a href="mental-health-nutrition-program.html"><i class="fas fa-chevron-right"></i> Mental Health &amp; Nutrition</a></li>
            <li><a href="4k-clubs.html"><i class="fas fa-chevron-right"></i> 4K Clubs for Schools</a></li>
            <li><a href="4k-smart-farming.html"><i class="fas fa-chevron-right"></i> 4K Smart Farming</a></li>
            <li><a href="livestock-development.html"><i class="fas fa-chevron-right"></i> Livestock Development</a></li>
            <li><a href="climate-resilience.html"><i class="fas fa-chevron-right"></i> Climate Resilience</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>Contact Us</h4>
          <span class="footer-heading-line"></span>
          <div class="footer-contact-list">
            <a href="#" class="footer-contact-item">
              <span class="footer-contact-icon"><i class="fas fa-location-dot"></i></span>
              <span><small>Our Location</small> Nairobi, Kenya</span>
            </a>
            <a href="mailto:info@povertyafricakenya.co.ke" class="footer-contact-item">
              <span class="footer-contact-icon"><i class="fas fa-envelope"></i></span>
              <span><small>Email Us</small> info@povertyafricakenya.co.ke</span>
            </a>
            <a href="tel:0143709759" class="footer-contact-item">
              <span class="footer-contact-icon"><i class="fas fa-phone"></i></span>
              <span><small>Call Us</small> 0143709759</span>
            </a>
            <a href="tel:0777636674" class="footer-contact-item">
              <span class="footer-contact-icon"><i class="fas fa-mobile-screen-button"></i></span>
              <span><small>Mobile</small> 0777636674</span>
            </a>
          </div>
        </div>

        <div class="footer-newsletter-column">
          <div class="footer-newsletter-card">
            <span class="newsletter-icon"><i class="fas fa-paper-plane"></i></span>
            <h4>Stay Updated</h4>
            <p>
              Subscribe for our latest impact stories, community updates,
              and opportunities to support our work.
            </p>
            <form class="newsletter-compact" id="newsletterForm">
              <div class="newsletter-input-wrap">
                <i class="fas fa-envelope"></i>
                <input type="email" name="email" placeholder="Your email address" required aria-label="Email address">
              </div>
              <button type="submit" class="newsletter-submit">Subscribe</button>
            </form>
            <p class="form-message" id="newsletterMessage"></p>
            <small class="newsletter-note">We respect your inbox. No spam.</small>
          </div>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; <span id="currentYear"></span> POAK - Poverty Africa Kenya. All rights reserved.</p>
        </div>
        <div class="footer-bottom-links">
          <a href="about.html">About</a>
          <a href="impact.html">Impact</a>
          <a href="contact.html">Contact</a>
          <a href="donate.html" class="footer-donate-link">Donate</a>
        </div>
        <div class="footer-registration">
          <i class="fas fa-circle-check"></i>
          <span>Registered Nonprofit in Kenya</span>
        </div>
      </div>
    </div>`;
});

// ===== Animated Number Counter =====
function initCountUp() {
  // Select all elements that contain numeric stats (extend as needed)
  const statElements = document.querySelectorAll(
    '.impact-number, .impact-hero-number, .stat-number, .stat-number-large, .program-stats .stat-number, .blog-stats .stat-value, .stat-number-highlight'
  );

  if (!statElements.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Prevent multiple animations
          if (el.dataset.counted === 'true') return;
          el.dataset.counted = 'true';

          // Extract target number and suffix
          const originalText = el.textContent.trim();
          const match = originalText.match(/^([\d,]+)(.*)/); // captures number (with commas) and the rest
          if (!match) return;

          const numberStr = match[1].replace(/,/g, '');
          const suffix = match[2]; // e.g., "+", "%", " KSh", etc.
          const target = parseInt(numberStr, 10);

          if (isNaN(target)) return;

          animateValue(el, 0, target, 1500, suffix);
        }
      });
    },
    { threshold: 0.3 } // trigger when 30% of element is visible
  );

  statElements.forEach(el => observer.observe(el));
}

function animateValue(element, start, end, duration, suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current.toLocaleString() + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Start the counter observer after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCountUp();
});

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
          hamburger.classList.remove("active");''
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

// Same enhanced script as before but compact-friendly
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.podcast-section.compact .podcast-card');
  cards.forEach(card => {
    const audio = card.querySelector('.podcast-audio');
    if (!audio) return;

    const playBtn = card.querySelector('.play-pause-btn');
    const skipBack = card.querySelector('.skip-back-btn');
    const skipFwd = card.querySelector('.skip-forward-btn');
    const progressBar = card.querySelector('.progress-bar');
    const progressContainer = card.querySelector('.progress-bar-container');
    const timeCurrent = card.querySelector('.time-current');
    const timeDuration = card.querySelector('.time-duration');
    const volumeSlider = card.querySelector('.volume-slider');
    const volumeIcon = card.querySelector('.volume-icon');
    const speedSelect = card.querySelector('.playback-speed');
    const downloadLink = card.querySelector('.download-episode');

    function formatTime(sec) {
      if (isNaN(sec)) return '0:00';
      const mins = Math.floor(sec / 60);
      const secs = Math.floor(sec % 60);
      return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }

    audio.addEventListener('timeupdate', () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = percent + '%';
      timeCurrent.textContent = formatTime(audio.currentTime);
    });
    audio.addEventListener('loadedmetadata', () => {
      timeDuration.textContent = formatTime(audio.duration);
      if (downloadLink && audio.currentSrc) downloadLink.href = audio.currentSrc;
    });
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        document.querySelectorAll('.podcast-audio').forEach(other => {
          if (other !== audio && !other.paused) {
            other.pause();
            const otherBtn = other.closest('.podcast-card').querySelector('.play-pause-btn');
            if (otherBtn) otherBtn.innerHTML = '<i class="fas fa-play"></i>';
          }
        });
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
    if (skipBack) skipBack.addEventListener('click', () => { audio.currentTime = Math.max(0, audio.currentTime - 10); });
    if (skipFwd) skipFwd.addEventListener('click', () => { audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); });
    if (progressContainer) {
      progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
      });
    }
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
        if (audio.volume === 0) volumeIcon.className = 'fas fa-volume-off volume-icon';
        else if (audio.volume < 0.5) volumeIcon.className = 'fas fa-volume-down volume-icon';
        else volumeIcon.className = 'fas fa-volume-up volume-icon';
      });
    }
    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => { audio.playbackRate = parseFloat(e.target.value); });
    }
    audio.addEventListener('ended', () => {
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      progressBar.style.width = '0%';
      timeCurrent.textContent = '0:00';
    });
  });
});

// ========================================
// PARTNERS SCROLL - Duplicate items for seamless loop
// ========================================

(function() {
    const track = document.getElementById('partnersTrack');
    if (!track) return;
    
    // Clone all partner items and add them to the track
    const items = track.querySelectorAll('.partner-item');
    
    items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.className = 'partner-item-duplicate';
        track.appendChild(clone);
    });
    
    // Optional: Adjust animation duration based on number of items
    const totalItems = track.children.length;
    if (totalItems > 0) {
        // Speed up or slow down based on number of partners
        const duration = Math.max(15, totalItems * 3);
        track.style.animationDuration = duration + 's';
    }
})();

// ========================================
// POPUP MODAL - VIATU DRIVE
// ========================================

(function() {
    const overlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('popupClose');
    
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('viatuPopupSeen');
    
    // Show popup after 1 second (only if not seen this session)
    if (!hasSeenPopup) {
        setTimeout(function() {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 1000);
    }
    
    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        sessionStorage.setItem('viatuPopupSeen', 'true');
    }
    
    // Close on X button
    closeBtn.addEventListener('click', closePopup);
    
    // Close on clicking outside the poster
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePopup();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePopup();
        }
    });
})();