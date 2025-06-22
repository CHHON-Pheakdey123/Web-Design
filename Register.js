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
    
    // Auth Modal Functionality
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const closeModal = document.getElementById('closeModal');
    const authModal = document.getElementById('authModal');
    const modalTitle = document.getElementById('modalTitle');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchText = document.getElementById('switchText');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const formContainers = document.querySelectorAll('.form-container');
    
    // Toggle password visibility
    function setupPasswordToggle(eyeIcon, passwordField) {
      eyeIcon.addEventListener('click', () => {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        eyeIcon.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
      });
    }
    
    // Initialize password toggles
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    setupPasswordToggle(togglePassword, passwordInput);
    
    const regPasswordInput = document.getElementById('regPassword');
    const toggleRegPassword = document.getElementById('toggleRegPassword');
    setupPasswordToggle(toggleRegPassword, regPasswordInput);
    
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    setupPasswordToggle(toggleConfirmPassword, confirmPasswordInput);
    
    // Show login modal
    loginBtn.addEventListener('click', () => {
      authModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      showLoginForm();
    });
    
    // Show register modal
    registerBtn.addEventListener('click', () => {
      authModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      showRegisterForm();
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
      authModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside modal
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
    
    // Tab switching
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        
        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show the corresponding form
        formContainers.forEach(container => container.classList.remove('active'));
        document.getElementById(`${tab}Form`).classList.add('active');
        
        // Update modal title and switch text
        if (tab === 'login') {
          modalTitle.textContent = "Login to Your Account";
          switchText.innerHTML = 'Don\'t have an account? <a id="switchToRegister">Sign Up</a>';
        } else {
          modalTitle.textContent = "Create an Account";
          switchText.innerHTML = 'Already have an account? <a id="switchToLogin">Sign In</a>';
        }
      });
    });
    
    // Switch between login and register forms
    function showLoginForm() {
      tabBtns.forEach(btn => btn.classList.remove('active'));
      document.querySelector('.tab-btn[data-tab="login"]').classList.add('active');
      
      formContainers.forEach(container => container.classList.remove('active'));
      document.getElementById('loginForm').classList.add('active');
      
      modalTitle.textContent = "Login to Your Account";
      switchText.innerHTML = 'Don\'t have an account? <a id="switchToRegister">Sign Up</a>';
    }
    
    function showRegisterForm() {
      tabBtns.forEach(btn => btn.classList.remove('active'));
      document.querySelector('.tab-btn[data-tab="register"]').classList.add('active');
      
      formContainers.forEach(container => container.classList.remove('active'));
      document.getElementById('registerForm').classList.add('active');
      
      modalTitle.textContent = "Create an Account";
      switchText.innerHTML = 'Already have an account? <a id="switchToLogin">Sign In</a>';
    }
    
    // Handle switch links
    document.addEventListener('click', (e) => {
      if (e.target.id === 'switchToRegister') {
        showRegisterForm();
      } else if (e.target.id === 'switchToLogin') {
        showLoginForm();
      }
    });
    
    // Form submissions
    document.getElementById('loginAccountForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (email && password) {
        const loginBtn = this.querySelector('.auth-btn');
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
          // Show success message
          this.innerHTML = `
            <div class="success-message">
              <i class="fas fa-check-circle success-icon"></i>
              <h3>Login Successful</h3>
              <p>Welcome back to RoomRental!</p>
            </div>
          `;
          
          // Close modal after delay
          setTimeout(() => {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset form after closing
            setTimeout(() => {
              document.getElementById('loginAccountForm').innerHTML = `
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
                <button type="submit" class="auth-btn">Login to Account</button>
              `;
              
              // Reattach event listeners
              document.getElementById('loginAccountForm').addEventListener('submit', arguments.callee);
              setupPasswordToggle(document.getElementById('togglePassword'), document.getElementById('password'));
            }, 300);
          }, 2000);
        }, 1500);
      } else {
        alert('Please fill in all fields');
      }
    });
    
    document.getElementById('createAccountForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('regEmail').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (firstName && lastName && email && phone && password && confirmPassword) {
        const registerBtn = this.querySelector('.auth-btn');
        registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        registerBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
          // Show success message
          this.innerHTML = `
            <div class="success-message">
              <i class="fas fa-check-circle success-icon"></i>
              <h3>Registration Successful</h3>
              <p>Your RoomRental account has been created!</p>
            </div>
          `;
          
          // Close modal after delay
          setTimeout(() => {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset form after closing
            setTimeout(() => {
              document.getElementById('createAccountForm').innerHTML = `
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" placeholder="Enter your first name" required>
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" placeholder="Enter your last name" required>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="regEmail">Email Address</label>
                  <input type="email" id="regEmail" placeholder="Enter your email" required>
                </div>
                
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="Enter your phone number" required>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="regPassword">Password</label>
                    <div class="password-container">
                      <input type="password" id="regPassword" placeholder="Create a password" required>
                      <span class="toggle-password" id="toggleRegPassword">
                        <i class="fas fa-eye"></i>
                      </span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <div class="password-container">
                      <input type="password" id="confirmPassword" placeholder="Confirm your password" required>
                      <span class="toggle-password" id="toggleConfirmPassword">
                        <i class="fas fa-eye"></i>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="remember-me">
                  <input type="checkbox" id="terms" required>
                  <label for="terms">I agree to the <a href="#">Terms & Conditions</a></label>
                </div>
                
                <button type="submit" class="auth-btn">Create Account</button>
              `;
              
              // Reattach event listeners
              document.getElementById('createAccountForm').addEventListener('submit', arguments.callee);
              setupPasswordToggle(document.getElementById('toggleRegPassword'), document.getElementById('regPassword'));
              setupPasswordToggle(document.getElementById('toggleConfirmPassword'), document.getElementById('confirmPassword'));
            }, 300);
          }, 2000);
        }, 1500);
      } else {
        alert('Please fill in all fields');
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && authModal.classList.contains('active')) {
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });