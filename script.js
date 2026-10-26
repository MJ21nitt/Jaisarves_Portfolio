// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progress-bar').style.width = scrolled + '%';
});

// Intro Overlay Dismissal
document.getElementById('get-to-know-btn').addEventListener('click', () => {
  const overlay = document.getElementById('intro-overlay');
  overlay.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 600);
});

// Dark/Light Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '🌙 Dark Mode';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Light Mode';
  }
});

// Typing Effect for Hero Subtitle
const words = ["Chemical Engineer", "Full-Stack Developer", "Process Designer", "Data Analyst"];
let i = 0;
function typingEffect() {
  let word = words[i].split("");
  var loopTyping = function() {
    if (word.length > 0) {
      document.getElementById('typing-text').textContent += word.shift();
    } else {
      setTimeout(deletingEffect, 2000);
      return false;
    }
    setTimeout(loopTyping, 100);
  };
  loopTyping();
}
function deletingEffect() {
  let word = words[i].split("");
  var loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      document.getElementById('typing-text').textContent = word.join("");
    } else {
      i = (words.length > (i + 1)) ? i + 1 : 0;
      setTimeout(typingEffect, 500);
      return false;
    }
    setTimeout(loopDeleting, 50);
  };
  loopDeleting();
}
typingEffect();

// Project Filtering Logic
const projectFilterBtns = document.querySelectorAll('#projects [data-filter]');
projectFilterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const filter = e.target.getAttribute('data-filter');
    if(!filter) return;
    
    e.target.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    const items = document.querySelectorAll('#project-grid .project-item');
    items.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Creative Works Filtering Logic
const creativeFilterBtns = document.querySelectorAll('#creative-works [data-filter]');
creativeFilterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const filter = e.target.getAttribute('data-filter');
    if(!filter) return;
    
    e.target.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    const items = document.querySelectorAll('#creative-work-grid .creative-item');
    items.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-type') === filter) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
