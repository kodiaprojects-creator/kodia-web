function initContactForms() {
    const forms = document.querySelectorAll('[data-contact-form]');
    if (!forms.length) return;

    forms.forEach((form) => {
        const statusEl = form.querySelector('[data-form-status]');
        const submitBtn = form.querySelector('[type="submit"]');
        const defaultLabel = submitBtn?.innerHTML;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (statusEl) {
                statusEl.hidden = true;
                statusEl.textContent = '';
                statusEl.className = 'font-body-md mt-4';
            }

            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());
            payload.formType = form.getAttribute('data-contact-form') || 'contacte';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.setAttribute('aria-busy', 'true');
                submitBtn.innerHTML = 'Enviant…';
            }

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const result = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(result.error || 'No s\'ha pogut enviar el formulari');
                }

                form.reset();

                if (statusEl) {
                    statusEl.hidden = false;
                    statusEl.className = 'font-body-md mt-4 text-kodia-black border border-kodia-black bg-secondary/20 px-4 py-3';
                    statusEl.textContent = 'Missatge enviat. Et respondrem aviat.';
                }
            } catch (error) {
                if (statusEl) {
                    statusEl.hidden = false;
                    statusEl.className = 'font-body-md mt-4 text-kodia-black border border-kodia-black bg-white px-4 py-3';
                    statusEl.textContent = error.message || 'Hi ha hagut un error. Torna-ho a provar o escriu a info@kodia.cat.';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.removeAttribute('aria-busy');
                    submitBtn.innerHTML = defaultLabel;
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initContactForms);
