(() => {
  const grid = document.getElementById('personal-library-grid');
  if (!grid) return;
  const search = document.getElementById('library-search');
  const sort = document.getElementById('library-sort');
  const count = document.getElementById('library-count');
  const stats = document.getElementById('library-stats');
  const empty = document.getElementById('library-empty');
  let books = [];

  const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const norm = v => String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  function cover(b){
    const title = esc(b.titulo), author = esc(b.autor || '');
    return `<div class="personal-book-cover"><div class="personal-book-fallback"><strong>${title}</strong><span>${author}</span></div>${b.portada ? `<img src="${esc(b.portada)}" alt="Portada de ${title}" loading="lazy" onerror="this.remove()">` : ''}</div>`;
  }

  function renderStats(){
    const authors = new Set(books.map(b => (b.autor || '').trim()).filter(Boolean));
    const editorials = new Set(books.map(b => (b.editorial || '').trim()).filter(Boolean));
    stats.innerHTML = `<article class="library-stat"><strong>${books.length}</strong><span>títulos físicos</span></article><article class="library-stat"><strong>${authors.size}</strong><span>autorías registradas</span></article><article class="library-stat"><strong>${editorials.size}</strong><span>editoriales registradas</span></article>`;
  }

  function getFiltered(){
    const q = norm(search?.value || '');
    let out = books.filter(b => !q || norm([b.titulo,b.autor,b.editorial,b.isbn].join(' ')).includes(q));
    const mode = sort?.value || 'title';
    out = [...out].sort((a,b) => {
      if (mode === 'author') return norm(a.autor).localeCompare(norm(b.autor),'es') || norm(a.titulo).localeCompare(norm(b.titulo),'es');
      if (mode === 'year-desc') return (Number(b.anio)||0) - (Number(a.anio)||0) || norm(a.titulo).localeCompare(norm(b.titulo),'es');
      return norm(a.titulo).localeCompare(norm(b.titulo),'es');
    });
    return out;
  }

  function render(){
    const visible = getFiltered();
    count.textContent = `${visible.length} de ${books.length} títulos`;
    empty.hidden = visible.length > 0;
    grid.hidden = visible.length === 0;
    grid.innerHTML = visible.map(b => {
      const meta = [b.editorial, b.anio, b.coleccion].filter(Boolean).map(esc).join(' · ');
      const isbn = b.isbn ? `<div class="personal-book-meta">ISBN ${esc(b.isbn)}</div>` : '';
      return `<article class="personal-book">${cover(b)}<h2>${esc(b.titulo)}</h2><div class="personal-book-author">${esc(b.autor || '')}</div>${meta ? `<div class="personal-book-meta">${meta}</div>` : ''}${isbn}</article>`;
    }).join('');
  }

  async function init(){
    try {
      const files = [
        'assets/data/biblioteca-jorge-01.json',
        'assets/data/biblioteca-jorge-02.json',
        'assets/data/biblioteca-jorge-03.json',
        'assets/data/biblioteca-jorge-04.json'
      ];
      const groups = await Promise.all(files.map(async file => {
        const r = await fetch(file);
        if (!r.ok) throw new Error(`${file}: ${r.statusText}`);
        return await r.json();
      }));
      books = groups.flat();
      renderStats(); render();
      search?.addEventListener('input', render);
      sort?.addEventListener('change', render);
    } catch (e) {
      console.error(e);
      grid.innerHTML = '<div class="loading-card">No se pudo cargar la biblioteca. Abre el proyecto con Live Server o desde GitHub Pages.</div>';
      stats.innerHTML = '';
    }
  }
  init();
})();
