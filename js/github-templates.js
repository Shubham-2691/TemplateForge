/* =========================================================
   GITHUB TEMPLATE LIBRARY
   ========================================================= */
const GITHUB_REPO = { owner: "learning-zone", repo: "website-templates", branch: "master", pagesBase: "https://learning-zone.github.io/website-templates/", apiBase: "https://api.github.com/repos/learning-zone/website-templates" };
let githubTemplates = []; let githubTree = null; let githubLoaded = false; let githubVisible = 24;

function githubSlugTitle(slug) { return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, m => m.toUpperCase()); }
function githubCategory(slug) {
  const x = slug.toLowerCase();
  if (/restaurant|coffee|food|eat|bestro/.test(x)) return "Food";
  if (/photo|photography|portfolio|resume|personal|john|johndoe|iam-|my-portfolio|prosimii|scenic/.test(x)) return "Creative";
  if (/admin|dashboard|sb-admin|matrix|hybrid|insight/.test(x)) return "Technology";
  if (/education|school|learn|mentor|b-school/.test(x)) return "Education";
  if (/medical|doctor|hospital|health/.test(x)) return "Health";
  if (/hotel|travel|tour|resort/.test(x)) return "Travel";
  if (/fitness|gym|yoga/.test(x)) return "Lifestyle";
  if (/real-estate|interior|home-/.test(x)) return "Business";
  if (/music|artist|creative|design|agency|magazine|blog|news/.test(x)) return "Creative";
  return "Business";
}
function githubDescription(t) { return `${t.category} website template from the Learning Zone HTML5 template collection.`; }

async function loadGithubTemplates() {
  if (githubLoaded) return githubTemplates;
  const cacheKey = "templateforge_github_tree_v1";
  try {
    let tree = JSON.parse(localStorage.getItem(cacheKey) || "null");
    if (!tree || !Array.isArray(tree.tree)) {
      const r = await fetch(`${GITHUB_REPO.apiBase}/git/trees/${GITHUB_REPO.branch}?recursive=1`, { headers: { Accept: "application/vnd.github+json" } });
      if (!r.ok) throw new Error(`GitHub API ${r.status}`);
      tree = await r.json();
      try { localStorage.setItem(cacheKey, JSON.stringify(tree)); } catch (e) { }
    }
    githubTree = tree.tree || [];
    const folders = new Map();
    for (const item of githubTree) {
      if (item.type !== "blob") continue;
      const parts = item.path.split("/");
      if (parts.length < 2 || parts[parts.length - 1].toLowerCase() !== "index.html") continue;
      const folder = parts[0];
      if (folder === "assets" || folder.startsWith(".")) continue;
      folders.set(folder, true);
    }
    githubTemplates = [...folders.keys()].sort((a, b) => a.localeCompare(b)).map((slug, i) => ({
      id: `gh-${i + 1}`, slug, name: githubSlugTitle(slug), category: githubCategory(slug), type: "HTML5 Website Template",
      desc: githubDescription({ category: githubCategory(slug) }), live: `${GITHUB_REPO.pagesBase}${encodeURIComponent(slug)}/`,
      github: `https://github.com/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/tree/${GITHUB_REPO.branch}/${encodeURIComponent(slug)}`
    }));
    githubLoaded = true;
    return githubTemplates;
  } catch (err) {
    console.error("Unable to load GitHub templates", err);
    return [];
  }
}

function githubPreviewMarkup(t) {
  const accent = ({ Technology: "#6366f1", Creative: "#ec4899", Food: "#d97706", Education: "#2563eb", Health: "#0ea5e9", Travel: "#14b8a6", Lifestyle: "#16a34a", Business: "#475569", Fashion: "#111827", Personal: "#7c3aed", Nonprofit: "#16a34a" })[t.category] || "#635bff";
  return `<div class="github-preview-art" style="--gh-accent:${accent}"><div class="gh-nav"><span class="gh-brand">${escapeHTML(t.name.split(" ")[0])}</span><span></span><span></span><span></span></div><div class="gh-hero"><div class="gh-kicker">${escapeHTML(t.category)}</div><div class="gh-title">${escapeHTML(t.name)}</div><div class="gh-copy">A modern ${escapeHTML(t.type.toLowerCase())} built for a strong first impression.</div><div class="gh-button"></div></div><div class="gh-blocks"><i></i><i></i><i></i></div></div>`;
}

