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

