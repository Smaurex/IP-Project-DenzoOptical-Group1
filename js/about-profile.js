function setApiError(element, message = '') {
    if (element) {
        element.textContent = message;
    }
}

function setValue(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.value = value || '';
    }
}

function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value || '';
    }
}

function updateProfilePictureDisplay(imageId) {
    const image = document.getElementById('pfp_img');
    if (image) {
        image.src = `../profile_pics/${encodeURIComponent(imageId)}?t=${Date.now()}`;
    }
}

async function loadAboutEditor() {
    const error = document.getElementById('aboutApiError');
    try {
        const response = await window.apiRequest('/about');
        const about = response.data;
        setValue('[name="doctorName"]', about.doctorName);
        setValue('[name="mobile"]', about.mobile);
        setValue('[name="telephone"]', about.telephone);
        setValue('[name="address"]', about.address);
        setValue('[name="credentials"]', about.credentials);
        setApiError(error);
    } catch (requestError) {
        setApiError(error, requestError.message);
    }
}

async function loadAboutView() {
    const error = document.getElementById('aboutApiError');
    try {
        const [aboutResponse, credentialResponse] = await Promise.all([
            window.apiRequest('/about'),
            window.apiRequest('/credentials')
        ]);
        const about = aboutResponse.data;
        const headerImage = document.getElementById('about-header-img');
        const doctorImage = document.getElementById('about-doctor-img');
        if (headerImage && about.headerImgName_id) {
            headerImage.src = `../uploads/${encodeURIComponent(about.headerImgName_id)}`;
        }
        if (doctorImage && about.doctorImgName_id) {
            doctorImage.src = `../uploads/${encodeURIComponent(about.doctorImgName_id)}`;
        }
        setText('[data-about="doctorName"]', about.doctorName);
        setText('[data-about="telephone"]', about.telephone);
        setText('[data-about="mobile"]', about.mobile);
        setText('[data-about="email"]', about.email);
        setText('[data-about="address"]', about.address);
        setText('[data-about="credentials"]', about.credentials);

        const credentialContainer = document.getElementById('credentialsList');
        if (credentialContainer) {
            credentialContainer.replaceChildren();
            credentialResponse.data.forEach((credential) => {
                const image = document.createElement('img');
                image.className = 'header-img-patient';
                image.src = `../uploads/${encodeURIComponent(credential.credential_pic_id)}`;
                image.alt = credential.credential_pic_originalName;
                credentialContainer.appendChild(image);
            });
        }
        setApiError(error);
    } catch (requestError) {
        setApiError(error, requestError.message);
    }
}

const aboutEditor = document.getElementById('about-editor');
if (aboutEditor) {
    loadAboutEditor();

    aboutEditor.querySelectorAll('[data-about-field]').forEach((form) => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const field = form.dataset.aboutField;
            const input = form.elements[field];
            const error = form.querySelector('.error');
            setApiError(error);

            try {
                await window.apiRequest('/about', {
                    method: 'PUT',
                    body: JSON.stringify({ [field]: input.value })
                });
            } catch (requestError) {
                setApiError(error, requestError.message);
            }
        });
    });

    [
        ['header-img-about-form', 'header-img', '/about/header-image'],
        ['doctor-img-about-form', 'doctor-img', '/about/doctor-image']
    ].forEach(([formId, field, endpoint]) => {
        const form = document.getElementById(formId);
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const error = form.querySelector('.error');
            setApiError(error);
            const input = form.querySelector('input[type="file"]');
            if (!input.files.length) {
                setApiError(error, 'Please choose an image.');
                return;
            }

            const body = new FormData();
            body.append(field, input.files[0]);
            try {
                await window.apiRequest(endpoint, { method: 'PUT', body });
                form.querySelector('[data-file-name]').textContent = input.files[0].name;
            } catch (requestError) {
                setApiError(error, requestError.message);
            }
        });
    });
}

if (document.getElementById('about-header-img')) {
    loadAboutView();
}

const profilePictureForm = document.getElementById('pfp-img-form');
if (profilePictureForm) {
    const error = document.getElementById('profilePicApiError');

    window.apiRequest('/users/me')
        .then((response) => updateProfilePictureDisplay(response.data.profile_pic))
        .catch((requestError) => setApiError(error, requestError.message));

    profilePictureForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        setApiError(error);
        const input = profilePictureForm.querySelector('input[type="file"]');
        if (!input.files.length) {
            setApiError(error, 'Please choose an image.');
            return;
        }

        const body = new FormData();
        body.append('pfp-img', input.files[0]);
        try {
            const response = await window.apiRequest('/users/me/profile-pic', {
                method: 'PUT',
                body
            });
            updateProfilePictureDisplay(response.data.profile_pic);
            document.getElementById('file-name-pfp').textContent = input.files[0].name;
        } catch (requestError) {
            setApiError(error, requestError.message);
        }
    });

    const resetButton = document.getElementById('reset-profile-pic');
    if (resetButton) {
        resetButton.addEventListener('click', async () => {
            setApiError(error);
            try {
                const response = await window.apiRequest('/users/me/profile-pic', {
                    method: 'DELETE'
                });
                updateProfilePictureDisplay(response.data.profile_pic);
                profilePictureForm.reset();
                document.getElementById('file-name-pfp').textContent = 'Upload Image';
            } catch (requestError) {
                setApiError(error, requestError.message);
            }
        });
    }
}

const profilePage = document.getElementById('profile-page');
if (profilePage) {
    window.apiRequest('/users/me')
        .then((response) => {
            const user = response.data;
            updateProfilePictureDisplay(user.profile_pic);
            setText('[data-profile="username"]', user.username);
            setText('[data-profile="email"]', user.email);
            setText('[data-profile="role"]', user.role);
        })
        .catch((error) => setApiError(document.getElementById('profileApiError'), error.message));
}
