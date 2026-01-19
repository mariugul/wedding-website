/**
 * Wedding Website - Minimal JavaScript
 * 
 * This file contains optional JavaScript enhancements.
 * The website works fully without JavaScript enabled.
 */

(function() {
  'use strict';

  /**
   * Language / i18n System
   */
  const DEFAULT_LANG = 'en';
  const SUPPORTED_LANGS = ['en', 'pt', 'no'];
  const LANG_STORAGE_KEY = 'wedding-site-lang';

  function getCurrentLang() {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }
    // Try browser language
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LANGS.includes(browserLang)) {
      return browserLang;
    }
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    applyTranslations(lang);
    document.documentElement.lang = lang;
    
    // Update language selector if present
    const selector = document.getElementById('lang-select');
    if (selector) selector.value = lang;
  }

  function applyTranslations(lang) {
    if (typeof translations === 'undefined') {
      console.warn('Translations not loaded');
      return;
    }
    
    const t = translations[lang] || translations[DEFAULT_LANG];
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        // Check if it contains HTML (for bold text etc)
        if (t[key].includes('<')) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.placeholder = t[key];
      }
    });
    
    // Translate aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (t[key]) {
        el.setAttribute('aria-label', t[key]);
      }
    });
  }

  function initLanguageSwitcher() {
    const selector = document.getElementById('lang-select');
    if (!selector) return;
    
    const currentLang = getCurrentLang();
    selector.value = currentLang;
    
    // Apply initial translations
    applyTranslations(currentLang);
    document.documentElement.lang = currentLang;
    
    // Listen for changes
    selector.addEventListener('change', (e) => {
      setLang(e.target.value);
    });
  }

  /**
   * Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior)
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  /**
   * Add current year to any element with data-current-year attribute
   */
  function initCurrentYear() {
    const yearElements = document.querySelectorAll('[data-current-year]');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }

  /**
   * Countdown timer (optional - uncomment and add element to use)
   * Add this to your HTML: <div id="countdown" data-date="2026-09-12T15:00:00"></div>
   */
  function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    const targetDate = new Date(countdownEl.dataset.date).getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        countdownEl.innerHTML = '<p>The big day is here!</p>';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      countdownEl.innerHTML = `
        <div class="countdown-item"><span class="countdown-number">${days}</span><span class="countdown-label">Days</span></div>
        <div class="countdown-item"><span class="countdown-number">${hours}</span><span class="countdown-label">Hours</span></div>
        <div class="countdown-item"><span class="countdown-number">${minutes}</span><span class="countdown-label">Minutes</span></div>
        <div class="countdown-item"><span class="countdown-number">${seconds}</span><span class="countdown-label">Seconds</span></div>
      `;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /**
   * Lazy load images with data-src attribute
   */
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Initialize all features when DOM is ready
   */
  function init() {
    initLanguageSwitcher();
    initSmoothScroll();
    initCurrentYear();
    initCountdown();
    initLazyLoad();
    
    // Log for debugging (remove in production)
    console.log('Wedding website JS loaded successfully');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
