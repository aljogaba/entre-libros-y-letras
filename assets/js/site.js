
(() => {
  const page = document.body.dataset.page;
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];

  // Header and navigation
  const toggle = $('[data-menu-toggle]');
  const nav = $('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.site-nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('is-active');
  });
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  async function loadJson(file) {
    try {
      const response = await fetch(`assets/data/${file}`);
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (error) {
      console.error(`No se pudo cargar ${file}`, error);
      return null;
    }
  }

  function coverMarkup(book, eager=false) {
    const safeTitle = escapeHtml(book.title);
    const safeAuthor = escapeHtml(book.author);
    const loading = eager ? 'eager' : 'lazy';
    return `<div class="cover-frame">
      <div class="cover-fallback"><strong>${safeTitle}</strong><span>${safeAuthor}</span></div>
      ${book.cover ? `<img src="${book.cover}" alt="Portada de ${safeTitle}" loading="${loading}" onload="if(this.naturalWidth<20)this.remove()" onerror="this.remove()">` : ''}
    </div>`;
  }

  function escapeHtml(value='') {
    return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  async function renderCurrent() {
    const target = $('#current-reading');
    if (!target) return;
    const books = await loadJson('books.json');
    if (!books) return showLocalServerHint(target);
    const b = books.find(x => x.current) || books.at(-1);
    target.innerHTML = `<article class="current-card">
      ${coverMarkup(b,true)}
      <div class="current-copy">
        <span class="status-pill">${escapeHtml(b.status)}</span>
        <h3>${escapeHtml(b.title)}</h3>
        <p class="current-author">${escapeHtml(b.author)}</p>
        <p class="current-note">${escapeHtml(b.note)}</p>
        <a class="text-link" href="lecturas.html">Ver todas las lecturas <span>→</span></a>
      </div>
    </article>`;
  }

  async function renderNews() {
    const target = $('#news-grid');
    if (!target) return;
    const items = await loadJson('news.json');
    if (!items) return showLocalServerHint(target);
    target.innerHTML = items.map(n => `<article class="news-card">
      <div class="news-meta"><span>${escapeHtml(n.tag)}</span><time>${escapeHtml(n.date)}</time></div>
      <h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.text)}</p>
      <a href="${n.link}">Leer más →</a>
    </article>`).join('');
  }

  async function renderBooks() {
    const target = $('#books-grid');
    if (!target) return;
    const books = await loadJson('books.json');
    if (!books) return showLocalServerHint(target);
    target.innerHTML = books.map((b,i) => `<article class="book-card" data-status="${escapeHtml(b.status)}">
      ${coverMarkup(b,i<4)}
      <h3>${escapeHtml(b.title)}</h3>
      <div class="book-card-author">${escapeHtml(b.author)}</div>
      <div class="book-card-meta"><span>${escapeHtml(b.period)}</span><span>·</span><span>${escapeHtml(b.status)}</span></div>
      <p class="book-card-note">${escapeHtml(b.note)}</p>
    </article>`).join('');

    $$('[data-book-filter]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-book-filter]').forEach(x => x.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.bookFilter;
      $$('.book-card',target).forEach(card => card.hidden = filter !== 'all' && card.dataset.status !== filter);
    }));
  }

  async function renderGallery() {
    const target = $('#gallery-grid');
    if (!target) return;
    const items = await loadJson('gallery.json');
    if (!items) return showLocalServerHint(target);
    target.innerHTML = items.map(item => `<article class="gallery-card" tabindex="0" data-lightbox-trigger data-src="${item.src}" data-caption="${escapeHtml(item.title)} — ${escapeHtml(item.caption)}">
      <img src="${item.src}" alt="${escapeHtml(item.caption)}" loading="lazy" width="${item.width || 1200}" height="${item.height || 800}">
      <div class="gallery-caption"><small>${escapeHtml(item.date)} · ${escapeHtml(item.format)}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.caption)}</p></div>
    </article>`).join('');
    bindLightbox();
  }

  async function renderStickers() {
    const preview = $('#sticker-preview');
    const wall = $('#sticker-wall');
    if (!preview && !wall) return;
    const items = await loadJson('stickers.json');
    if (!items) {
      if(preview) showLocalServerHint(preview);
      if(wall) showLocalServerHint(wall);
      return;
    }
    if (preview) preview.innerHTML = items.slice(0,5).map(s => `<img src="${s.src}" alt="${escapeHtml(s.alt)}" loading="lazy">`).join('');
    if (wall) wall.innerHTML = items.map((s,i) => `<figure class="sticker-tile" style="--rotate:${[-2.2,1.7,-1.1,2.4,0.8][i%5]}deg"><img src="${s.src}" alt="${escapeHtml(s.alt)}" loading="lazy"></figure>`).join('');
  }

  async function renderTimeline() {
    const target = $('#timeline');
    if (!target) return;
    const items = await loadJson('timeline.json');
    if (!items) return showLocalServerHint(target);
    target.innerHTML = items.map(item => `<article class="timeline-item"><time class="timeline-date">${escapeHtml(item.date)}</time><span class="timeline-dot" aria-hidden="true"></span><div class="timeline-content"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div></article>`).join('');
  }

  function bindLightbox(){
    const box=$('[data-lightbox]'), img=$('[data-lightbox-image]'), cap=$('[data-lightbox-caption]');
    if(!box) return;
    const open = trigger => { img.src=trigger.dataset.src; img.alt=trigger.dataset.caption; cap.textContent=trigger.dataset.caption; box.hidden=false; box.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; };
    const close = () => { box.hidden=true; box.setAttribute('aria-hidden','true'); img.src=''; document.body.style.overflow=''; };
    $$('[data-lightbox-trigger]').forEach(t => { t.addEventListener('click',()=>open(t)); t.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(t)}}); });
    $('[data-lightbox-close]')?.addEventListener('click',close);
    box.addEventListener('click',e=>{if(e.target===box)close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!box.hidden)close()});
  }

  function showLocalServerHint(target){
    target.innerHTML='<div class="loading-card">No se pudieron cargar los datos. Abre el proyecto con Live Server o publícalo en GitHub Pages.</div>';
  }

  function scrollToCurrentHash() {
    if (!location.hash || location.hash === '#') return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { id = location.hash.slice(1); }
    const target = document.getElementById(id);
    if (!target) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
    }));
  }

  async function init() {
    // A cross-page hash can be positioned before the JSON gallery is rendered.
    // Start at the top, render all dynamic content, then place the target reliably.
    if (location.hash) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
    await Promise.all([
      renderCurrent(), renderNews(), renderBooks(), renderGallery(),
      renderStickers(), renderTimeline()
    ]);
    scrollToCurrentHash();
  }

  window.addEventListener('hashchange', scrollToCurrentHash);
  init();
})();
