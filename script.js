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

// Print the attached CV PDF (not the webpage)
const CV_PDF_URL = 'Dr_Amr_Ashour_CV.pdf';
async function printCV() {
  // NOTE: browsers block printing a 0x0 iframe, so we use a real-size
  // off-screen frame + a delay until the PDF plugin finishes rendering.
  try {
    const res = await fetch(CV_PDF_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('PDF not found: ' + res.status);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    let frame = document.getElementById('pdfPrintFrame');
    if (frame) frame.remove();
    frame = document.createElement('iframe');
    frame.id = 'pdfPrintFrame';
    frame.src = blobUrl;
    // Must have real dimensions but kept off-screen
    frame.style.position = 'fixed';
    frame.style.left = '-9999px';
    frame.style.top = '0';
    frame.style.width = '800px';
    frame.style.height = '600px';
    frame.style.border = '0';
    document.body.appendChild(frame);

    frame.onload = () => {
      setTimeout(() => {
        try {
          frame.contentWindow.focus();
          frame.contentWindow.print();
        } catch (err) {
          window.open(blobUrl, '_blank');
        }
      }, 900);
    };
    // Safety fallback if onload never fires (some PDF viewers)
    setTimeout(() => {
      if (!frame.dataset.printed) {
        try { frame.contentWindow.print(); frame.dataset.printed = '1'; } catch (e) { /* ignore */ }
      }
    }, 2500);
  } catch (err) {
    // Last resort: open the PDF itself in a new tab (user prints with Ctrl+P)
    window.open(CV_PDF_URL, '_blank');
  }
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
