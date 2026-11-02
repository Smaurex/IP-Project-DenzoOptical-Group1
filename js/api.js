const API_BASE = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
    ? `${window.location.protocol}//${window.location.hostname}:3000/api`
    : `${window.location.origin}/api`;

async function apiRequest(path, options = {}) {
    const headers = { ...options.headers };
    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
    if (isFormData) {
        delete headers['Content-Type'];
        delete headers['content-type'];
    } else if (options.body !== undefined) {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        credentials: 'include',
        headers
    });

    let result;
    try {
        result = await response.json();
    } catch {
        throw new Error('The server returned an invalid response.');
    }

    if (!response.ok || result.success === false) {
        throw new Error(result.error?.message || 'The request failed.');
    }

    return result;
}

window.apiRequest = apiRequest;
