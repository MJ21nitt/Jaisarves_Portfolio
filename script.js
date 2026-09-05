// 1. REVEAL SITE
function revealSite() {
  document.getElementById("intro-overlay").classList.add("hidden");
}

// 2. SCROLL PROGRESS
window.onscroll = function () {
  let winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
};

// 3. TYPING EFFECT
const textElement = document.getElementById("typing-text");
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
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentPhrase.substring(0, charIndex + 1);
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
document.addEventListener("DOMContentLoaded", type);

// 4. DARK MODE TOGGLE
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const typingText = document.getElementById("typing-text");

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      toggleButton.textContent = "☀️ Light Mode";

      if (typingText) {
        typingText.classList.replace("text-dark", "text-white");
      }
    } else {
      toggleButton.textContent = "🌙 Dark Mode";

      if (typingText) {
        typingText.classList.replace("text-white", "text-dark");
      }
    }
  });
}
// 5. TIMELINE SCROLL REVEAL (INTERSECTION OBSERVER)
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    }
  });
}, observerOptions);

document
  .querySelectorAll(".timeline-container")
  .forEach((el) => observer.observe(el));

// PROJECT FILTERING LOGIC
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Manage Button Styles (Remove active state from all, add to clicked)
        filterBtns.forEach(button => {
            button.classList.remove('active', 'btn-primary');
            button.classList.add('btn-outline-primary');
        });
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('active', 'btn-primary');

        // 2. Get the category to filter by
        const filterValue = btn.getAttribute('data-filter');

        // 3. Show or Hide the cards based on category
        projectItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === itemCategory) {
                item.style.display = 'block';
                // Optional: Add a slight delay for a smoother fade-in effect
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300); // Wait for fade out to finish before hiding
            }
        });
    });
});
