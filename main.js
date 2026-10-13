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

/* =========================================================
   PAGE DATA FOR TEMPLATES
   ========================================================= */
const pageNames = ["home", "about", "services", "portfolio", "contact"];

function pageTitle(page, t) {
  if (page === "home") return t.hero;
  if (page === "about") return `The story behind ${t.name}.`;
  if (page === "services") return `Solutions designed around ${t.type.toLowerCase()}.`;
  if (page === "portfolio") return `Selected work and projects.`;
  return `Let's create something meaningful.`;
}

function pageIntro(page, t) {
  if (page === "home") return t.desc;
  if (page === "about") return `${t.name} is a purpose-driven${t.type.toLowerCase()} created around thoughtful ideas, strong execution and memorable experiences.`;
  if (page === "services") return `Explore our carefully structured services, process and specialist capabilities.`;
  if (page === "portfolio") return `A selection of projects, experiments and stories demonstrating the character of ${t.name}.`;
  return `Have a project, question or idea? We'd love to hear from you.`;
}

function backToGallery() {
  document.body.style.setProperty("--accent", "#635bff");
  document.body.style.setProperty("--accent2", "#22c55e");
  renderGallery();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   DOWNLOAD TEMPLATE AS ZIP
   ========================================================= */
async function downloadTemplate(id) {
  const t = findTemplate(id);
  if(!t) return;
  try {
    showToast("Preparing ZIP...");
    const html = createDownloadHTML(t);
    const zip = new JSZip();
    zip.file("index.html", html);
    const readme = `====================================================\n${t.name}\n====================================================\nTemplateForge Website Template\nTemplate Name:\n${t.name}\nTemplate Type:\n${t.type}\nCategory:\n${t.category}\nDescription:\n${t.desc}\nPages:\n${t.pages}\n====================================================\nHOW TO USE\n====================================================\n1. Extract this ZIP file.\n2. Open index.html in your browser.\n3. The website will run directly.\n====================================================\nFILES\n====================================================\nindex.html\nREADME.txt\n====================================================\nGenerated by TemplateForge\n====================================================`;
    zip.file("README.txt", readme);
    const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 9 } });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-\vert{}-$/g, "")}-template.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => { URL.revokeObjectURL(url); }, 1500);
    showToast("ZIP downloaded successfully!");
  } catch (error) {
    console.error("ZIP download error:", error);
    showToast("Failed to create ZIP");
  }
}