function githubCard(t, index) {
  return `<article class="github-card"><div class="github-preview"><div class="github-browser"><div class="github-browser-top"><i></i><i></i><i></i><span class="github-browser-url">${escapeHTML(t.slug)}</span></div>${githubPreviewMarkup(t)}</div></div><div class="github-card-info"><div class="github-card-number">GITHUB TEMPLATE ${String(index + 1).padStart(3, '0')}</div><h3>${escapeHTML(t.name)}</h3><p>${escapeHTML(t.desc)}</p><div class="github-tags"><span class="github-tag">${escapeHTML(t.category)}</span><span class="github-tag">HTML5</span><span class="github-tag">Fast Preview</span></div><div class="github-actions"><button class="btn btn-primary" onclick="window.open('${t.live}','_blank','noopener')">Live Preview ↗</button><button class="btn btn-light" onclick="downloadGithubTemplate('${encodeURIComponent(t.slug)}')">⬇ Download ZIP</button><button class="btn btn-light" onclick="window.open('${t.github}','_blank','noopener')">GitHub ↗</button></div></div></article>`;
}

async function downloadGithubTemplate(encodedSlug) {
  const slug = decodeURIComponent(encodedSlug);
  const t = githubTemplates.find(x => x.slug === slug);
  if (!t) return showToast("Template not found");
  try {
    showToast("Preparing GitHub template ZIP…");
    if (!window.JSZip) throw new Error("JSZip unavailable");
    if (!githubTree) await loadGithubTemplates();
    const prefix = `${slug}/`;
    const files = githubTree.filter(x => x.type === "blob" && x.path.startsWith(prefix));
    if (!files.length) throw new Error("No files found");
    const zip = new JSZip();
    let done = 0;
    for (const f of files) {
      const url = `https://raw.githubusercontent.com/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/${GITHUB_REPO.branch}/${f.path.split('/').map(encodeURIComponent).join('/')}`;
      const r = await fetch(url);
      zip.file(f.path.slice(prefix.length), await r.blob());
      done++;
      if (done % 8 === 0) showToast(`Adding files… ${done}/${files.length}`);
    }
    const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${slug}.zip`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    showToast("ZIP downloaded successfully!");
  } catch (err) {
    console.error(err); showToast("GitHub ZIP download failed");
  }
}

async function renderGithubLibrary(filter = "All", search = "") {
  const mount = document.getElementById("githubLibraryMount");
  if (!mount) return;

  // DIRECTLY LOAD TEMPLATES: Force the shouldLoad flag to true
  const shouldLoad = true;

  mount.innerHTML = `<div class="github-library-head"><div class="github-status"><span class="pulse"></span><span id="githubStatusText">Loading templates…</span></div></div><div id="githubLibraryBody"><div class="github-grid"><div style="grid-column:1/-1;text-align:center;padding:50px;color:#667085">Loading template library…</div></div></div><div class="github-loadmore" id="githubLoadMore"></div>`;

  const list = await loadGithubTemplates();
  const q = search.toLowerCase().trim();
  const filtered = list.filter(t => {
    const cat = filter === "All" || filter === "GitHub" || t.category === filter;
    const text = `${t.name}${t.slug} ${t.category}${t.type}`.toLowerCase();
    return cat && (!q || text.includes(q));
  });
  const visible = filtered.slice(0, githubVisible);
  document.getElementById("githubStatusText").textContent = `${filtered.length} templates match`;
  document.getElementById("githubLibraryBody").innerHTML = visible.length ? `<div class="github-grid">${visible.map((t, i) => githubCard(t, i)).join("")}</div>` : `<div class="github-grid"><div style="grid-column:1/-1;text-align:center;padding:50px;color:#667085">No GitHub templates match your search.</div></div>`;
  document.getElementById("githubLoadMore").innerHTML = visible.length < filtered.length ? `<button class="btn btn-dark" onclick="githubVisible+=24;renderGithubLibrary('${filter}','${escapeHTML(search).replace(/'/g, "\\'")}')">Load More Templates</button>` : "";
}

