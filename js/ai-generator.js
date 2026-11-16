/* =========================================================
   TEMPLATE-MO STYLE AI PROMPT GENERATOR 
   ========================================================= */
let currentStep = 1;
const totalSteps = 6;
let promptData = {
  category: "Business", style: "Minimalist", header: "Top Navbar", hero: "Split Layout",
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
          {id: 'Business', icon: '🏢', desc: 'Corporate, agency, consulting.'},
          {id: 'Restaurant', icon: '🍴', desc: 'Cafe, bakery, food business.'},
          {id: 'Portfolio', icon: '🎨', desc: 'Personal, creative showcase.'},
          {id: 'E-Commerce', icon: '🛒', desc: 'Online store, product catalog.'},
          {id: 'Landing Page', icon: '🚀', desc: 'Product, startup, app landing.'},
          {id: 'Blog', icon: '📝', desc: 'Content, news, articles.'}
        ])}
      </div>
    </div>

    <div id="step-2" class="tm-step">
      <div class="tm-eyebrow">Step 2 of ${totalSteps}</div>
      <h1 class="tm-title">Pick a design style</h1>
      <p class="tm-sub">How should the website look and feel?</p>
      <div class="tm-grid">
        ${renderCards('style', [
          {id: 'Minimalist', icon: '⬜', desc: 'Clean, whitespace, elegant.'},
          {id: 'Corporate', icon: '👔', desc: 'Trust, structure, professional.'},
          {id: 'Bento Grid', icon: '🍱', desc: 'Apple-style mixed card sizes.'},
          {id: 'Glassmorphism', icon: '💎', desc: 'Frosted glass, translucent.'},
          {id: 'Neomorphism', icon: '⚪', desc: 'Soft UI, subtle depth.'},
          {id: 'Dark Tech', icon: '🌌', desc: 'Dark mode, glowing accents.'}
        ])}
      </div>
    </div>

    <div id="step-3" class="tm-step">
      <div class="tm-eyebrow">Step 3 of ${totalSteps}</div>
      <h1 class="tm-title">Choose the structure</h1>
      <p class="tm-sub">How should key sections be laid out?</p>
      <h3 class="tm-section-title">Header / Navigation Style</h3>
      <div class="tm-grid small">
        ${renderCards('header', [{id: 'Top Navbar', icon: '➖', desc: 'Classic fixed header.'},{id: 'Sidebar', icon: '◧', desc: 'Vertical left-side nav.'},{id: 'Hamburger', icon: '☰', desc: 'Hidden full-screen menu.'}])}
      </div>
      <h3 class="tm-section-title">Hero Section Style</h3>
      <div class="tm-grid small">
        ${renderCards('hero', [{id: 'Split Layout', icon: '◨', desc: 'Text left, image right.'},{id: 'Full Image', icon: '🖼', desc: 'Background image, centered text.'},{id: 'Text Only', icon: 'A', desc: 'Bold typography, minimal.'}])}
      </div>
    </div>

    <div id="step-4" class="tm-step">
      <div class="tm-eyebrow">Step 4 of ${totalSteps}</div>
      <h1 class="tm-title">Tech Stack & Features</h1>
      <p class="tm-sub">Select all elements that apply to your code.</p>
      <div class="tm-grid">
        ${renderMultiCards('tech', [
          {id: 'HTML / CSS / JS', icon: '🌐', desc: 'Pure vanilla, no frameworks.'},
          {id: 'Tailwind CSS', icon: '💨', desc: 'Utility-first CSS framework.'},
          {id: 'React', icon: '⚛', desc: 'Component-based with JSX.'},
          {id: 'SEO Meta Tags', icon: '🔍', desc: 'Search engine optimized.'},
          {id: 'Accessibility', icon: '♿', desc: 'ARIA labels and contrast.'},
          {id: 'Responsive', icon: '📱', desc: 'Mobile-first layout.'}
        ])}
      </div>
    </div>

    <div id="step-5" class="tm-step">
      <div class="tm-eyebrow">Step 5 of ${totalSteps}</div>
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

    <div id="step-6" class="tm-step">
      <div class="tm-eyebrow">Step 6 of ${totalSteps}</div>
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
  if(currentStep === totalSteps) {
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
   LIVE AI GENERATOR (60s TIMEOUT)
   ========================================================= */
async function generateFinalPrompt() {
  const promptBox = document.getElementById('finalPromptBox');
  
  promptBox.innerHTML = '<span style="color: var(--accent);">⚡ [1/3] Connecting to AI service...</span>';
  
  const fullPrompt = `You are an expert prompt engineer for AI website builders. Write a highly detailed, professional, production-ready system prompt that the user can copy and paste into an AI builder to generate their website. Be highly descriptive about the UI/UX, typography, layout, spacing, components, and color theory based on the parameters provided. Output ONLY the raw prompt text without conversational fillers.
  
PARAMETERS:
- Category: ${promptData.category}
- Visual Style: ${promptData.style}
- Tone / Voice: ${promptData.tone.split('.')[0]}
- Header Navigation: ${promptData.header}
- Hero Section: ${promptData.hero}
- Tech Stack & Features: ${promptData.tech.join(', ')}
- Website Name: ${promptData.name || 'My New Website'}
- Description: ${promptData.desc || 'A beautifully designed webpage'}`;

  // Make sure your real key is pasted here
  const apiKey = "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";

  if (!apiKey.startsWith("sk-or-v1-") || apiKey.includes("YOUR_NEW_SECRET_KEY_HERE")) {
    console.warn("Invalid or placeholder API key detected. Using local generator.");
    generateFallbackPrompt();
    return;
  }

  // Increased to 60-Second Timeout with explicit error reason
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(new Error("Timeout of 60 seconds exceeded")), 60000);

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

    promptBox.innerText = "/* [Status: Live AI ] */\n\n" + generatedText;

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
  } catch(e) {
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