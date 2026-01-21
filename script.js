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
  "Learner",
  "NCC Cadet",
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
        toggleButton.classList.replace(
          "btn-outline-dark",
          "btn-outline-light"
        );
        if(typingText) typingText.classList.replace("text-dark", "text-white");
      } else {
        toggleButton.textContent = "🌙 Dark Mode";
        toggleButton.classList.replace(
          "btn-outline-light",
          "btn-outline-dark"
        );
        if(typingText) typingText.classList.replace("text-white", "text-dark");
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
