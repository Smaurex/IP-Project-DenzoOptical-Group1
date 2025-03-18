let form = document.getElementById('form');
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let pass1 = document.getElementById('pass1');
let pass2 = document.getElementById('pass2');
let clear = document.getElementById('clear');

clear.addEventListener('click', e=>{
    let isConfirmed = confirm('Would you like to clear the form?');
    if(isConfirmed){ 
        document.getElementById("form").reset();
    }
});

form.addEventListener('submit', e =>{
    e.preventDefault();
    validateUserInput();
});



const setError = (element, message) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');  
}

const setSuccess = element =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error'); 
}

const isValidEmail = email =>{
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

const validateUserInput = () =>{
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const emailValue = email.value.trim();
    const pass1Value = pass1.value.trim();
    const pass2Value = pass2.value.trim();

if(fnameValue !== '' && lnameValue !== '' && emailValue !== ''  && pass1Value !== '' && pass2Value!== ''){
        
        let isValid = true;
        
        if(fnameValue === ''){
            setError(fname, 'First name required');
            isValid = false;
        }else{
            setSuccess(fname);
        }

        if(lnameValue === ''){
            setError(lname, 'Last name required');
            isValid = false;
        }else{
            setSuccess(lname);
        }

        if(emailValue === ''){
            setError(email, 'Email required');
            isValid = false;
        }else if(!isValidEmail(emailValue)){
            setError(email, 'provide valid email address');
            isValid = false;
        }else{
            setSuccess(email);
        }

        if(pass1Value ===''){
            setError(pass1, 'password required');
            isValid = false;
        }else{
            setSuccess(pass1);
        }

        if(pass2Value ===''){
            setError(pass2, 'password required');
            isValid = false;
        }else if(pass2Value !== pass1Value){
            setError(pass2, 'password does not match');
            isValid = false;
        }else{
            setSuccess(pass2);
        }
        if (isValid) {
            form.submit();
        }
    }
    else{
        alert("Atleast one field is empty.");  
    }
   
}