function createDownloadHTML(t) {
  const pageNamesLocal = [
    ["home", "Home"], ["about", "About"], ["services", "Services"], ["portfolio", "Work"], ["contact", "Contact"]
  ];
  const darkModes = [9, 18, 19, 28, 33, 39, 44, 50];
  const bg = darkModes.includes(t.mode) ? "#0d0d0d" : "#ffffff";
  const text = darkModes.includes(t.mode) ? "#eeeeee" : "#171923";
  const surface = darkModes.includes(t.mode) ? "#151515" : "#f5f6fa";
  const pageHTML = downloadHomeHTML(t);

  const css = `
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;font-family:Inter,Arial,sans-serif;background:${bg};color:${text};}
    button,input,select,textarea{font:inherit;}
    button{cursor:pointer;}
    a{text-decoration:none;color:inherit;}
    :root{--accent:${t.accent};--accent2:${t.accent2};--bg:${bg};--surface:${surface};--text:${text};--muted:#667085;--border:${darkModes.includes(t.mode) ? "#333" : "#e5e7eb"};}
    .nav{position:sticky;top:0;z-index:100;background:${bg};border-bottom:1px solid var(--border);padding:16px 5%;display:flex;align-items:center;justify-content:space-between;gap:20px;}
    .logo{font-size:22px;font-weight:900;}
    .logo span{color:var(--accent);}
    .links{display:flex;gap:8px;flex-wrap:wrap;}
    .links button{border:0;background:transparent;color:var(--muted);padding:9px 12px;font-weight:700;border-radius:8px;}
    .links button:hover{background:var(--surface);color:var(--text);}
    .container{max-width:1200px;margin:auto;padding:70px 24px;}
    .hero{min-height:550px;display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center;}
    .hero h1{font-size:clamp(45px,7vw,90px);line-height:.95;letter-spacing:-5px;margin:0 0 25px;}
    .hero p{font-size:19px;line-height:1.7;color:var(--muted);}
    .eyebrow{font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:18px;}
    .buttons{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px;}
    .btn{border:0;padding:13px 18px;border-radius:12px;font-weight:800;background:var(--accent);color:#fff;}
    .btn.alt{background:${darkModes.includes(t.mode) ? "#292929" : "#eef0f4"};color:${darkModes.includes(t.mode) ? "#fff" : "#111827"};}
    .art{height:440px;border-radius:25px;background:radial-gradient(circle at 30% 25%,var(--accent),transparent 32%),linear-gradient(135deg,var(--accent2),var(--accent));}
    .section{padding:90px 0;}
    .section h2{font-size:clamp(35px,5vw,60px);letter-spacing:-3px;}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
    .card{padding:28px;border:1px solid var(--border);background:var(--surface);border-radius:18px;}
    .card h3{font-size:22px;}
    .card p{line-height:1.7;color:var(--muted);}
    .stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
    .stat{padding:30px;border-right:1px solid var(--border);}
    .stat strong{display:block;font-size:40px;}
    .stat span{color:var(--muted);}
    .projects{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
    .project{min-height:250px;border-radius:18px;padding:25px;display:flex;flex-direction:column;justify-content:end;color:white;background:linear-gradient(135deg,var(--accent),var(--accent2));}
    .quote{padding:45px;border-radius:20px;background:var(--accent);color:white;font-size:30px;line-height:1.4;}
    .form{display:grid;gap:15px;max-width:700px;}
    .form input,.form textarea,.form select{width:100%;padding:15px;border:1px solid var(--border);border-radius:12px;background:var(--bg);color:var(--text);}
    .form textarea{min-height:160px;}
    .footer{padding:60px 5%;background:${darkModes.includes(t.mode) ? "#050505" : "#111827"};color:white;text-align:center;}
    @media(max-width:800px){.hero{grid-template-columns:1fr;}.grid,.projects,.stats{grid-template-columns:1fr;}.links{display:none;}.nav{flex-wrap:wrap;}.art{height:330px;}.container{padding:45px 18px;}}`;

  const js = `
    function show(page){
      const pages={home:document.getElementById("home"),about:document.getElementById("about"),services:document.getElementById("services"),portfolio:document.getElementById("portfolio"),contact:document.getElementById("contact")};
      Object.values(pages).forEach(x=>{if(x)x.style.display="none";});
      if(pages[page]){pages[page].style.display="block";}
      window.scrollTo({top:0,behavior:"smooth"});
    }
    function submitForm(e){e.preventDefault();alert("Thank you! This is a demo template.");e.target.reset();}
    show("home");`;

  const nav = pageNamesLocal.map(x => `<button onclick="show('${x[0]}')">${x[1]}</button>`).join("");
  const about = downloadAboutHTML(t);
  const services = downloadServicesHTML(t);
  const portfolio = downloadPortfolioHTML(t);
  const contact = downloadContactHTML(t);

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>${escapeHTML(t.name)}</title>
    <style>${css}</style>
    </head>
    <body>
    <nav class="nav">
    <div class="logo">${escapeHTML(t.name)}</div>
    <div class="links">${nav}</div>
    </nav>
    <main>
    <section id="home">${pageHTML}</section>
    <section id="about" style="display:none">${about}</section>
    <section id="services" style="display:none">${services}</section>
    <section id="portfolio" style="display:none">${portfolio}</section>
    <section id="contact" style="display:none">${contact}</section>
    </main>
    <footer class="footer">
    <strong>${escapeHTML(t.name)}</strong>
    <p>${escapeHTML(t.desc)}</p>
    <p>© 2026 ${escapeHTML(t.name)}. All rights reserved.</p>
    </footer>
    <script>${js}<\/script>
    </body>
    </html>`;
}

function downloadHomeHTML(t) {
  return `
    <div class="container">
      <div class="hero">
        <div>
          <div class="eyebrow">${escapeHTML(t.type)}</div>
          <h1>${escapeHTML(t.hero)}</h1>
          <p>${escapeHTML(t.desc)} We combine strategy, craft and personality to create experiences people remember.</p>
          <div class="buttons">
            <button class="btn" onclick="show('services')">Explore Services</button>
            <button class="btn alt" onclick="show('portfolio')">View Our Work</button>
          </div>
        </div>
        <div class="art"></div>
      </div>
      <div class="section">
        <div class="stats">
          <div class="stat"><strong>12+</strong><span>Years experience</span></div>
          <div class="stat"><strong>240</strong><span>Projects delivered</span></div>
          <div class="stat"><strong>38</strong><span>Global partners</span></div>
          <div class="stat"><strong>98%</strong><span>Client satisfaction</span></div>
        </div>
      </div>
      <div class="section">
        <div class="eyebrow">What makes us different</div>
        <h2>Designed around people.</h2>
        <div class="grid">${featureCards(t)}</div>
      </div>
      <div class="section">
        <div class="eyebrow">Selected Work</div>
        <h2>Made to stand out.</h2>
        <div class="projects">${projectCards(t)}</div>
      </div>
      <div class="section">
        <div class="quote">“The strongest work doesn't simply look good. It gives people a reason to care.”</div>
      </div>
    </div>`;
}

function downloadAboutHTML(t) {
  return `
    <div class="container">
      <div class="hero">
        <div>
          <div class="eyebrow">About ${escapeHTML(t.name)}</div>
          <h1>The story behind ${escapeHTML(t.name)}.</h1>
          <p>${escapeHTML(pageIntro("about", t))}</p>
        </div>
        <div class="art"></div>
      </div>
      <div class="section">
        <div class="grid">
          <div class="card"><div class="eyebrow">01</div><h3>Our Mission</h3><p>Create meaningful experiences that combine useful ideas, thoughtful design and reliable execution.</p></div>
          <div class="card"><div class="eyebrow">02</div><h3>Our Vision</h3><p>Build a future where good digital experiences are accessible, useful and beautifully considered.</p></div>
          <div class="card"><div class="eyebrow">03</div><h3>Our Values</h3><p>Curiosity, craft, clarity, care, courage and consistency guide every decision.</p></div>
        </div>
      </div>
    </div>`;
}

function downloadServicesHTML(t) {
  const services = ["Strategy & Direction", "Creative Development", "Digital Experience", "Content & Storytelling", "Growth & Optimization", "Ongoing Partnership"];
  return `
    <div class="container">
      <div class="hero">
        <div>
          <div class="eyebrow">${escapeHTML(t.type)}</div>
          <h1>Solutions designed around ${escapeHTML(t.type.toLowerCase())}.</h1>
          <p>Explore our carefully structured services, process and specialist capabilities.</p>
        </div>
        <div class="art"></div>
      </div>
      <div class="section">
        <div class="grid">
          ${services.map((x, i) => `<div class="card"><div class="eyebrow">${String(i + 1).padStart(2, "0")}</div><h3>${x}</h3><p>A focused service designed to help you move from a good idea to a stronger result.</p></div>`).join("")}
        </div>
      </div>
      <div class="section">
        <div class="eyebrow">Our Process</div>
        <h2>Simple. Focused. Effective.</h2>
        <div class="grid">
          ${["Discover", "Define", "Create", "Launch"].map((x, i) => `<div class="card"><div class="eyebrow">0${i + 1}</div><h3>${x}</h3><p>We create momentum through clear decisions and purposeful execution.</p></div>`).join("")}
        </div>
      </div>
    </div>`;
}

function downloadPortfolioHTML(t) {
  return `
    <div class="container">
      <div class="hero">
        <div>
          <div class="eyebrow">Selected Work</div>
          <h1>Selected work and projects.</h1>
          <p>${escapeHTML(pageIntro("portfolio", t))}</p>
        </div>
        <div class="art"></div>
      </div>
      <div class="section">
        <div class="projects">
          ${[["01", "North Project"], ["02", "Atlas Experience"], ["03", "Signal House"], ["04", "Future Form"], ["05", "Open Horizon"], ["06", "Studio 06"], ["07", "Field Notes"], ["08", "New Perspective"]].map(x => `<article class="project"><div class="eyebrow">${x[0]}</div><h3>${x[1]}</h3><p>A representative ${escapeHTML(t.type.toLowerCase())} project built around a distinctive idea.</p></article>`).join("")}
        </div>
      </div>
    </div>`;
}

function downloadContactHTML(t) {
  return `
    <div class="container">
      <div class="hero">
        <div>
          <div class="eyebrow">Start a conversation</div>
          <h1>${escapeHTML(pageTitle("contact", t))}</h1>
          <p>${escapeHTML(pageIntro("contact", t))}</p>
          <div class="hero-actions"><a class="btn btn-primary" href="mailto:hello@example.com">hello@example.com</a></div>
        </div>
        <div class="art"></div>
      </div>
      <div class="section">
        <div class="grid two">
          <div class="card"><div class="eyebrow">Contact details</div><h3>Let's talk.</h3><p><strong>Email</strong><br>hello@example.com</p><p><strong>Phone</strong><br>+1 555 014 2026</p><p><strong>Studio</strong><br>100 Creative Avenue<br>New York, NY</p><p><strong>Hours</strong><br>Monday — Friday<br>09:00 — 18:00</p></div>
          <div class="card">
            <div class="eyebrow">Send a message</div>
            <form class="form" onsubmit="submitDemo(event)">
              <input required placeholder="Your name">
              <input required type="email" placeholder="Email address">
              <select><option>General enquiry</option><option>New project</option><option>Partnership</option><option>Support</option></select>
              <textarea required placeholder="Tell us about your project"></textarea>
              <button class="btn btn-primary" type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>`;
}

function submitDemo(e) {
  e.preventDefault();
  showToast("Message submitted — demo mode");
  e.target.reset();
}

function featureCards(t) {
  const data = [["01", "Thoughtful Strategy"], ["02", "Distinctive Design"], ["03", "Reliable Execution"], ["04", "Human Experience"], ["05", "Flexible Systems"], ["06", "Long-Term Thinking"]];
  return data.map(x => `<div class="card"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>A carefully considered approach that keeps the experience useful, memorable and easy to understand.</p></div>`).join("");
}

function projectCards(t) {
  return [["01", "Project North"], ["02", "Project Atlas"], ["03", "Project Horizon"], ["04", "Project Form"], ["05", "Project Signal"]].map(x => `<article class="project"><div class="eyebrow">${x[0]}</div><h3>${x[1]}</h3><p>A representative${escapeHTML(t.type)} case study.</p></article>`).join("");
}

function cta(t) {
  return `<div class="cta"><div><div class="eyebrow">Have an idea?</div><h2>Let's make it real.</h2></div><button class="btn btn-primary" onclick="openTemplate(${t.id},'contact')">Start a conversation</button></div>`;
}

