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


