// Mobile navigation toggle
    document.querySelector('.mobile-toggle').addEventListener('click', function() {
      document.querySelector('.nav-links').classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const navLinks = document.querySelector('.nav-links');
      const toggleBtn = document.querySelector('.mobile-toggle');
      
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(event.target) && 
          !toggleBtn.contains(event.target)) {
        navLinks.classList.remove('active');
      }
    });
    
    // Form submission handling
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message
      document.getElementById('successMessage').style.display = 'block';
      
      // Reset form
      document.getElementById('contactForm').reset();
      
      // Hide success message after 5 seconds
      setTimeout(function() {
        document.getElementById('successMessage').style.display = 'none';
      }, 5000);
    });
    
    // Set current year in footer
    document.querySelector('.footer-bottom p').innerHTML = 
      `&copy; ${new Date().getFullYear()} RoomRental. All rights reserved.`;