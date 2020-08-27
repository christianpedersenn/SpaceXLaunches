var button = document.getElementById('submitContact');
var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var email = document.getElementById('email');
var phone = document.getElementById('phone');

var firstNameError = document.getElementById('firstNameError');
var lastNameError = document.getElementById('lastNameError');
var phoneError = document.getElementById('phoneError');
var emailError = document.getElementById('emailError');

var firstNameResult = document.getElementById('firstNameResult');
var lastNameResult = document.getElementById('lastNameResult');
var emailResult = document.getElementById('emailResult');
var phoneResult = document.getElementById('phoneResult');

// Validate functions
function validateFirstName(){
    if (firstName.value === "" || /[^a-zA-Z]{1,30}$/.test(firstName.value)) { // Check to see if value is empty or if it contains a number or special characters
      return false;
    } else {
      return true;
    }
}
function validateLastName(){
  if (lastName.value === "" || /[^a-zA-Z]{1,30}$/.test(lastName.value)) { // Check to see if value is empty or if it contains a number
    return false;
  } else {
    return true;
  }
}
function validateEmail(){
    // if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value)) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)) {
      return true;
    } else {
      return false;
    }
}
function validatePhoneNumber(){
  if (/^\(?([0-9]{3})\)?[. -]?([0-9]{3})[. -]?([0-9]{4})$/.test(phone.value)) {
    return true;
  } else {
    return false;
  }
}

// On button click
button.addEventListener('click', function() {

  if (validateFirstName(firstName) === false) {
    firstNameError.style.display = "block"
  } else {
    firstNameError.style.display = "none"
  }

  if (validateLastName(lastName) === false) {
    lastNameError.style.display = "block"
  } else {
    lastNameError.style.display = "none"
  }

  if (validateEmail(email) === false) {
    emailError.style.display = "block"
  } else {
    emailError.style.display = "none"
  }

  if (validatePhoneNumber(phone) === false) {
    phoneError.style.display = "block"
  } else {
    phoneError.style.display = "none"
  }
});
