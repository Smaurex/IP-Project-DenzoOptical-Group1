const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[character]));

function showInlineError(element, message = '') {
    if (element) {
        element.textContent = message;
    }
}

function itemImageUrl(base, filename) {
    return `${base}${encodeURIComponent(filename)}`;
}

function renderPublicItem(item, imageBase, inquire) {
    const available = Number(item.quantity) !== 0;
    const contactLinks = inquire
        ? `<p>inquire: </p>
           <div style="display: flex; height:90%;">
               <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=maurismattio@gmail.com&amp;su=Inquire%20ITEM%20ID:%20${encodeURIComponent(item.itemID)}&amp;body=Hello%20there!%0AI%20Would%20like%20to%20inquire%20the%20item%20with%20the%20ID%20${encodeURIComponent(item.itemID)}" target="_blank">
                   <i class="fas fa-envelope"></i>
               </a>
               <a href="https://www.facebook.com/profile.php?id=100064047673782">
                   <i class="fa-brands fa-facebook"></i>
               </a>
           </div>`
        : '';

    return `<div class="item-card" id="${escapeHtml(item.itemID)}">
        <div style="height: 70%" class="item-content-img">
            <img style="display: flex; height: 100%; height: 100%;flex: 1 1 0;" src="${escapeHtml(itemImageUrl(imageBase, item.item_pic_id))}" alt="${escapeHtml(item.itemID)}">
        </div>
        <div style="height: 15%" class="item-content">
            <div>
                <p>Item ID: ${escapeHtml(item.itemID)}</p>
                <p>Quantity: ${escapeHtml(item.quantity)}</p>
            </div>
            <p style="color: ${available ? 'green' : 'red'};">${available ? 'available' : 'unavailable'}</p>
        </div>
        <div style="height: 15%" class="item-content">${contactLinks}</div>
    </div>`;
}

function renderManagedItem(item, imageBase) {
    return `<div class="item-edit-form-container">
        <div class="item-pfp-btn-container">
            <div class="item-pfp-container">
                <img class="item-img-pfp" src="${escapeHtml(itemImageUrl(imageBase, item.item_pic_id))}" alt="Item ${escapeHtml(item.itemID)}">
            </div>
            <div class="item-changePfp-btn-container">
                <button class="item-changePfp-btn icon-button" type="button" data-action="choose-image" aria-label="Change item image">
                    <i class="fa-solid fa-image"></i>
                </button>
                <input type="file" accept=".jpg,.jpeg,.png,.gif" data-action="replace-image" hidden>
            </div>
        </div>
        <div class="item-quantity-container">
            <div>Item ID: ${escapeHtml(item.itemID)}</div>
            <form data-item-quantity="${escapeHtml(item.itemID)}">
                <div>Quantity: </div>
                <input type="number" name="quantity" value="${escapeHtml(item.quantity)}" min="0" step="1" required>
                <button type="submit">Change</button>
            </form>
        </div>
        <div class="delete-btn-container">
            <button class="icon-button" type="button" data-action="delete-item" aria-label="Delete item">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    </div>`;
}

async function loadItems(container, errorElement) {
    try {
        const response = await window.apiRequest('/items');
        const items = response.data;
        if (!Array.isArray(items) || items.length === 0) {
            container.innerHTML = '<p>No items found.</p>';
            showInlineError(errorElement);
            return;
        }

        const imageBase = container.dataset.imageBase;
        container.innerHTML = container.dataset.itemView === 'admin'
            ? items.map((item) => renderManagedItem(item, imageBase)).join('')
            : items.map((item) => renderPublicItem(
                item,
                imageBase,
                container.dataset.itemView === 'patient'
            )).join('');
        showInlineError(errorElement);
    } catch (error) {
        showInlineError(errorElement, error.message);
    }
}

