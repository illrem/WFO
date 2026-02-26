// Main JS: load results and wire gallery lightbox
(function(){
  const yearEls = ['year','year2','year3','year4'];
  yearEls.forEach(id=>{const el=document.getElementById(id); if(el) el.textContent = new Date().getFullYear();});

  // fetch results data and populate pages
  async function loadResults(){
    try{
      const res = await fetch('data/results.json');
      const data = await res.json();
      populateRecent(data);
      populateResultsSelect(data);
    }catch(e){console.error('Could not load results.json',e)}
  }

  function populateRecent(data){
    const ul = document.getElementById('recent-comps');
    if(!ul) return;
    data.competitions.slice(0,4).forEach(c=>{
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = 'results.html#' + encodeURIComponent(c.id);
      a.textContent = `${c.name} — ${c.date}`;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  function populateResultsSelect(data){
    const sel = document.getElementById('comp-select');
    if(!sel) return;
    data.competitions.forEach(c=>{
      const opt = document.createElement('option');
      opt.value = c.id; opt.textContent = `${c.name} — ${c.date}`;
      sel.appendChild(opt);
    });
    function showById(id){
      const comp = data.competitions.find(x=>x.id===id) || data.competitions[0];
      renderCompetition(comp);
    }
    sel.addEventListener('change',e=> showById(e.target.value));
    // if URL has hash, select it
    const hash = decodeURIComponent(location.hash.replace('#',''));
    if(hash){
      const opt = Array.from(sel.options).find(o=>o.value===hash);
      if(opt) { sel.value = hash; }
    }
    showById(sel.value || sel.options[0].value);
  }

  function renderCompetition(comp){
    const area = document.getElementById('results-area');
    if(!area) return;
    area.innerHTML = '';
    const h = document.createElement('h3'); h.textContent = `${comp.name} — ${comp.date}`; area.appendChild(h);
    comp.events.forEach(ev=>{
      const section = document.createElement('section');
      const eh = document.createElement('h4'); eh.textContent = ev.name; section.appendChild(eh);
      const table = document.createElement('table');
      const thead = document.createElement('thead'); thead.innerHTML = '<tr><th>Place</th><th>Athlete</th><th>Result</th></tr>'; table.appendChild(thead);
      const tbody = document.createElement('tbody');
      ev.results.forEach(r=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${r.place}</td><td>${r.athlete}</td><td>${r.mark || ''}</td>`;
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      section.appendChild(table);
      area.appendChild(section);
    });
  }

  // gallery lightbox
  function setupGallery(){
    const items = document.querySelectorAll('.gallery-item');
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-image');
    const lbClose = document.getElementById('lb-close');
    if(!lb) return;
    items.forEach(img=>{
      img.addEventListener('click',()=>{
        lbImg.src = img.src; lbImg.alt = img.alt || '';
        lb.style.display = 'flex'; lb.setAttribute('aria-hidden','false');
      });
    });
    function close(){ lb.style.display='none'; lb.setAttribute('aria-hidden','true'); lbImg.src=''; }
    lbClose && lbClose.addEventListener('click', close);
    lb.addEventListener('click', e=>{ if(e.target===lb) close(); });
  }

  // init
  document.addEventListener('DOMContentLoaded', ()=>{
    loadResults();
    setupGallery();
  });

})();
