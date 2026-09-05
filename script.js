document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. REVEAL SITE
  ========================================= */

  window.revealSite = function () {
    const introOverlay = document.getElementById("intro-overlay");

    if (introOverlay) {
      introOverlay.classList.add("hidden");
    }
  };


  /* =========================================
     2. SCROLL PROGRESS
  ========================================= */

  const progressBar = document.getElementById("progress-bar");

  if (progressBar) {
    const updateScrollProgress = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();
  }


  /* =========================================
     3. TYPING EFFECT
  ========================================= */

  const typingText = document.getElementById("typing-text");

  const phrases = [
    "Chemical Engineer",
    "Web Developer",
    "Process Safety Enthusiast",
    "AI & Data Explorer",
    "NCC Air Wing Cadet",
    "Bilingual Poet"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    if (!typingText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }

  if (typingText) {
    type();
  }


  /* =========================================
     4. DARK MODE
  ========================================= */

  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      const isDarkMode = body.classList.contains("dark-mode");

      toggleButton.textContent = isDarkMode
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

      if (typingText) {
        typingText.classList.toggle("text-dark", !isDarkMode);
        typingText.classList.toggle("text-white", isDarkMode);
      }
    });
  }


  /* =========================================
     5. TIMELINE SCROLL REVEAL
  ========================================= */

  const timelineItems = document.querySelectorAll(".timeline-container");

  if ("IntersectionObserver" in window && timelineItems.length > 0) {
    const observerOptions = {
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    timelineItems.forEach((item) => {
      observer.observe(item);
    });
  }


/* =========================================
   6. PROJECT FILTERING
========================================= */

const filterBtns = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

if (filterBtns.length > 0 && projectItems.length > 0) {

  filterBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

      /* Update active button */
      filterBtns.forEach((button) => {
        button.classList.remove("active", "btn-primary");
        button.classList.add("btn-outline-primary");
      });

      btn.classList.remove("btn-outline-primary");
      btn.classList.add("active", "btn-primary");

      /* Selected category */
      const filterValue = btn.getAttribute("data-filter");

      /* Filter projects */
      projectItems.forEach((item) => {

        const itemCategory = item.getAttribute("data-category");

        const shouldShow =
          filterValue === "all" ||
          filterValue === itemCategory;

        if (shouldShow) {

          item.style.display = "";

          requestAnimationFrame(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          });

        } else {

          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";

          setTimeout(() => {
            item.style.display = "none";
          }, 300);

        }

      });

    });

  });

}

                            // Creative Works Filtering
  const creativeFilters = document.querySelectorAll(".creative-filter");
  const creativeItems = document.querySelectorAll(".creative-item");

  creativeFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active button
      creativeFilters.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      // Filter creative works
      creativeItems.forEach((item) => {
        const type = item.dataset.type;

        if (filter === "all" || type === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
