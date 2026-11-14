function createHeader() {
  return `<header>
    <div class="logo"><img src="/images/DenzoOptLogo.png" alt="Denzo Optical"></div>
    <nav class="link-container" id="main-nav"></nav>
    <div onclick="showSidebar()" id="menuButton"><a class="link" href="#"><img src="/hf/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="Menu"></a></div>
    <nav class="sidebar" id="sidebar"><div onclick="hideSidebar()"><a href="#"><img src="/hf/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="Close"></a></div><div id="sidebar-links"></div></nav>
  </header>`;
}

function createFooter() {
  return `<footer><p class="footer-title">We would like to hear from you!</p><div class="footer-content"><div class="footer-section"><p class="section-title">Contact</p><p class="section-detail">0917-770-2025</p></div><div class="footer-section"><p class="section-title">Address</p><p class="section-detail">Pink Me Up JKRM store, Central Nautical Highway, Yati, Liloan, Cebu</p></div><div class="footer-section social-icons"><a href="https://www.facebook.com/profile.php?id=100064047673782" target="_blank" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a><a href="mailto:maurismattio@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a></div></div></footer>`;
}

function linksForUser(user) {
  const links = [{ text: 'Home', href: '/' }, { text: 'About us', href: '/pages/patient/about.html' }];
  if (!user) return [...links, { text: 'Sign Up', href: '/pages/register/sign_up.html' }, { text: 'Log In', href: '/pages/register/log_in.html' }];
  links.splice(1, 0, { text: 'Profile', href: '/pages/profile/index.html' }, { text: 'Log out', href: '#', action: 'logout' });
  if (user.role === 'doctor') links.splice(2, 0, { text: 'Doctor', href: '/pages/doctor/index.html' }, { text: 'About us', href: '/pages/doctor/about.html' });
  if (user.role === 'assistant') links.splice(2, 0, { text: 'Assistant', href: '/pages/assistant/index.html' });
  if (user.role === 'patient') links.splice(2, 0, { text: 'Patient', href: '/pages/patient/index.html' });
  return links;
}

function renderLinks(target, links) {
  target.innerHTML = links.map((link) => `<div><a class="link" href="${link.href}" data-action="${link.action || ''}">${link.text}</a></div>`).join('');
  target.querySelectorAll('[data-action="logout"]').forEach((link) => link.addEventListener('click', async (event) => {
    event.preventDefault();
    await window.apiRequest('/auth/logout', { method: 'POST' });
    window.location.href = '/';
  }));
}

async function loadShell() {
  document.body.insertAdjacentHTML('afterbegin', createHeader());
  document.body.insertAdjacentHTML('beforeend', createFooter());
  let user = null;
  try { user = (await window.apiRequest('/auth/status')).user; } catch {}
  const links = linksForUser(user);
  renderLinks(document.getElementById('main-nav'), links);
  renderLinks(document.getElementById('sidebar-links'), links);
  return user;
}

function showSidebar() { document.querySelector('.sidebar').classList.add('active'); }
function hideSidebar() { document.querySelector('.sidebar').classList.remove('active'); }

window.loadShell = loadShell;
window.showSidebar = showSidebar;
window.hideSidebar = hideSidebar;
