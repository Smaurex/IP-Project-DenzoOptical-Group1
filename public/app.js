async function loadItems() {
  const status = document.getElementById('status');
  try {
    const response = await fetch('/api/health');
    if (!response.ok) throw new Error('Server unavailable');
    status.textContent = 'Express server is running.';
  } catch (error) {
    status.textContent = error.message;
  }
}

loadItems();
