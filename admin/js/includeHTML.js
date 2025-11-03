function includeHTML() {
  const elements = Array.from(document.querySelectorAll('[data-include]'));

  const promises = elements.map(el => {
    const file = el.getAttribute('data-include');
    if (!file) return Promise.resolve();
    return fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.text();
      })
      .then(data => {
        el.innerHTML = data;
        el.classList.add('open'); // keep previous behavior
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
      });
  });

  // Notify consumers that includes have been injected (or attempted)
  Promise.all(promises).then(() => {
    try{ document.dispatchEvent(new CustomEvent('includesLoaded')); }catch(e){}
  });
}

document.addEventListener('DOMContentLoaded', includeHTML);
