let form = document.getElementById('formSignup');
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let pass = document.getElementById('pass');
let passConf = document.getElementById('passConf');
let clear = document.getElementById('clear');

clear.addEventListener('click', e => {
    let isConfirmed = confirm('Would you like to clear the form?');
    if (isConfirmed) {
        document.getElementById("formSignup").reset();
    }
});

form.addEventListener('submit', e => {
    console.log("Form submit triggered");
    e.preventDefault(); // Prevent default submission

    if (validateUserInput()) {
        console.log("Validation passed. Submitting form...");
        form.submit(); // Submit form manually after validation
    } else {
        console.log("Validation failed.");
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const validateUserInput = () => {
    let isValid = 1; // Assume valid

    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const emailValue = email.value.trim();
    const passValue = pass.value.trim();
    const passConfValue = passConf.value.trim();

    if (fnameValue === '') {
        setError(fname, '*First name required');
        isValid = 0;
    } else {
        setSuccess(fname);
    }

    if (lnameValue === '') {
        setError(lname, '*Last name required');
        isValid = 0;
    } else {
        setSuccess(lname);
    }

    if (emailValue === '') {
        setError(email, '*Email required');
        isValid = 0;
    } else if (!isValidEmail(emailValue)) {
        setError(email, '*Provide a valid email address');
        isValid = 0;
    } else {
        setSuccess(email);
    }

    if (passValue === '') {
        setError(pass, '*Password required');
        isValid = 0;
    } else {
        setSuccess(pass);
    }

    if (passConfValue === '') {
        setError(passConf, '*Password confirmation required');
        isValid = 0;
    } else if (passConfValue !== passValue) {
        setError(passConf, '*Passwords do not match');
        isValid = 0;
    } else {
        setSuccess(passConf);
    }

    if (isValid == 1) {
        return isValid;
    } 
};