function renderPage(t, page) {
  if (page === "home") return homePage(t);
  if (page === "about") return aboutPage(t);
  if (page === "services") return servicesPage(t);
  if (page === "portfolio") return portfolioPage(t);
  return contactPage(t);
}

function templateFooter(t) {
  return `
      <footer class="footer">
        <div class="footer-inner">
          <div><div class="site-logo">${escapeHTML(t.name)}</div><p>${escapeHTML(t.desc)}</p></div>
          <div><strong>Explore</strong><a href="#" onclick="event.preventDefault();openTemplate(${t.id},'home')">Home</a><a href="#" onclick="event.preventDefault();openTemplate(${t.id},'about')">About</a><a href="#" onclick="event.preventDefault();openTemplate(${t.id},'services')">Services</a></div>
          <div><strong>Work</strong><a href="#" onclick="event.preventDefault();openTemplate(${t.id},'portfolio')">Projects</a><a href="#" onclick="event.preventDefault();openTemplate(${t.id},'contact')">Contact</a></div>
          <div><strong>Connect</strong><a href="mailto:hello@example.com">Email</a><a href="#">Instagram</a><a href="#">LinkedIn</a></div>
        </div>
        <div class="copyright">© 2026 ${escapeHTML(t.name)}. Demo template.</div>
      </footer>`;
}

