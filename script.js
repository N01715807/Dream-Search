document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.dream-card');
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  cards.forEach((card) => {
    const factor = parseFloat(card.getAttribute('data-rotation-factor')) || 2;

    if (!isTouch) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rx = (-factor * (y - rect.height/2)) / (rect.height/2);
        const ry = ( factor * (x - rect.width/2)) / (rect.width/2);

        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

        card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--y', `${(y / rect.height) * 100}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0)';
        card.style.transition = 'transform .5s ease';
        setTimeout(() => card.style.transition = '', 500);
      });
    }

    card.style.animation = `dreamFloat 4s alternate ease-in-out infinite`;
    card.style.animationDelay = `${Math.random()*2}s`;
  });
});

