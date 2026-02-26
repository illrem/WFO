document.addEventListener('DOMContentLoaded', async function () {
  let images = [];
  try {
    const res = await fetch('/assets/images_index.json');
    images = await res.json();
  } catch (e) {
    images = [];
    console.warn('Could not load images index', e);
  }

  const rows = document.querySelectorAll('.competition-row');
  rows.forEach(row => {
    const dateStr = row.dataset.eventDate || '';
    const parts = dateStr.split('-');
    const year = parts[0];
    const month = parts[1] || '01';
    const monthNum = parseInt(month, 10);
    const quarter = Math.floor((monthNum - 1) / 3) + 1;
    const qMonths = [];
    for (let m = (quarter - 1) * 3 + 1; m <= quarter * 3; m++) {
      qMonths.push(String(m).padStart(2, '0'));
    }

    const candidates = images.filter(img => img.year === year && qMonths.indexOf(img.month) !== -1);
    let chosen = null;
    if (candidates.length) {
      chosen = candidates[Math.floor(Math.random() * candidates.length)];
    } else if (images.length) {
      chosen = images[Math.floor(Math.random() * images.length)];
    }
    if (chosen) {
      const imgEl = row.querySelector('.event-photo');
      if (imgEl) imgEl.src = chosen.path;
    }
  });

  // Toggle details
  document.querySelectorAll('.toggle-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (details) {
        if (expanded) { details.hidden = true; btn.textContent = 'Show details'; }
        else { details.hidden = false; btn.textContent = 'Hide details'; }
      }
    });
  });
});