function showPages(id) {
  const t = findTemplate(id);
  if(!t) return;
  const modal = document.createElement("div");
  modal.className = "modal show";
  modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <div><div class="eyebrow">TEMPLATE ${String(t.id).padStart(2, "0")}</div><h2>${escapeHTML(t.name)}</h2><p>${escapeHTML(t.desc)}</p></div>
          <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
        </div>
        <div class="page-links">
          <button class="btn btn-primary" onclick="this.closest('.modal').remove();openTemplate(${t.id},'home')">Home</button>
          <button class="btn btn-light" onclick="this.closest('.modal').remove();openTemplate(${t.id},'about')">About</button>
          <button class="btn btn-light" onclick="this.closest('.modal').remove();openTemplate(${t.id},'services')">Services</button>
          <button class="btn btn-light" onclick="this.closest('.modal').remove();openTemplate(${t.id},'portfolio')">Portfolio</button>
          <button class="btn btn-light" onclick="this.closest('.modal').remove();openTemplate(${t.id},'contact')">Contact</button>
          <button class="btn download-btn" onclick="downloadTemplate(${t.id})">⬇ Download Template</button>
        </div>
      </div>`;
  document.body.appendChild(modal);
}

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

/* =========================================================
   INITIAL LOAD
   ========================================================= */
renderGallery();

/* =========================================================
   PROFESSIONAL MOTION ENGINE
   ========================================================= */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function animateCards() {
    if (reduced) {
      document.querySelectorAll(".template-card,.github-card").forEach(el => { el.classList.add("motion-in"); el.style.animationDelay = "0s"; });
      return;
    }
    document.querySelectorAll(".template-card,.github-card").forEach((el, i) => {
      if (el.dataset.motionReady) return;
      el.dataset.motionReady = "1";
      el.style.animationDelay = Math.min(i * 45, 500) + "ms";
      requestAnimationFrame(() => el.classList.add("motion-in"));
    });
  }
  function addReveal() {
    const selectors = ".section-head,.section > .grid,.section > .projects,.stats,.quote,.cta,.footer-inner,.github-library-head";
    document.querySelectorAll(selectors).forEach(el => { if (!el.classList.contains("reveal-on-scroll")) el.classList.add("reveal-on-scroll"); });
    if (reduced) { document.querySelectorAll(".reveal-on-scroll").forEach(el => el.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
  }
  function bindTilt() {
    if (reduced || window.matchMedia("(pointer:coarse)").matches) return;
    document.querySelectorAll(".template-card,.github-card").forEach(card => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "1";
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `translateY(-8px) perspective(900px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.8).toFixed(2)}deg)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }
  function bindParallax() {
    if (reduced || window.matchMedia("(pointer:coarse)").matches) return;
    document.querySelectorAll(".hero-art").forEach(hero => {
      if (hero.dataset.parallaxBound) return;
      hero.dataset.parallaxBound = "1";
      hero.addEventListener("pointermove", e => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5;
        hero.style.transform = `perspective(900px) rotateX(${(-y * 2).toFixed(2)}deg) rotateY(${(x * 2).toFixed(2)}deg)`;
      });
      hero.addEventListener("pointerleave", () => { hero.style.transform = ""; });
    });
  }
  function bindAll() {
    animateCards(); addReveal(); bindTilt(); bindParallax();
  }
  const observer = new MutationObserver(() => requestAnimationFrame(bindAll));
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("load", bindAll, { once: true });
  window.addEventListener("scroll", () => { document.documentElement.style.setProperty("--scroll-y", window.scrollY + "px"); }, { passive: true });
})();


