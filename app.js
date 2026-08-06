/* ==========================================================================
   NAJI RK - KEYNOTE & BEHANCE PORTFOLIO INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide-section');
  const slideCounter = document.getElementById('slideCounter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const jumpSelect = document.getElementById('slideJump');
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  
  // Populate Jump Select Options
  slides.forEach((slide, index) => {
    const title = slide.querySelector('.section-title')?.innerText || slide.getAttribute('data-title') || `Slide ${index + 1}`;
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${String(index + 1).padStart(2, '0')}. ${title.substring(0, 30)}`;
    if (jumpSelect) jumpSelect.appendChild(option);
  });

  function updateSlideState() {
    // Determine which slide is currently in view
    let activeIndex = 0;
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    slides.forEach((slide, idx) => {
      const top = slide.offsetTop;
      const height = slide.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeIndex = idx;
      }
    });

    currentSlideIndex = activeIndex;
    
    // Update Counter
    if (slideCounter) {
      slideCounter.innerText = `Slide ${String(currentSlideIndex + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
    }
    
    if (jumpSelect) {
      jumpSelect.value = currentSlideIndex;
    }
  }

  function scrollToSlide(index) {
    if (index >= 0 && index < totalSlides) {
      slides[index].scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Event Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      scrollToSlide(currentSlideIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      scrollToSlide(currentSlideIndex + 1);
    });
  }

  if (jumpSelect) {
    jumpSelect.addEventListener('change', (e) => {
      scrollToSlide(parseInt(e.target.value, 10));
    });
  }

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      if (currentSlideIndex < totalSlides - 1) {
        e.preventDefault();
        scrollToSlide(currentSlideIndex + 1);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (currentSlideIndex > 0) {
        e.preventDefault();
        scrollToSlide(currentSlideIndex - 1);
      }
    }
  });

  window.addEventListener('scroll', updateSlideState);
  updateSlideState();
});
