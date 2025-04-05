// Utility: Get users from localStorage (or empty array if none)
function getUsers() {
    return JSON.parse(localStorage.getItem('sweetshop-users')) || [];
  }
  
  // Utility: Save users array to localStorage
  function saveUsers(users) {
    localStorage.setItem('sweetshop-users', JSON.stringify(users));
  }
  
  // Toggle between login and signup forms
  function toggleForm(formType) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-message').innerText = "";
    document.getElementById('signup-message').innerText = "";
  
    if (formType === 'signup') {
      document.getElementById('signup-form').classList.remove('hidden');
    } else {
      document.getElementById('login-form').classList.remove('hidden');
    }
  }
  
  // Toggle password visibility for a given field
  function togglePassword(fieldId, toggleButton) {
    const passwordField = document.getElementById(fieldId);
    const icon = toggleButton.querySelector('i');
  
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
  
  // Signup function with validation and already registered email check
  function signupUser() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const messageElem = document.getElementById('signup-message');
  
    if (!name || !email || !password || !confirmPassword) {
      messageElem.style.color = 'red';
      messageElem.innerText = "Please fill in all fields.";
      return;
    }
  
    if (password !== confirmPassword) {
      messageElem.style.color = 'red';
      messageElem.innerText = "Passwords do not match.";
      return;
    }
  
    const users = getUsers();
    const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      messageElem.style.color = 'red';
      messageElem.innerText = "User with this email already exists.";
      return;
    }
  
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
  
    messageElem.style.color = 'green';
    messageElem.innerText = "Sign Up successful! Please log in.";
    setTimeout(() => {
      toggleForm('login');
    }, 1500);
  }
  
  // Login function
  function loginUser() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const messageElem = document.getElementById('login-message');
  
    const users = getUsers();
    if (!users.length) {
      messageElem.style.color = 'red';
      messageElem.innerText = "No users found. Please sign up first.";
      return;
    }
  
    const user = users.find(
      user =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );
  
    if (user) {
      messageElem.style.color = 'green';
      messageElem.innerText = "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "shop.html"; // Update with your shop page
      }, 1000);
    } else {
      messageElem.style.color = 'red';
      messageElem.innerText = "Invalid credentials.";
    }
  }
  