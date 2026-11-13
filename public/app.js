async function loadItems() {
  const status = document.getElementById('status');
  const items = document.getElementById('items');
  try {
    const response = await fetch('/api/items');
    if (!response.ok) throw new Error('Server unavailable');
    const payload = await response.json();
    status.textContent = 'Express server is running.';
    items.innerHTML = payload.items.map((item) => `<article><img src="/item_pics/${encodeURIComponent(item.item_pic_id)}" alt="${item.itemID}"><p>Item ${item.itemID}</p><p>${item.quantity ? 'Available' : 'Unavailable'}</p></article>`).join('');
  } catch (error) {
    const health = await fetch('/api/health').catch(() => null);
    status.textContent = health?.ok ? 'Express server is running; database is not available.' : error.message;
  }
}

loadItems();
