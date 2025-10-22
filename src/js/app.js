// JS Goes here - ES6 supported

// Initialize PhotoSwipe for lightbox functionality
function initializePhotoSwipe() {
  if (window.PhotoSwipeLightbox && window.PhotoSwipeDynamicCaption) {
    // Initialize PhotoSwipe for all lightbox links
    const lightbox = new window.PhotoSwipeLightbox({
      gallery: '.quad-view-container, .carousel-container, .gallery-container',
      children: 'a[data-pswp-src]',
      showHideOpacity: true,
      bgOpacity: 0.8,
      spacing: 0.1,
      allowPanToNext: true,
      loop: true,
      preloadFirstSlide: true,
      arrowKeys: true,
      escKey: true,
      returnFocus: true,
      maxWidthToAnimate: 4000,
      clickToCloseNonZoomable: true,
      imageClickAction: 'toggle-controls',
      tapAction: 'toggle-controls',
      doubleTapAction: 'zoom',
      bgClickAction: 'close',
      pswpModule: window.PhotoSwipe
    });

    // Initialize the dynamic caption plugin
    const captionPlugin = new window.PhotoSwipeDynamicCaption(lightbox, {
      type: 'auto',
      captionContent: (slide) => {
        const link = slide.data.element;
        return link ? link.dataset.pswpCaption || link.querySelector('img')?.alt || '' : '';
      }
    });

    // Add download button
    lightbox.on('uiRegister', function() {
      lightbox.pswp.ui.registerElement({
        name: 'download-button',
        order: 8,
        isButton: true,
        html: {
          isCustomSVG: true,
          inner: '<path d="M23.5 17.5c-.3 0-.5.2-.5.5v2.9c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V18c0-.3-.2-.5-.5-.5s-.5.2-.5.5v2.9c0 1.4 1.1 2.5 2.5 2.5h18.9c1.4 0 2.5-1.1 2.5-2.5V18c0-.3-.2-.5-.5-.5z"/><path d="M11.5 14.5c.1.1.3.2.5.2s.4-.1.5-.2l5.5-5.5c.3-.3.3-.8 0-1.1s-.8-.3-1.1 0L12 12.4V1c0-.4-.3-.8-.8-.8s-.8.4-.8.8v11.4L6.6 7.9c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1l5.5 5.5z"/>',
          outlineID: 'pswp__icn-download'
        },
        onInit: (el, pswp) => {
          el.setAttribute('title', 'Download image');
          el.setAttribute('aria-label', 'Download image');
          el.onclick = () => {
            const link = document.createElement('a');
            link.href = pswp.currSlide.data.src;
            link.download = '';
            link.click();
          };
        }
      });
    });

    lightbox.init();
  }
}

// Initialize Splide carousels and galleries
function initializeSplide() {
  if (window.Splide) {
    // Initialize all carousels
    document.querySelectorAll('.carousel-container .splide').forEach((carousel, index) => {
      if (!carousel.classList.contains('splide--initialized')) {
        new window.Splide(carousel, {
          type: 'slide',
          perPage: 1,
          perMove: 1,
          arrows: true,
          pagination: true,
          autoplay: false,
          interval: 3000,
          pauseOnHover: true,
          resetProgress: false,
          speed: 400,
          rewind: true,
          width: '100%',
          height: 'auto',
          cover: true,
          focus: 'center',
          gap: '1rem',
          padding: '1rem',
          breakpoints: {
            768: {
              perPage: 1,
              gap: '0.5rem',
              padding: '0.5rem'
            }
          }
        }).mount();
      }
    });

    // Initialize all galleries
    document.querySelectorAll('.gallery-container .gallery-main').forEach((mainGallery) => {
      if (!mainGallery.classList.contains('splide--initialized')) {
        const thumbGallery = mainGallery.parentElement.querySelector('.gallery-thumbs');
        
        const mainSplide = new window.Splide(mainGallery, {
          type: 'slide',
          perPage: 1,
          perMove: 1,
          arrows: true,
          pagination: false,
          autoplay: false,
          speed: 400,
          width: '100%',
          height: '400px',
          cover: true,
          focus: 'center',
          gap: '1rem',
          padding: '1rem',
          breakpoints: {
            768: {
              height: '300px',
              gap: '0.5rem',
              padding: '0.5rem'
            }
          }
        });

        if (thumbGallery) {
          const thumbSplide = new window.Splide(thumbGallery, {
            fixedWidth: 100,
            fixedHeight: 80,
            gap: '0.5rem',
            rewind: true,
            pagination: false,
            arrows: false,
            isNavigation: true,
            breakpoints: {
              768: {
                fixedWidth: 80,
                fixedHeight: 60
              }
            }
          });

          // Sync thumbnails with main gallery
          mainSplide.sync(thumbSplide);
          thumbSplide.mount();
        }

        mainSplide.mount();
      }
    });
  }
}

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
  
  // Initialize PhotoSwipe for lightbox functionality
  initializePhotoSwipe();
  
  // Initialize Splide carousels and galleries
  initializeSplide();
});
