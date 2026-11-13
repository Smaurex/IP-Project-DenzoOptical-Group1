async function apiRequest(path, options = {}) {
  const request = { credentials: 'include', ...options, headers: { ...(options.headers || {}) } };
  if (request.body && !(request.body instanceof FormData)) {
    request.headers['Content-Type'] = 'application/json';
    request.body = JSON.stringify(request.body);
  }
  const response = await fetch(`/api${path}`, request);
  const payload = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Request failed');
  return payload;
}

function showError(element, error) {
  if (element) element.textContent = error.message || error;
}

function pageForRole(role) {
  if (role === 'doctor') return '/pages/doctor/index.html';
  if (role === 'assistant') return '/pages/assistant/index.html';
  return '/pages/patient/index.html';
}

window.apiRequest = apiRequest;
window.showError = showError;
window.pageForRole = pageForRole;
