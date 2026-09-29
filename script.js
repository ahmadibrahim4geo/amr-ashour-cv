// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Progress bar + navbar shadow
const bar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  bar.style.width = pct + '%';
}, { passive: true });

// Mobile menu
const burger = document.getElementById('hamburger');
const links = document.getElementById('navLinks');
burger.addEventListener('click', () => links.classList.toggle('show'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('show')));

// Theme toggle (dark / light)
const toggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('aa-theme');
if (saved) document.documentElement.setAttribute('data-theme', saved);
toggle.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? '' : 'dark';
  if (cur) document.documentElement.setAttribute('data-theme', cur);
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('aa-theme', cur);
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animated counters
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur;
    }, 40);
    counterIO.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

// Skill filters
document.querySelectorAll('#skillFilters .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#skillFilters .chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('#skillsGrid .skill').forEach(s => {
      s.classList.toggle('hide', f !== 'all' && s.dataset.cat !== f);
    });
  });
});

// Open the CV PDF in a new tab and best-effort trigger its print dialog.
// NOTE: browsers do NOT allow a page to silently print a PDF plugin (iframe
// print / fetch-blob print are blocked), so opening the PDF itself is the
// only reliable cross-browser behavior. The viewer has its own Print button.
const CV_PDF_URL = 'Dr_Amr_Ashour_CV.pdf';
function printCV() {
  // Must run synchronously in the click handler or popup blockers stop it.
  const w = window.open(CV_PDF_URL, '_blank', 'noopener');
  if (!w) return true; // blocked -> let the anchor href navigate normally
  try {
    w.addEventListener('load', () => {
      setTimeout(() => { try { w.print(); } catch (e) { /* viewer handles it */ } }, 1200);
    });
  } catch (e) { /* cross-origin viewer: user prints with Ctrl+P */ }
  return false; // we already opened it; stop anchor navigation
}

// Contact form -> mailto
function sendMail(e) {
  e.preventDefault();
  const n = document.getElementById('fName').value;
  const em = document.getElementById('fEmail').value;
  const m = document.getElementById('fMsg').value;
  const subject = encodeURIComponent('Website inquiry from ' + n);
  const body = encodeURIComponent(`Name: ${n}\nEmail: ${em}\n\n${m}`);
  window.location.href = `mailto:amr.ashour@azhar.edu.eg?subject=${subject}&body=${body}`;
  return false;
}
