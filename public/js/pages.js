function setPageError(error) { showError(document.querySelector('[data-api-error]'), error); }

function itemCard(item, manage) {
  const availability = item.quantity ? '<p style="color: green;">available</p>' : '<p style="color: red;">unavailable</p>';
  if (!manage) return `<div class="item-card" id="${item.itemID}"><div class="item-content-img"><img src="/item_pics/${encodeURIComponent(item.item_pic_id)}" alt="${item.itemID}"></div><div class="item-content"><div><p>Item ID: ${item.itemID}</p><p>Quantity: ${item.quantity}</p></div>${availability}</div><div class="item-content"><p>inquire: </p><div style="display: flex; height:90%;"><a href="mailto:maurismattio@gmail.com?subject=Inquire ITEM ID: ${item.itemID}"><i class="fas fa-envelope"></i></a><a href="https://www.facebook.com/profile.php?id=100064047673782"><i class="fa-brands fa-facebook"></i></a></div></div></div>`;
  return `<div class="item-edit-form-container" data-item="${item.itemID}"><div class="item-pfp-btn-container"><div class="item-pfp-container"><img class="item-img-pfp" src="/item_pics/${encodeURIComponent(item.item_pic_id)}" alt="${item.itemID}"></div><div class="item-changePfp-btn-container"><a class="item-changePfp-btn icon-button" href="/pages/doctor/change_item.html?id=${item.itemID}"><i class="fa-solid fa-image"></i></a></div></div><div class="item-quantity-container"><div>Item ID: ${item.itemID}</div><form data-quantity-form><div>Quantity: </div><input type="number" name="quantity" value="${item.quantity}" min="0" required><button type="submit">Change</button></form></div><div class="delete-btn-container"><button class="icon-button" type="button" data-delete-item><i class="fa-regular fa-trash-can"></i></button></div></div>`;
}

async function loadItems(manage = false) {
  const container = document.querySelector('[data-items]');
  if (!container) return;
  try {
    const { items } = await apiRequest('/items');
    container.innerHTML = items.length ? items.map((item) => itemCard(item, manage)).join('') : '<p>No items found.</p>';
    if (manage) bindItemManagement(container);
  } catch (error) { setPageError(error); }
}

function bindItemManagement(container) {
  container.querySelectorAll('[data-quantity-form]').forEach((form) => form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const itemID = form.closest('[data-item]').dataset.item;
    try { await apiRequest(`/items/${itemID}/quantity`, { method: 'PATCH', body: { quantity: Number(form.quantity.value) } }); await loadItems(true); } catch (error) { setPageError(error); }
  }));
  container.querySelectorAll('[data-delete-item]').forEach((button) => button.addEventListener('click', async () => {
    const itemID = button.closest('[data-item]').dataset.item;
    try { await apiRequest(`/items/${itemID}`, { method: 'DELETE' }); await loadItems(true); } catch (error) { setPageError(error); }
  }));
}

async function loadAnnouncements() {
  const container = document.querySelector('[data-announcements]');
  if (!container) return;
  try { const { announcements } = await apiRequest('/announcements'); container.innerHTML = announcements.length ? announcements.map((item) => `<div class="message-card"><p>${String(item.message).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</p></div>`).join('') : '<p>No items found.</p>'; } catch (error) { setPageError(error); }
}

function bindAuthForms() {
  const login = document.querySelector('#formLogin');
  if (login) login.addEventListener('submit', async (event) => { event.preventDefault(); try { const data = Object.fromEntries(new FormData(login)); await apiRequest('/auth/login', { method: 'POST', body: { emailLogin: data.emailLogin, passLogin: data.passLogin } }); window.location.href = pageForRole((await apiRequest('/auth/status')).user.role); } catch (error) { showError(login.querySelector('.error'), error); } });
  const signup = document.querySelector('#formSignup');
  if (signup) signup.addEventListener('submit', async (event) => { event.preventDefault(); try { const data = Object.fromEntries(new FormData(signup)); await apiRequest('/auth/register', { method: 'POST', body: data }); window.location.href = '/pages/register/log_in.html'; } catch (error) { showError(signup.querySelector('.error'), error); } });
}

