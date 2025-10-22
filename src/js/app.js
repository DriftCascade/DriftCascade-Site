// JS Goes here - ES6 supported


// Return to top button functionality
document.addEventListener('DOMContentLoaded', function() {
  const returnToTopBtn = document.getElementById('return-to-top');
  const tocContainer = document.querySelector('.toc-container');
  
  console.log('Return to top button:', returnToTopBtn);
  console.log('TOC container:', tocContainer);
  
  if (returnToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        returnToTopBtn.classList.add('visible');
      } else {
        returnToTopBtn.classList.remove('visible');
      }
    });
    
    // Handle button click - scroll to TOC or top of page
    returnToTopBtn.addEventListener('click', function() {
      console.log('Return to top clicked');
      if (tocContainer) {
        tocContainer.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Fallback to top of page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }
});