/* =========================================================
   TEMPLATE-MO STYLE AI PROMPT GENERATOR 
   ========================================================= */
let currentStep = 1;
const totalSteps = 7;
let promptData = {
  category: "Business", style: "Minimalist", color: "TemplateMo Cyan", header: "Top Navbar", hero: "Split Layout",
  tech: ["HTML / CSS / JS", "Responsive", "SEO Meta Tags"], name: "", desc: "", tone: "Professional"
};

function openGenerator() {
  currentStep = 1;
  app.innerHTML = `
  <section class="tm-gen-container">
    <button class="btn btn-light" onclick="renderGallery()" style="margin-bottom: 30px;">← Back to Gallery</button>
    <div class="tm-progress-bar"><div class="tm-progress" id="tmProgress"></div></div>

    <div id="step-1" class="tm-step active">
      <div class="tm-eyebrow">Step 1 of ${totalSteps}</div>
      <h1 class="tm-title">What type of website?</h1>
      <p class="tm-sub">Choose the category that best matches your project.</p>
      <div class="tm-grid">
        ${renderCards('category', [
    { id: 'Business', icon: '🏢', desc: 'Corporate, agency, consulting.' },
    { id: 'Restaurant', icon: '🍴', desc: 'Cafe, bakery, food business.' },
    { id: 'Portfolio', icon: '🎨', desc: 'Personal, creative showcase.' },
    { id: 'E-Commerce', icon: '🛒', desc: 'Online store, product catalog.' },
    { id: 'Landing Page', icon: '🚀', desc: 'Product, startup, app landing.' },
    { id: 'Blog', icon: '📝', desc: 'Content, news, articles.' }
  ])}
      </div>
    </div>

    <div id="step-2" class="tm-step">
      <div class="tm-eyebrow">Step 2 of ${totalSteps}</div>
      <h1 class="tm-title">Pick a design style</h1>
      <p class="tm-sub">How should the website look and feel?</p>
      <div class="tm-grid">
        ${renderCards('style', [
    { id: 'Minimalist', icon: '⬜', desc: 'Clean, whitespace, elegant.' },
    { id: 'Corporate', icon: '👔', desc: 'Trust, structure, professional.' },
    { id: 'Bento Grid', icon: '🍱', desc: 'Apple-style mixed card sizes.' },
    { id: 'Glassmorphism', icon: '💎', desc: 'Frosted glass, translucent.' },
    { id: 'Neomorphism', icon: '⚪', desc: 'Soft UI, subtle depth.' },
    { id: 'Dark Tech', icon: '🌌', desc: 'Dark mode, glowing accents.' }
  ])}
      </div>
    </div>

    <div id="step-3" class="tm-step">
      <div class="tm-eyebrow">Step 3 of ${totalSteps}</div>
      <h1 class="tm-title">Choose a Color Scheme</h1>
      <p class="tm-sub">What palette best fits the brand?</p>
      <div class="tm-grid">
        ${renderCards('color', [
    { id: 'TemplateMo Cyan', icon: '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg, #00c6d7, #1a1a1a);"></div>', desc: 'Classic teal, cyan, and dark slate.' },
    { id: 'Eco Green', icon: '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg, #22c55e, #ffffff); border:1px solid #ddd;"></div>', desc: 'Vibrant green, white, and clean grays.' },
    { id: 'Corporate Blue', icon: '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg, #2563eb, #f8fafc); border:1px solid #ddd;"></div>', desc: 'Deep professional blue and soft white.' },
    { id: 'Bold Red', icon: '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg, #ef4444, #1f2937);"></div>', desc: 'Striking crimson with dark gray accents.' },
    { id: 'Dark Tech', icon: '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg, #111827, #8b5cf6);"></div>', desc: 'Graphite, black, and neon highlights.' },
    { id: 'Warm Orange', icon: '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg, #f97316, #ffffff); border:1px solid #ddd;"></div>', desc: 'Energetic orange with clean neutral backgrounds.' }
  ])}
      </div>
    </div>

    <div id="step-4" class="tm-step">
      <div class="tm-eyebrow">Step 4 of ${totalSteps}</div>
      <h1 class="tm-title">Choose the structure</h1>
      <p class="tm-sub">How should key sections be laid out?</p>
      <h3 class="tm-section-title">Header / Navigation Style</h3>
      <div class="tm-grid small">
        ${renderCards('header', [{ id: 'Top Navbar', icon: '➖', desc: 'Classic fixed header.' }, { id: 'Sidebar', icon: '◧', desc: 'Vertical left-side nav.' }, { id: 'Hamburger', icon: '☰', desc: 'Hidden full-screen menu.' }])}
      </div>
      <h3 class="tm-section-title">Hero Section Style</h3>
      <div class="tm-grid small">
        ${renderCards('hero', [{ id: 'Split Layout', icon: '◨', desc: 'Text left, image right.' }, { id: 'Full Image', icon: '🖼', desc: 'Background image, centered text.' }, { id: 'Text Only', icon: 'A', desc: 'Bold typography, minimal.' }])}
      </div>
    </div>

    <div id="step-5" class="tm-step">
      <div class="tm-eyebrow">Step 5 of ${totalSteps}</div>
      <h1 class="tm-title">Tech Stack & Features</h1>
      <p class="tm-sub">Select all elements that apply to your code.</p>
      <div class="tm-grid">
        ${renderMultiCards('tech', [
    { id: 'HTML / CSS / JS', icon: '🌐', desc: 'Pure vanilla, no frameworks.' },
    { id: 'Tailwind CSS', icon: '💨', desc: 'Utility-first CSS framework.' },
    { id: 'React', icon: '⚛', desc: 'Component-based with JSX.' },
    { id: 'SEO Meta Tags', icon: '🔍', desc: 'Search engine optimized.' },
    { id: 'Accessibility', icon: '♿', desc: 'ARIA labels and contrast.' },
    { id: 'Responsive', icon: '📱', desc: 'Mobile-first layout.' }
  ])}
      </div>
    </div>

    <div id="step-6" class="tm-step">
      <div class="tm-eyebrow">Step 6 of ${totalSteps}</div>
      <h1 class="tm-title">Content Details</h1>
      <p class="tm-sub">Tell us about your website's content and tone.</p>
      <div class="tm-form">
        <div class="field"><label>Website / Business Name</label><input type="text" placeholder="e.g. Acme Corp" oninput="promptData.name = this.value"></div>
        <div class="field"><label>Brief Description (what is the site about?)</label><textarea placeholder="e.g. A creative agency portfolio..." oninput="promptData.desc = this.value"></textarea></div>
        <div class="field">
          <label>Tone / Voice</label>
          <select onchange="promptData.tone = this.value">
            <option>Professional. Trustworthy, confident.</option>
            <option>Casual & Friendly. Approachable, relaxed.</option>
            <option>Bold & Energetic. Dynamic, high-energy.</option>
            <option>Luxury. Exclusive, premium, quiet.</option>
          </select>
        </div>
      </div>
    </div>

    <div id="step-7" class="tm-step">
      <div class="tm-eyebrow">Step 7 of ${totalSteps}</div>
      <h1 class="tm-title">📋 Generated Prompt</h1>
      <p class="tm-sub">Copy this prompt and paste it into any AI builder to generate your website.</p>
      <div class="tm-prompt-box" id="finalPromptBox"></div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top:20px;">
        <button class="btn btn-primary" onclick="copyTmPrompt()">📋 Copy Prompt</button>
        <button class="btn btn-light" onclick="downloadTmPrompt()">📥 Download .txt</button>
        <button class="btn btn-dark" onclick="openGenerator()">Start Over ↺</button>
      </div>
    </div>

    <div class="tm-nav-actions" id="tmNavActions">
      <button class="btn btn-light" id="btnPrev" onclick="changeStep(-1)" style="visibility:hidden;">← Back</button>
      <button class="btn btn-primary" id="btnNext" onclick="changeStep(1)">Next Step →</button>
    </div>
  </section>`;
  updateProgress();
}

