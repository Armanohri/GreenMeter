export function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".fade-up, .fade-in, .zoom-in"
  );

  // Check if elements are already in viewport and show them immediately
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const isInViewport = 
      rect.top < window.innerHeight * 1.5 && // More generous viewport check
      rect.bottom > -100 && 
      rect.left < window.innerWidth && 
      rect.right > 0;
    
    if (isInViewport) {
      // Element is already visible, add show class immediately
      el.classList.add("show");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { 
      threshold: 0.05, // Lower threshold to trigger earlier
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before element enters viewport
    }
  );

  elements.forEach((el) => {
    // Observe all elements - observer will handle duplicates
    observer.observe(el);
  });
}
