function initContactForms() {
    const forms = document.querySelectorAll('[data-contact-form]');
    if (!forms.length) return;

    forms.forEach((form) => {
        const statusEl = form.querySelector('[data-form-status]');
        const submitBtn = form.querySelector('[type="submit"]');
        const defaultLabel = submitBtn?.innerHTML;
        const validate = form.hasAttribute('data-validate');
        const submittingLabel = form.getAttribute('data-submitting-label') || 'Enviant…';

        function clearFieldErrors() {
            form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
            form.querySelectorAll('[aria-invalid="true"]').forEach((el) => el.removeAttribute('aria-invalid'));
        }

        function showFieldError(fieldName) {
            const wrap = form.querySelector(`[data-field="${fieldName}"]`);
            const input = wrap?.querySelector('input, textarea, select');
            wrap?.classList.add('is-invalid');
            input?.setAttribute('aria-invalid', 'true');
            return input || wrap?.querySelector('input');
        }

        function validatePortada() {
            clearFieldErrors();
            const errors = [];
            const nom = form.querySelector('[name="nom"]');
            const empresa = form.querySelector('[name="empresa"]');
            const email = form.querySelector('[name="email"]');
            const necessitat = form.querySelector('[name="necessitat"]');
            const privacitat = form.querySelector('[name="privacitat"]');

            if (!nom?.value.trim()) errors.push('nom');
            if (!empresa?.value.trim()) errors.push('empresa');
            if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                errors.push('email');
            }
            if (!necessitat?.value.trim()) errors.push('necessitat');
            if (!privacitat?.checked) errors.push('privacitat');

            let first = null;
            errors.forEach((name) => {
                const el = showFieldError(name);
                if (!first && el) first = el;
            });
            if (first) first.focus();
            return errors.length === 0;
        }

        function showSuccess(payload) {
            const titleTpl = form.getAttribute('data-success-title') || 'Fet!';
            const textTpl = form.getAttribute('data-success-text') || '';
            const nom = (payload.nom || '').trim() || 'hola';
            const title = titleTpl.replace('{nom}', nom);
            const box = document.createElement('div');
            box.className = 'form-success';
            box.setAttribute('role', 'status');
            box.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(textTpl)}</p>`;
            form.replaceWith(box);
            box.focus?.();
            box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function escapeHtml(value) {
            return String(value ?? '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (validate && !validatePortada()) {
                return;
            }

            if (statusEl) {
                statusEl.hidden = true;
                statusEl.textContent = '';
                statusEl.className = statusEl.classList.contains('form-info-dades')
                    ? 'form-info-dades'
                    : 'font-body-md mt-4';
            }

            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());
            payload.formType = form.getAttribute('data-contact-form') || 'contacte';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.setAttribute('aria-busy', 'true');
                submitBtn.innerHTML = submittingLabel;
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

                if (validate) {
                    showSuccess(payload);
                    return;
                }

                form.reset();

                if (statusEl) {
                    statusEl.hidden = false;
                    statusEl.className = 'font-body-md mt-4 text-kodia-black border border-kodia-black bg-secondary/20 px-4 py-3';
                    statusEl.textContent = 'Missatge enviat. Et respondrem aviat.';
                }
            } catch (error) {
                if (validate) {
                    const msg =
                        form.getAttribute('data-error-send') ||
                        error.message ||
                        'Hi ha hagut un error. Torna-ho a provar o escriu a info@kodia.cat.';
                    if (statusEl) {
                        statusEl.hidden = false;
                        statusEl.className = 'form-info-dades';
                        statusEl.style.color = '#93000a';
                        statusEl.textContent = msg;
                    }
                    // No esborrem el que s'ha escrit
                } else if (statusEl) {
                    statusEl.hidden = false;
                    statusEl.className = 'font-body-md mt-4 text-kodia-black border border-kodia-black bg-white px-4 py-3';
                    statusEl.textContent =
                        error.message ||
                        'Hi ha hagut un error. Torna-ho a provar o escriu a info@kodia.cat.';
                }
            } finally {
                if (submitBtn && form.isConnected) {
                    submitBtn.disabled = false;
                    submitBtn.removeAttribute('aria-busy');
                    submitBtn.innerHTML = defaultLabel;
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initContactForms);
