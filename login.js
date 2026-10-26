const loginForm = document.getElementById('formLogin');
const loginEmail = document.getElementById('emailLogin');
const loginPassword = document.getElementById('passLogin');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateLoginInput()) {
        return;
    }

    try {
        const result = await window.apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: loginEmail.value.trim(),
                password: loginPassword.value
            })
        });

        const sessionResponse = await fetch('../includes/api_session.php', {
            method: 'POST',
            credentials: 'include'
        });
        const sessionResult = await sessionResponse.json();
        if (!sessionResponse.ok || sessionResult.success !== true) {
            throw new Error(sessionResult.error?.message || 'Unable to establish a PHP session.');
        }

        const destinations = {
            doctor: '../doctor/DoctorPage.php',
            assistant: '../assistant/AssistantPage.php',
            patient: '../patient/PatientPage.php'
        };
        const destination = destinations[result.data.role];
        if (!destination) {
            throw new Error('This account has an unsupported role.');
        }
        window.location.href = destination;
    } catch (error) {
        showLoginError(error.message);
    }
});

function validateLoginInput() {
    let valid = true;
    if (loginEmail.value.trim() === '') {
        setLoginError(loginEmail, '*Email required');
        valid = false;
    } else {
        clearLoginError(loginEmail);
    }

    if (loginPassword.value === '') {
        setLoginError(loginPassword, '*Password required');
        valid = false;
    } else {
        clearLoginError(loginPassword);
    }
    return valid;
}

function setLoginError(input, message) {
    const control = input.parentElement;
    control.querySelector('.error').innerText = message;
    control.classList.add('error');
    control.classList.remove('success');
}

function clearLoginError(input) {
    const control = input.parentElement;
    control.querySelector('.error').innerText = '';
    control.classList.remove('error');
    control.classList.add('success');
}

function showLoginError(message) {
    setLoginError(loginEmail, message);
}