function renderCards(key, options) {
  return options.map(opt => `<div class="tm-card ${promptData[key] === opt.id ? 'selected' : ''}" onclick="selectTmCard('${key}', '${opt.id}', this)"><div class="tm-card-icon">${opt.icon}</div><div class="tm-card-title">${opt.id}</div><div class="tm-card-desc">${opt.desc}</div></div>`).join('');
}

function renderMultiCards(key, options) {
  return options.map(opt => `<div class="tm-card ${promptData[key].includes(opt.id) ? 'selected' : ''}" onclick="toggleTmCard('${key}', '${opt.id}', this)"><div class="tm-card-icon">${opt.icon}</div><div class="tm-card-title">${opt.id}</div><div class="tm-card-desc">${opt.desc}</div></div>`).join('');
}

function selectTmCard(key, id, el) {
  promptData[key] = id;
  const siblings = el.parentElement.querySelectorAll('.tm-card');
  siblings.forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

function toggleTmCard(key, id, el) {
  if (promptData[key].includes(id)) {
    promptData[key] = promptData[key].filter(x => x !== id);
    el.classList.remove('selected');
  } else {
    promptData[key].push(id);
    el.classList.add('selected');
  }
}

function changeStep(direction) {
  document.getElementById(`step-${currentStep}`).classList.remove('active');
  currentStep += direction;

  if (currentStep === totalSteps) {
    generateFinalPrompt();
    document.getElementById('tmNavActions').style.display = 'none';
  } else {
    document.getElementById('tmNavActions').style.display = 'flex';
  }

  document.getElementById(`step-${currentStep}`).classList.add('active');
  document.getElementById('btnPrev').style.visibility = currentStep > 1 ? 'visible' : 'hidden';
  document.getElementById('btnNext').innerText = currentStep === totalSteps - 1 ? 'Generate Prompt ✨' : 'Next Step →';
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
  const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;
  document.getElementById('tmProgress').style.width = pct + '%';
}

/* =========================================================
   LIVE AI GENERATOR
   ========================================================= */
async function generateFinalPrompt() {
  const promptBox = document.getElementById('finalPromptBox');

  promptBox.innerHTML = '<span style="color: var(--accent);">⚡ [1/3] Connecting to AI service...</span>';

  const fullPrompt = `You are an expert prompt engineer for AI website builders. Write a highly detailed, professional, production-ready system prompt that the user can copy and paste into an AI builder to generate their website. Be highly descriptive about the UI/UX, typography, layout, spacing, components, and color theory based on the parameters provided. Output ONLY the raw prompt text without conversational fillers.
  
  PARAMETERS:
  - Category: ${promptData.category}
  - Visual Style: ${promptData.style}
  - Color Scheme: ${promptData.color}
  - Tone / Voice: ${promptData.tone.split('.')[0]} - Header Navigation:${promptData.header}
  - Hero Section: ${promptData.hero}
  - Tech Stack & Features: ${promptData.tech.join(', ')}
  - Website Name: ${promptData.name || 'My New Website'}
  - Description: ${promptData.desc || 'A beautifully designed webpage'}`;

  // Add your API Key here safely!
  const apiKey = "ADD your api key here";

  if (!apiKey.startsWith("sk-or-v1-") || apiKey.includes("YOUR_ACTUAL_SECRET_KEY_HERE")) {
    console.warn("Invalid or placeholder API key detected. Using local generator.");
    generateFallbackPrompt();
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  try {
    promptBox.innerHTML = '<span style="color: var(--accent);">⚡ [2/3] Generating live prompt via AI... Please wait.</span>';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
        'HTTP-Referer': 'https://templateforge.local',
        'X-Title': 'TemplateForge'
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          { role: 'user', content: fullPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP status ${response.status}`);
    }

    promptBox.innerHTML = '<span style="color: var(--accent);">⚡ [3/3] Downloading AI response...</span>';
    const data = await response.json();
    clearTimeout(timeoutId);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from AI.");
    }

    let generatedText = data.choices[0].message.content.trim();
    if (generatedText.startsWith('\`\`\`')) {
      generatedText = generatedText.replace(/^\`\`\`[a-z]*\n/, '').replace(/\n\`\`\`$/, '');
    }

    promptBox.innerText = "/* [Status: Live AI Prompt Generated] */\n\n" + generatedText;

  } catch (err) {
    clearTimeout(timeoutId);
    console.error("AI Error:", err.message);
    promptBox.innerHTML = `<span style="color: #ef4444;">Notice: Cloud connection issue (${err.message}). Generating with Local Engine...</span>`;
    setTimeout(generateFallbackPrompt, 1500);
  }
}

function generateFallbackPrompt() {
  const p = `/* [Status: Smart Local Generator Fallback] */
  
  Create a production-ready website for my project.
  
  DESIGN DIRECTION
  - Category: ${promptData.category}
  - Visual Style: ${promptData.style}
  - Color Scheme: ${promptData.color}
  - Tone / Voice: ${promptData.tone.split('.')[0]}
  
  STRUCTURE
  - Header Navigation: ${promptData.header}
  - Hero Section: ${promptData.hero}
  
  TECH STACK & FEATURES
  ${promptData.tech.map(t => '- ' + t).join('\n')}
  
  CONTENT DETAILS
  - Website Name: ${promptData.name || '[Insert Name]'}
  - Description: ${promptData.desc || '[Insert Description]'}`;

  document.getElementById('finalPromptBox').innerText = p;
}

async function copyTmPrompt() {
  const text = document.getElementById('finalPromptBox').innerText;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Prompt copied successfully!");
  } catch (e) {
    const area = document.createElement("textarea");
    area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
    showToast("Prompt copied successfully!");
  }
}

function downloadTmPrompt() {
  const text = document.getElementById('finalPromptBox').innerText;
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'AI-Website-Prompt.txt';
  a.click();
}

/* =========================================================
   NEON JOLLY ROGER STYLES (INJECTED)
   ========================================================= */
const neonStyles = document.createElement('style');
neonStyles.innerHTML = `
  /* ☠️ Neon Jolly Roger GIF Art */
  .neon-jolly-roger-gif {
    width: 320px;
    height: auto;
    /* This makes the black background of the GIF transparent! */
    mix-blend-mode: screen;
    /* Adds the intense purple neon glow to the white lines */
    filter: drop-shadow(0 0 10px #a855f7) drop-shadow(0 0 25px #d8b4fe);
    animation: floatNeon 4s ease-in-out infinite;
    opacity: 0.9;
  }
  
  @keyframes floatNeon { 
    0%, 100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 0 10px #a855f7) drop-shadow(0 0 25px #d8b4fe) brightness(1); } 
    50% { transform: translateY(-15px) scale(1.03); filter: drop-shadow(0 0 15px #a855f7) drop-shadow(0 0 35px #d8b4fe) brightness(1.2); } 
  }
  
  @media(max-width: 900px) { 
    .hero-gallery { grid-template-columns: 1fr !important; text-align: center; } 
    .hero-neon-art { display: none !important; } 
  }
`;
document.head.appendChild(neonStyles);
