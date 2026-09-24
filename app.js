/**
 * Ori9inalz — Main App Script
 * WooCommerce Migration Ready
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal Animations ─────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Hero Ken Burns ────────────────────────────────────────────
  const hero = document.querySelector('.hero');
  if (hero) setTimeout(() => hero.classList.add('loaded'), 100);

  // ── Cart State ────────────────────────────────────────────────
  let cartCount = parseInt(localStorage.getItem('ori9_cart') || '0');
  updateCartBadges(cartCount);

  function updateCartBadges(n) {
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  }

  // ── Add to Cart ───────────────────────────────────────────────
  document.querySelectorAll('.add-to-cart, .product-card__add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount++;
      localStorage.setItem('ori9_cart', cartCount);
      updateCartBadges(cartCount);

      const orig = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.style.background = '#22c55e';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
      }, 1800);
    });
  });

  // ── Accordion ─────────────────────────────────────────────────
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Color Swatches ────────────────────────────────────────────
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatch.closest('.color-options').querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

  // ── Size Buttons ──────────────────────────────────────────────
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.size-options').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── Qty Selectors ─────────────────────────────────────────────
  document.querySelectorAll('.qty-selector').forEach(sel => {
    const input = sel.querySelector('input');
    sel.querySelector('.qty-minus')?.addEventListener('click', () => {
      if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    });
    sel.querySelector('.qty-plus')?.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
    });
  });

  // ── Checkout form submission ───────────────────────────────────
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('ori9_cart', '0');
      updateCartBadges(0);
      window.location.href = 'index.html?order=success';
    });
  }

  // ── Order success banner ──────────────────────────────────────
  if (window.location.search.includes('order=success')) {
    const banner = document.createElement('div');
    banner.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
      background: #22c55e; color: #fff; text-align: center;
      padding: 18px; font-weight: 700; font-size: 15px;
      letter-spacing: 0.08em;
    `;
    banner.textContent = '✓ ORDER PLACED SUCCESSFULLY — Thank you for shopping Ori9inalz!';
    document.body.prepend(banner);
    setTimeout(() => banner.remove(), 6000);
  }

  // ── Newsletter form ───────────────────────────────────────────
  document.querySelectorAll('.newsletter__form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.newsletter__btn');
      const input = form.querySelector('.newsletter__input');
      btn.textContent = 'Subscribed ✓';
      btn.style.background = '#22c55e';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Join';
        btn.style.background = '';
      }, 3000);
    });
  });

  // ── Payment option selection ──────────────────────────────────
  document.querySelectorAll('.payment-option input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
      radio.closest('.payment-option').classList.add('selected');
    });
  });

});
