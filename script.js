// ===== Part 1: Event Handling and Interactive Elements =====

// Light/Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Collapsible FAQ Section
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const questionBtn = item.querySelector('.faq-question');
  questionBtn.addEventListener('click', () => {
    // Toggle active class to show/hide answer
    item.classList.toggle('active');
  });
});

// ===== Part 3: Form Validation =====

const form = document.getElementById('signup-form');
const nameInput = form.elements['name'];
const emailInput = form.elements['email'];
const passwordInput = form.elements['password'];
const formFeedback = document.getElementById('form-feedback');

// Helper function to show error message for an input
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector('.error-message');
  errorMsg.textContent = message;
  errorMsg.style.display = 'block';
  input.classList.add('invalid');
}

// Helper function to clear error message for an input
function clearError(input) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector('.error-message');
  errorMsg.textContent = '';
  errorMsg.style.display = 'none';
  input.classList.remove('invalid');
}

// Validation functions
function validateName() {
  const name = nameInput.value.trim();
  if (name === '') {
    showError(nameInput, 'Name cannot be empty.');
    return false;
  }
  clearError(nameInput);
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  // Simple email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    showError(emailInput, 'Email cannot be empty.');
    return false;
  } else if (!emailPattern.test(email)) {
    showError(emailInput, 'Please enter a valid email address.');
    return false;
  }
  clearError(emailInput);
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  // Password must be at least 6 characters, contain a number and a letter
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (password === '') {
    showError(passwordInput, 'Password cannot be empty.');
    return false;
  } else if (!passwordPattern.test(password)) {
    showError(passwordInput, 'Password must be at least 6 characters and include letters and numbers.');
    return false;
  }
  clearError(passwordInput);
  return true;
}

// Validate on input for real-time feedback
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Form submit event handler
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPasswordValid) {
    formFeedback.textContent = 'Form submitted successfully! 🎉';
    formFeedback.style.color = 'green';
    form.reset();
    // Clear all errors after reset
    clearError(nameInput);
    clearError(emailInput);
    clearError(passwordInput);
  } else {
    formFeedback.textContent = 'Please fix the errors above and try again.';
    formFeedback.style.color = '#d93025';
  }
});
