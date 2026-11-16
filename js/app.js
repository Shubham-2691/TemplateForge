/* =========================================================
   TEMPLATE DATABASE (Built-in Templates Removed)
   ========================================================= */
const templates = [];

/* =========================================================
   HELPERS
   ========================================================= */
const app = document.getElementById("app");
const toast = document.getElementById("toast");

function showToast(text = "Done") {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function findTemplate(id) {
  return templates.find(t => t.id === Number(id)) || templates[0];
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

/* =========================================================
   GALLERY VARIABLES
   ========================================================= */
const categories = [
  "All", "Business", "Creative", "Technology", "Health", "Food", "Travel",
  "Fashion", "Personal", "Education", "Lifestyle", "Nonprofit"
];

function galleryCard(t) {
  return `
  <article class="template-card">
    <div class="card-preview"
      style="--preview-bg:${t.accent2};
      --preview-surface:${t.category === "Technology" ? "#101827" : "#ffffff"};
      --preview-accent:${t.accent}">
      <div class="mock-browser">
        <div class="mock-top">
          <i class="dot"></i><i class="dot"></i><i class="dot"></i>
        </div>
        <div class="mock-body">
          <div class="mock-line small"></div>
          <div class="mock-line large"></div>
          <div class="mock-line medium"></div>
          <div class="mock-grid">
            <div class="mock-box"></div><div class="mock-box"></div><div class="mock-box"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-info">
      <div class="card-number">TEMPLATE ${String(t.id).padStart(2, "0")}</div>
      <h3>${escapeHTML(t.name)}</h3>
      <p>${escapeHTML(t.desc)}</p>
      <div class="tags">
        <span class="tag">${escapeHTML(t.type)}</span>
        <span class="tag">${escapeHTML(t.category)}</span>
      </div>
      <div class="card-buttons">
        <button class="btn btn-primary" onclick="openTemplate(${t.id},'home')">Preview</button>
        <button class="btn btn-light" onclick="showPages(${t.id})">Pages</button>
      </div>
    </div>
  </article>`;
}

/* =========================================================
   MAIN RENDERING LOGIC (WITH TENOR GIF NEON HERO ART)
   ========================================================= */
async function renderGallery(filter = "All", search = "") {
  app.innerHTML = `
  <div class="gallery-app">
    <header class="topbar">
      <div class="topbar-inner">
        <div class="logo">Template<span>Forge</span></div>
        <div class="search">
          <input id="gallerySearch" placeholder="Search templates…" value="${escapeHTML(search)}" aria-label="Search templates">
        </div>
        <div class="header-actions">
          <button class="btn btn-dark" onclick="openGenerator()">Prompt Generator</button>
        </div>
      </div>
    </header>
    
    <section class="hero-gallery" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; position: relative;">
      <div class="hero-content">
        <div class="eyebrow">170+ HTML5 templates</div>
        <h1>Build something <span>different.</span></h1>
        <p>Explore the public Learning Zone HTML5 template library with live previews and individual ZIP downloads.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="openGenerator()">Generate AI Prompt</button>
        </div>
      </div>
      
      <div class="hero-neon-art" style="display: flex; justify-content: center; align-items: center; height: 100%;">
         <img src="https://wallpapercave.com/wp/wp2027225.png" class="neon-jolly-roger-gif" alt="Neon Jolly Roger">
      </div>
    </section>
    
    <div class="filterbar">
      ${categories.map(c => `<button class="filter ${c === filter ? "active" : ""}" onclick="renderGallery('${c}',document.getElementById('gallerySearch')?.value||'')">${c}</button>`).join("")}
    </div>
    
    <section class="github-library" id="githubLibraryMount"></section>
  </div>`;

  const input = document.getElementById('gallerySearch');
  if (input) {
    input.addEventListener('input', e => {
      githubVisible = 24;
      renderGallery(filter, e.target.value);
      setTimeout(() => {
        const currentInput = document.getElementById("gallerySearch");
        if (currentInput) {
          currentInput.focus();
          currentInput.setSelectionRange(currentInput.value.length, currentInput.value.length);
        }
      }, 0);
    });
  }
  
  await renderGithubLibrary(filter, search);
}

