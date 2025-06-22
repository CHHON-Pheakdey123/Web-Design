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
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(0, 74, 173, 0.95)';
      } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        header.style.background = '#004aad';
      }
    });
    
    // Login Modal Functionality
    const loginBtn = document.getElementById('loginBtn');
    const closeModal = document.getElementById('closeModal');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    // Show modal
    loginBtn.addEventListener('click', () => {
      loginModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
      loginModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside modal
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
    
    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Form submission
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Simple validation
      if (email && password) {
        // Change button to loading state
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
          // Show success message
          document.querySelector('.modal-header h2').textContent = "Welcome Back!";
          document.querySelector('.modal-body').innerHTML = `
            <div style="text-align:center; padding:30px;">
              <i class="fas fa-check-circle" style="font-size:60px; color:#27ae60; margin-bottom:20px;"></i>
              <h3 style="color:#2c3e50; margin-bottom:15px;">Login Successful</h3>
              <p>You are now logged in to your RoomRental account</p>
            </div>
          `;
          
          // Reset form after 2 seconds
          setTimeout(() => {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset modal content after closing
            setTimeout(() => {
              document.querySelector('.modal-header h2').textContent = "Login to Your Account";
              document.querySelector('.modal-body').innerHTML = `
                <div class="social-login">
                  <button class="social-btn facebook">
                    <i class="fab fa-facebook-f"></i> Continue with Facebook
                  </button>
                  <button class="social-btn google">
                    <i class="fab fa-google"></i> Continue with Google
                  </button>
                  <button class="social-btn apple">
                    <i class="fab fa-apple"></i> Continue with Apple
                  </button>
                </div>
                
                <div class="divider">
                  or login with email
                </div>
                
                <form id="loginForm">
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter your email" required>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <div class="password-container">
                      <input type="password" id="password" placeholder="Enter your password" required>
                      <span class="toggle-password" id="togglePassword">
                        <i class="fas fa-eye"></i>
                      </span>
                    </div>
                  </div>
                  <div class="remember-me">
                    <input type="checkbox" id="remember">
                    <label for="remember">Remember me</label>
                  </div>
                  <button type="submit" class="login-btn">Login to Account</button>
                </form>
              `;
              
              // Reattach event listeners
              document.getElementById('loginForm').addEventListener('submit', arguments.callee);
              document.getElementById('togglePassword').addEventListener('click', togglePasswordClick);
            }, 300);
          }, 2000);
        }, 1500);
      } else {
        alert('Please fill in all fields');
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && loginModal.classList.contains('active')) {
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
    
    // Reattach toggle password function
    const togglePasswordClick = () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    };
    
    togglePassword.addEventListener('click', togglePasswordClick);