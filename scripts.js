function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

// Intersection Observer para animaciones
const sections = document.querySelectorAll('.animate-zoom-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Contador animado
const impactCounter = document.getElementById('impact-counter');
let count = 0;
const targetCount = 11000;
const section = document.getElementById('donar');
window.addEventListener('scroll', () => {
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  if (rect.top <= windowHeight && rect.bottom >= 0 && count < targetCount) {
    const increment = Math.ceil(targetCount / 100);
    const interval = setInterval(() => {
      count += increment;
      if (count >= targetCount) {
        count = targetCount;
        clearInterval(interval);
      }
      impactCounter.textContent = `${count.toLocaleString()}+`;
    }, 20);
  }
});


// Contador animado
const counters = document.querySelectorAll('.impact-number');
const speed = 200; // Velocidad de animación

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
      const current = +counter.innerText;
      const increment = target / speed;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + (counter.getAttribute('data-target') === '100' ? '%' : '+');
      }
    };
    updateCount();
  });
};

// Solo empieza cuando la sección es visible
const impactoSection = document.getElementById('impacto');
let started = false;
window.addEventListener('scroll', () => {
  const rect = impactoSection.getBoundingClientRect();
  if (!started && rect.top <= window.innerHeight && rect.bottom >= 0) {
    animateCounters();
    started = true;
  }
});
