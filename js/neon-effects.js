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
