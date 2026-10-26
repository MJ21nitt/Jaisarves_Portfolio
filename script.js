 <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
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

      // Simple Typing Effect for Hero Subtitle
      const words = ["Chemical Engineer", "Full-Stack Developer", "Process Designer", "Data Analyst"];
      let i = 0;
      let timer;
      function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
          if (word.length > 0) {
            document.getElementById('typing-text').textContent += word.shift();
          } else {
            setTimeout(deletingEffect, 2000);
            return false;
          }
          timer = setTimeout(loopTyping, 100);
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
            if (words.length > (i + 1)) {
              i++;
            } else {
              i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
          }
          timer = setTimeout(loopDeleting, 50);
        };
        loopDeleting();
      }
      typingEffect();

      // Project & Creative Filtering
      const filterBtns = document.querySelectorAll('.filter-btn, [data-filter]');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const filter = e.target.getAttribute('data-filter');
          if(!filter) return;
          
          // update active states in the same parent group
          e.target.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');

          const items = document.querySelectorAll('.project-item');
          items.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    </script>