async function loadAbout(view = true) {
  try { const { about } = await apiRequest('/about'); if (!about) return; if (view) { for (const [key, value] of Object.entries(about)) document.querySelectorAll(`[data-about="${key}"]`).forEach((element) => { if (element.tagName === 'IMG') element.src = `/uploads/${encodeURIComponent(value)}`; else element.textContent = value || ''; }); } else { for (const key of ['doctorName', 'mobile', 'telephone', 'address', 'credentials']) { const input = document.querySelector(`[name="${key}"]`); if (input) input.value = about[key] || ''; } } } catch (error) { setPageError(error); }
}

function bindDoctorAbout() {
  document.querySelectorAll('[data-about-field]').forEach((form) => form.addEventListener('submit', async (event) => { event.preventDefault(); try { await apiRequest('/about', { method: 'PATCH', body: { [form.dataset.aboutField]: form.elements[form.dataset.aboutField].value } }); } catch (error) { setPageError(error); } }));
  document.querySelectorAll('[data-about-image]').forEach((form) => form.addEventListener('submit', async (event) => { event.preventDefault(); const body = new FormData(); body.append('image', form.querySelector('input[type=file]').files[0]); try { await apiRequest(`/about/images/${form.dataset.aboutImage}`, { method: 'PATCH', body }); } catch (error) { setPageError(error); } }));
}

async function loadProfile() {
  try { const { user } = await apiRequest('/profile'); document.querySelector('[data-profile="username"]').textContent = user.username; document.querySelector('[data-profile="email"]').textContent = user.email; document.querySelector('[data-profile="role"]').textContent = user.role; document.querySelector('#pfp_img').src = `/profile_pics/${encodeURIComponent(user.profile_pic_id)}`; } catch (error) { setPageError(error); }
}

function bindProfileImage() {
  const form = document.querySelector('#pfp-img-form');
  if (!form) return;
  form.addEventListener('submit', async (event) => { event.preventDefault(); const body = new FormData(); body.append('image', form.querySelector('input[type=file]').files[0]); try { const data = await apiRequest('/profile/image', { method: 'PATCH', body }); document.querySelector('#pfp_img').src = `/profile_pics/${encodeURIComponent(data.profile_pic_id)}`; } catch (error) { setPageError(error); } });
}

async function bindPage() {
  await loadShell();
  const page = document.body.dataset.page;
  bindAuthForms();
  if (['home', 'patient'].includes(page)) { loadItems(false); loadAnnouncements(); }
  if (['doctor', 'assistant'].includes(page)) { loadItems(true); loadAnnouncements(); }
  if (page === 'about') loadAbout(true);
  if (page === 'about-editor') { loadAbout(false); bindDoctorAbout(); }
  if (page === 'profile') { loadProfile(); bindProfileImage(); }
  if (page === 'change-item') document.querySelector('#item-edit-img-form')?.addEventListener('submit', async (event) => { event.preventDefault(); const body = new FormData(); body.append('image', event.currentTarget.querySelector('input[type=file]').files[0]); try { await apiRequest(`/items/${new URLSearchParams(window.location.search).get('id')}/image`, { method: 'PATCH', body }); window.location.href = '/pages/doctor/index.html'; } catch (error) { setPageError(error); } });
  const addForm = document.querySelector('[data-add-item]');
  if (addForm) addForm.addEventListener('submit', async (event) => { event.preventDefault(); const body = new FormData(addForm); body.set('image', body.get('item-image')); try { await apiRequest('/items', { method: 'POST', body }); window.location.reload(); } catch (error) { setPageError(error); } });
  const announcementForm = document.querySelector('[data-announcement-form]');
  if (announcementForm) announcementForm.addEventListener('submit', async (event) => { event.preventDefault(); try { await apiRequest('/announcements', { method: 'POST', body: { message: announcementForm.message.value } }); announcementForm.reset(); loadAnnouncements(); } catch (error) { setPageError(error); } });
}

document.addEventListener('DOMContentLoaded', bindPage);
