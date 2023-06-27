// inputs
const form = document.querySelector('form');
const input = document.querySelectorAll('input');

const { firstname, lastname, email, password } = Object.fromEntries(
  Array.from(input).map((element) => [element.id, element])
);


// forms
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// errors
const getElementByIds = (...ids) => {
  const elements = {};
  ids.forEach((id) => {
    elements[id] = document.getElementById(id);
  });
  return elements;
};

const { fnameError, lnameError, emailError, passwordError } = getElementByIds(
  'fnameError',
  'lnameError',
  'emailError',
  'passwordError'
);

const message = document.querySelector('span');


// button
const logoutBtn = document.getElementById('logout');


// user signup
if (signupForm) {

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstNameValue = firstname.value.trim();
    const lastNameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    const min = 2;

    if (firstNameValue === '') {
      fnameError.innerText = 'Firstname is required.'
      fnameError.classList.add('error');
      firstname.style.border = '2px solid red';

    } else if (firstNameValue.length < min) {
      fnameError.innerText = 'Minimum length required is 2.';
      fnameError.classList.add('error');
      firstname.style.border = '2px solid red';

    } else if (!validName(firstNameValue)) {
      fnameError.innerText = 'Firstname is not valid.';
      fnameError.classList.add('error');
      firstname.style.border = '2px solid red';

    } else {
      localStorage.setItem('firstname', firstNameValue);
      fnameError.innerText = '';
      firstname.style.border = '2px solid green';
    }


    if (lastNameValue === '') {
      lnameError.innerText = 'Lastname is required.';
      lnameError.classList.add('error');
      lastname.style.border = '2px solid red';

    } else if (lastNameValue.length < 2) {
      lnameError.innerText = 'Minimum length required is 2.';
      lnameError.classList.add('error');
      lastname.style.border = '2px solid red';

    } else if (!validName(lastNameValue)) {
      lnameError.innerText = 'Lastname is not valid.';
      lnameError.classList.add('error');
      firstname.style.border = '2px solid red';

    } else {
      localStorage.setItem('lastname', lastNameValue);
      lnameError.innerText = '';
      lastname.style.border = '2px solid green';
    }


    if (emailValue === '') {
      emailError.innerText = 'Email Address is required.';
      emailError.classList.add('error');
      email.style.border = '2px solid red';

    } else if (!validEmail(emailValue)) {
      emailError.innerText = 'Email Address is not valid.';
      emailError.classList.add('error');
      email.style.border = '2px solid red';

    } else {
      localStorage.setItem('email', emailValue);
      emailError.innerText = '';
      email.style.border = '2px solid green';
    }

    
    if (passwordValue === '') {
      passwordError.innerText = 'Password is required.';
      passwordError.classList.add('error');
      password.style.border = '2px solid red';

    } else if (!validPassword(passwordValue)) {
      passwordError.innerText = 'Minimum length required is 8, at least one letter, \n one number, and one special character.';
      passwordError.classList.add('error');
      password.style.border = '2px solid red';

    } else {
      localStorage.setItem('password', passwordValue);
      passwordError.innerText = '';
      password.style.border = '2px solid green';
    }


    const getItemsFromLocalStorage = (...keys) => {
      const items = {};
      keys.forEach((key) => {
        items[key] = localStorage.getItem(key);
      });
      return items;
    };
    
    const { firstname: getFirstName, lastname: getLastName, email: getEmail, password: getPassword } = getItemsFromLocalStorage(
      'firstname',
      'lastname',
      'email',
      'password'
    );    


    const getSignup = getFirstName && getLastName && getEmail && getPassword;
    const getSignupValue = firstNameValue && lastNameValue && emailValue && passwordValue;


    if (getSignupValue === '') {
      message.innerText = 'All fields are required.';
      message.classList.remove('success-message');
      message.classList.add('error-message');
    } else if (getSignup != null) {
      message.innerText = 'Account successfully created.';
      message.classList.remove('error-message');
      message.classList.add('success-message');

      for (let i = 0; i < input.length; i++) {
        input[i].value = '';
      }

    }
  });
}


// regular expressions
function validName(name) {
  const re = /^[a-zA-Z]+$/;
  return re.test(name);
}

function validEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validPassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
}


//user login
if (loginForm) {

  loginForm.addEventListener('submit', function(e){
    e.preventDefault();

  
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    const getEmailAddress = localStorage.getItem('email');
    const getPasword = localStorage.getItem('password');
    
    
    if (emailValue === getEmailAddress && passwordValue === getPasword) {
      location.href = 'mem.html';

    } else if (emailValue === '' || passwordValue === '') {
      message.innerText = 'Email address and password are required.';
      message.classList.add('error-message');
      email.style.border = '2px solid red';
      password.style.border = '2px solid red';

    } else if (!validEmail(emailValue)) {
      message.innerText = 'Email address is not valid.';
      message.classList.add('error-message');

    } else {
      message.innerText = 'Invalid email address or password.';
      message.classList.add('error-message');
      email.style.border = '2px solid red';
      password.style.border = '2px solid red';
    }
  });

}

// user logout
if (logoutBtn) {

  const firstname = document.getElementById('firstname');
const logoutBtn = document.getElementById('logoutBtn');

firstname.textContent = localStorage.getItem('firstname');
firstname.style.color = 'orange';

function logoutBtnClickHandler() {
  location.replace('index.html');
}

logoutBtn.addEventListener('click', logoutBtnClickHandler);


}


// responsive menu 
const links = document.querySelector('.nav-links');
const openMenu = document.querySelector('.open-menu');
const closeMenu = document.querySelector('.close-menu');
function openMenuClickHandler() {
  links.style.display = 'flex';
  links.style.top = '0';
}
function closeMenuClickHandler() {
  links.style.top = '-100%';
}
openMenu.addEventListener('click', openMenuClickHandler);
closeMenu.addEventListener('click', closeMenuClickHandler);
