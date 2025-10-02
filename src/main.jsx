import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Throttle function for better performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Fix viewport height issues on mobile devices
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Handle orientation change and resize events with throttling
const handleViewportChange = throttle(() => {
  setViewportHeight();
  
  // Force reflow to prevent freezing
  document.body.style.height = 'auto';
  setTimeout(() => {
    document.body.style.height = '';
  }, 50);
}, 100);

// Initialize viewport height
setViewportHeight();

// Add event listeners for viewport changes
window.addEventListener('resize', handleViewportChange, { passive: true });
window.addEventListener('orientationchange', () => {
  // Delay to ensure orientation change is complete
  setTimeout(handleViewportChange, 100);
}, { passive: true });

// Optimize scroll performance
let ticking = false;
function updateScrollPosition() {
  // Any scroll-related updates can go here
  ticking = false;
}

function requestScrollUpdate() {
  if (!ticking) {
    requestAnimationFrame(updateScrollPosition);
    ticking = true;
  }
}

window.addEventListener('scroll', requestScrollUpdate, { passive: true });

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

// Prevent horizontal scroll and improve touch performance
document.addEventListener('touchmove', function(e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

// Smooth scroll polyfill for better cross-browser support
if (!('scrollBehavior' in document.documentElement.style)) {
  const smoothScrollPolyfill = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };
  
  // Apply polyfill after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', smoothScrollPolyfill);
  } else {
    smoothScrollPolyfill();
  }
}

// Optimize rendering performance
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[loading="eager"]');
    criticalImages.forEach(img => {
      if (img.complete) return;
      img.loading = 'eager';
    });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
