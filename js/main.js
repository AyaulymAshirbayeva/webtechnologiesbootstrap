document.addEventListener('DOMContentLoaded', () => {

    /* --- TASK 4: DARK THEME TOGGLE --- */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('tilup-theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Light';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
            localStorage.setItem('tilup-theme', isDark ? 'dark' : 'light');
        });
    }

    /* --- TASK 5: REAL-TIME CLOCK --- */
    const liveTimeElement = document.getElementById('liveDateTime');
    function updateDateTime() {
        if (!liveTimeElement) return;
        const now = new Date();
        liveTimeElement.textContent = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }
    if (liveTimeElement) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    /* --- TASK 2: ACCORDION (ПУНКТ 2) --- */
    const accordionHeaders = document.querySelectorAll('.tu-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            if (!body) return;

            const isAlreadyOpen = body.classList.contains('open');

            // Закрываем все открытые вкладки
            document.querySelectorAll('.tu-accordion-body').forEach(b => b.classList.remove('open'));
            document.querySelectorAll('.tu-accordion-header').forEach(h => h.classList.remove('active'));

            // Переключаем текущую
            if (!isAlreadyOpen) {
                header.classList.add('active');
                body.classList.add('open');
            }
        });
    });

    /* --- TASK 3: POPUP MODAL (ПУНКТ 3) --- */
    const openPopupBtns = document.querySelectorAll('.open-popup-btn');
    const popupOverlay = document.getElementById('contactPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');

    if (popupOverlay) {
        openPopupBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                popupOverlay.classList.add('active');
            });
        });

        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                popupOverlay.classList.remove('active');
            });
        }

        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
            }
        });
    }

    /* --- TASK 1: LOGIN VALIDATION --- */
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('signupName');
            const emailInput = document.getElementById('authEmail');
            const passwordInput = document.getElementById('authPassword');
            const confirmInput = document.getElementById('authPasswordConfirm');

            document.querySelectorAll('.tu-error-msg').forEach(msg => msg.textContent = '');

            if (nameInput && nameInput.offsetParent !== null && nameInput.value.trim().length < 2) {
                const el = document.getElementById('nameError');
                if (el) el.textContent = 'Please enter your full name.';
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && !emailPattern.test(emailInput.value.trim())) {
                const el = document.getElementById('emailError');
                if (el) el.textContent = 'Please provide a valid email.';
                isValid = false;
            }

            if (passwordInput && passwordInput.value.length < 6) {
                const el = document.getElementById('passwordError');
                if (el) el.textContent = 'Password must be at least 6 characters.';
                isValid = false;
            }

            if (confirmInput && confirmInput.offsetParent !== null && passwordInput && passwordInput.value !== confirmInput.value) {
                const el = document.getElementById('confirmError');
                if (el) el.textContent = 'Passwords do not match.';
                isValid = false;
            }

            if (isValid) {
                const successMsg = document.getElementById('authSuccess');
                if (successMsg) {
                    successMsg.classList.remove('d-none');
                    successMsg.textContent = 'Success! Redirecting...';
                }
                setTimeout(() => {
                    alert('Authentication successful!');
                    authForm.reset();
                    if (successMsg) successMsg.classList.add('d-none');
                }, 800);
            }
        });
    }
});