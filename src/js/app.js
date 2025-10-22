// JS Goes here - ES6 supported


// Return to top button functionality
document.addEventListener('DOMContentLoaded', function() {
  const returnToTopBtn = document.getElementById('return-to-top');
  const tocContainer = document.querySelector('.toc-container');
  const tocSidebar = document.querySelector('.toc-sidebar');
  
  console.log('Return to top button:', returnToTopBtn);
  console.log('TOC container:', tocContainer);
  console.log('TOC sidebar:', tocSidebar);
  
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
      console.log('TOC container found:', tocContainer);
      
      // Always scroll to top of page for now
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // TOC sidebar scrolling - sync with main page scroll
  if (tocSidebar) {
    const tocContent = tocSidebar.querySelector('.toc-content');
    if (tocContent) {
      window.addEventListener('scroll', function() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const tocScrollMax = tocContent.scrollHeight - tocSidebar.clientHeight;
        const tocScrollPosition = scrollPercent * tocScrollMax;
        
        tocContent.scrollTop = tocScrollPosition;
      });
    }
  }
  
  // TOC title link functionality
  const tocTitleLink = document.querySelector('.toc-title-link');
  if (tocTitleLink) {
    tocTitleLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // TOC current section highlighting
  const tocLinks = document.querySelectorAll('.toc-content a[href^="#"]');
  const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
  
  if (tocLinks.length > 0 && headings.length > 0) {
    function updateActiveTocLink() {
      let current = '';
      const scrollPosition = window.scrollY + 100; // Offset for header
      
      // Check if we're at the top of the page
      if (scrollPosition < 200) {
        // Remove active class from all links
        tocLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Highlight title link when at top
        if (tocTitleLink) {
          tocTitleLink.classList.add('active');
        }
        return;
      }
      
      headings.forEach(heading => {
        const headingTop = heading.offsetTop;
        if (scrollPosition >= headingTop) {
          current = heading.getAttribute('id');
        }
      });
      
      // Remove active class from all links including title
      tocLinks.forEach(link => {
        link.classList.remove('active');
      });
      if (tocTitleLink) {
        tocTitleLink.classList.remove('active');
      }
      
      // Add active class to current section link
      if (current) {
        const activeLink = document.querySelector(`.toc-content a[href="#${current}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          
          // Auto-scroll sidebar to show active link
          const tocSidebar = document.querySelector('.toc-sidebar');
          if (tocSidebar) {
            const sidebarRect = tocSidebar.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            
            // Check if link is outside visible area
            if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
              // Scroll the sidebar to center the active link
              const sidebarScrollTop = tocSidebar.scrollTop;
              const linkOffsetTop = activeLink.offsetTop;
              const sidebarHeight = tocSidebar.clientHeight;
              const linkHeight = activeLink.offsetHeight;
              
              // Center the link in the sidebar
              const targetScrollTop = linkOffsetTop - (sidebarHeight / 2) + (linkHeight / 2);
              
              tocSidebar.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: 'smooth'
              });
            }
          }
        }
      }
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveTocLink);
    
    // Update on page load
    updateActiveTocLink();
  }
});