async function loadAnnouncements(container, errorElement) {
    try {
        const response = await window.apiRequest('/announcements');
        const announcements = response.data;
        if (!Array.isArray(announcements) || announcements.length === 0) {
            container.innerHTML = '<p>No announcements found.</p>';
            showInlineError(errorElement);
            return;
        }

        container.innerHTML = announcements.map((announcement) => `
            <div class="message-card" id="${escapeHtml(announcement.announcementID)}">
                <p>${escapeHtml(announcement.message).replace(/\r?\n/g, '<br>')}</p>
            </div>`).join('');
        showInlineError(errorElement);
    } catch (error) {
        showInlineError(errorElement, error.message);
    }
}

const itemContainer = document.querySelector('[data-item-view]');
const itemError = document.getElementById('itemApiError');
const itemCreateError = document.getElementById('itemCreateError');
const announcementContainer = document.getElementById('displayAnnouncements');
const announcementError = document.getElementById('announcementApiError');

if (itemContainer) {
    loadItems(itemContainer, itemError);

    const createForm = document.querySelector('[data-item-create]');
    if (createForm) {
        createForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            showInlineError(itemCreateError);

            try {
                await window.apiRequest('/items', {
                    method: 'POST',
                    body: new FormData(createForm)
                });
                createForm.reset();
                const filename = createForm.querySelector('[data-file-name]');
                if (filename) {
                    filename.textContent = 'Upload Image';
                }
                await loadItems(itemContainer, itemError);
            } catch (error) {
                showInlineError(itemCreateError, error.message);
            }
        });
    }

    itemContainer.addEventListener('submit', async (event) => {
        const form = event.target.closest('[data-item-quantity]');
        if (!form) {
            return;
        }
        event.preventDefault();
        showInlineError(itemError);

        try {
            const quantity = form.elements.quantity.value;
            await window.apiRequest(`/items/${form.dataset.itemQuantity}/quantity`, {
                method: 'PATCH',
                body: JSON.stringify({ quantity })
            });
            await loadItems(itemContainer, itemError);
        } catch (error) {
            showInlineError(itemError, error.message);
        }
    });

    itemContainer.addEventListener('click', async (event) => {
        const button = event.target.closest('[data-action]');
        if (!button) {
            return;
        }

        if (button.dataset.action === 'choose-image') {
            button.closest('.item-pfp-btn-container')
                .querySelector('[data-action="replace-image"]').click();
            return;
        }

        if (button.dataset.action === 'delete-item') {
            const itemRow = button.closest('.item-edit-form-container');
            const itemID = itemRow.querySelector('[data-item-quantity]').dataset.itemQuantity;
            showInlineError(itemError);
            try {
                await window.apiRequest(`/items/${itemID}`, { method: 'DELETE' });
                await loadItems(itemContainer, itemError);
            } catch (error) {
                showInlineError(itemError, error.message);
            }
        }
    });

    itemContainer.addEventListener('change', async (event) => {
        const input = event.target.closest('[data-action="replace-image"]');
        if (!input || !input.files.length) {
            return;
        }
        const itemRow = input.closest('.item-edit-form-container');
        const itemID = itemRow.querySelector('[data-item-quantity]').dataset.itemQuantity;
        const formData = new FormData();
        formData.append('item-edit-img', input.files[0]);
        showInlineError(itemError);

        try {
            await window.apiRequest(`/items/${itemID}`, {
                method: 'PUT',
                body: formData
            });
            await loadItems(itemContainer, itemError);
        } catch (error) {
            showInlineError(itemError, error.message);
            input.value = '';
        }
    });
}

if (announcementContainer) {
    loadAnnouncements(announcementContainer, announcementError);
}

const announcementForm = document.querySelector('[data-announcement-create]');
if (announcementForm) {
    announcementForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        showInlineError(announcementError);
        const message = announcementForm.elements.message.value;

        try {
            await window.apiRequest('/announcements', {
                method: 'POST',
                body: JSON.stringify({ message })
            });
            announcementForm.reset();
            await loadAnnouncements(announcementContainer, announcementError);
        } catch (error) {
            showInlineError(announcementError, error.message);
        }
    });
}
