/**
 * TilUP Platform - Core Application Logic, Auth, API & Validation
 * Group: SE-2507
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. GLOBAL AUTH STATE & PROFILE PAGE LOGIC
    // ==========================================
    const currentUserStr = localStorage.getItem('currentUser');
    const navLoginButtons = document.querySelectorAll('.login-button');

    if (currentUserStr) {
        navLoginButtons.forEach(btn => {
            btn.textContent = 'Profile';
            btn.href = 'profile.html';
        });
    }

    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    if (profileName && profileEmail) {
        if (!currentUserStr) {
            window.location.href = 'login.html';
        } else {
            try {
                const user = JSON.parse(currentUserStr);
                profileName.textContent = user.name || 'Student';
                profileEmail.textContent = user.email || '';
            } catch (e) {
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }

    // ==========================================
    // 2. SUCCESS SOUND (WEB AUDIO API)
    // ==========================================
    function playSuccessSound() {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;

            const audioContext = new AudioContextClass();
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime);

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.35);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.35);

            oscillator.onended = () => {
                audioContext.close();
            };
        } catch (error) {
            console.error('AudioContext error:', error);
        }
    }

    // ==========================================
    // 3. LIGHT & DARK THEME TOGGLE
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('tilup-theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '☀️ Light';
        }
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

    // ==========================================
    // 4. REAL-TIME CLOCK IN FOOTER
    // ==========================================
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

    // ==========================================
    // 5. EXTERNAL API INTEGRATION (Countries API)
    // ==========================================
    const countrySelect = document.getElementById('countryInput');

    if (countrySelect) {
        async function fetchCountries() {
            countrySelect.innerHTML = '<option value="" selected disabled>Loading countries...</option>';
            let countryNames = [];

            // Попытка 1: REST Countries API
            try {
                const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
                if (!res.ok) throw new Error('REST Countries unavailable');
                const data = await res.json();
                countryNames = data
                    .map(c => c?.name?.common)
                    .filter(Boolean);
            } catch (err1) {
                console.warn('REST Countries failed, trying backup API...', err1);

                // Попытка 2: CountriesNow Public API (резервный)
                try {
                    const res2 = await fetch('https://countriesnow.space/api/v0.1/countries/iso');
                    if (!res2.ok) throw new Error('Backup API unavailable');
                    const json2 = await res2.json();
                    if (json2 && Array.isArray(json2.data)) {
                        countryNames = json2.data.map(c => c.name).filter(Boolean);
                    }
                } catch (err2) {
                    console.warn('Both APIs failed, using local fallback:', err2);
                }
            }

            // Если оба API недоступны (например, нет интернета) — локальный список
            if (countryNames.length === 0) {
                const apiMessage = document.getElementById('countryApiMessage');

if (apiMessage) {
    apiMessage.textContent =
        "We couldn't load countries from the APIs. A backup list is shown instead.";
    apiMessage.classList.remove('d-none');
}
                countryNames = [
                    'Australia', 'Canada', 'China', 'France', 'Germany',
                    'Italy', 'Japan', 'Kazakhstan', 'Kyrgyzstan', 'Russia',
                    'South Korea', 'Spain', 'Turkey', 'United Kingdom',
                    'United States', 'Uzbekistan', 'Other'
                ];
            } else {
                
                countryNames.sort((a, b) => a.localeCompare(b));
            }


            countrySelect.innerHTML = '<option value="" selected disabled>Select Country</option>';
            countryNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                countrySelect.appendChild(option);
            });
        }

        fetchCountries();
    }

    // ==========================================
    // 6. ACCORDION & POPUP MODAL (WHY LEARN PAGE)
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.tu-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            if (!body) return;

            const isAlreadyOpen = body.classList.contains('open');

            document.querySelectorAll('.tu-accordion-body').forEach(b => b.classList.remove('open'));
            document.querySelectorAll('.tu-accordion-header').forEach(h => h.classList.remove('active'));

            if (!isAlreadyOpen) {
                header.classList.add('active');
                body.classList.add('open');
            }
        });
    });

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

    // ==========================================
    // 7. KEYBOARD CAROUSEL NAVIGATION
    // ==========================================
    const activeCarouselElement = document.querySelector('#aboutCarousel, #reviewsCarousel');

    if (activeCarouselElement && typeof bootstrap !== 'undefined') {
        const carouselInstance = bootstrap.Carousel.getOrCreateInstance(activeCarouselElement);

        window.addEventListener('keydown', (event) => {
            const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag === 'input' || activeTag === 'textarea' || document.activeElement.isContentEditable) {
                return;
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                carouselInstance.next();
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                carouselInstance.prev();
            }
        });
    }

    // ==========================================
    // 8. TUTORS PAGE: DYNAMIC FILTERING
    // ==========================================
    const tutorsGrid = document.querySelector('.tutors-grid');
    const langFilterSelect = document.getElementById('filter-language');
    const levelFilterButtons = document.querySelectorAll('.tu-filter-btn[data-level]');
    const resetFilterBtn = document.getElementById('resetTutorsFilter');

    if (tutorsGrid && langFilterSelect) {
        let activeLevel = 'all';

        function applyTutorFilters() {
            const selectedLang = langFilterSelect.value.toLowerCase().trim();
            const tutorCards = Array.from(tutorsGrid.querySelectorAll('.tutor-item-col'));

            // Сохраняем выбранные фильтры в localStorage
            localStorage.setItem('tilupTutorFilter', JSON.stringify({ lang: selectedLang, level: activeLevel }));

            tutorCards.forEach(card => {
                const cardLang = (card.dataset.language || '').toLowerCase().trim();
                const cardLevel = (card.dataset.level || '').toLowerCase().trim();

                const matchesLang = !selectedLang || cardLang === selectedLang;

                let matchesLevel = false;
                switch (activeLevel) {
                    case 'all':
                        matchesLevel = true;
                        break;
                    case 'a1-a2':
                        matchesLevel = cardLevel.includes('a1') || cardLevel.includes('a2');
                        break;
                    case 'b1-b2':
                        matchesLevel = cardLevel.includes('b1') || cardLevel.includes('b2');
                        break;
                    case 'c1-c2':
                        matchesLevel = cardLevel.includes('c1') || cardLevel.includes('c2');
                        break;
                    default:
                        matchesLevel = true;
                }

                if (matchesLang && matchesLevel) {
                    card.classList.remove('d-none');
                    card.classList.add('d-flex');
                } else {
                    card.classList.remove('d-flex');
                    card.classList.add('d-none');
                }
            });
        }

        langFilterSelect.addEventListener('change', applyTutorFilters);

        levelFilterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                levelFilterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeLevel = btn.dataset.level;
                applyTutorFilters();
            });
        });

        if (resetFilterBtn) {
            resetFilterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                langFilterSelect.value = '';
                activeLevel = 'all';
                levelFilterButtons.forEach(b => {
                    b.classList.toggle('active', b.dataset.level === 'all');
                });
                applyTutorFilters();
            });
        }
    }

    // ==========================================
    // 9. BECOME TUTOR: INCOME CALCULATOR
    // ==========================================
    const hourlyRateInput = document.getElementById('rateInput');
    const hoursPerWeekInput = document.getElementById('hoursInput');
    const calculatedIncomeDisplay = document.getElementById('calculatedIncome');

    if (hourlyRateInput && calculatedIncomeDisplay) {
        const incomeCalculator = {
            rate: 20,
            hoursPerWeek: 15,
            weeksPerMonth: 4,
            calculateMonthly() {
                return this.rate * this.hoursPerWeek * this.weeksPerMonth;
            },
            updateDisplay() {
                const total = this.calculateMonthly();
                calculatedIncomeDisplay.textContent = `$${total.toLocaleString('en-US')}`;
                calculatedIncomeDisplay.style.transform = 'scale(1.08)';
                setTimeout(() => {
                    calculatedIncomeDisplay.style.transform = 'scale(1)';
                }, 150);
            }
        };

        const handleIncomeChange = () => {
            incomeCalculator.rate = Math.max(0, Number(hourlyRateInput.value) || 0);
            if (hoursPerWeekInput) {
                incomeCalculator.hoursPerWeek = Math.max(0, Number(hoursPerWeekInput.value) || 0);
            }
            incomeCalculator.updateDisplay();
        };

        hourlyRateInput.addEventListener('input', handleIncomeChange);
        if (hoursPerWeekInput) {
            hoursPerWeekInput.addEventListener('input', handleIncomeChange);
        }
    }

    // ==========================================
    // 10. FORM VALIDATION HELPERS
    // ==========================================
    function setFieldError(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');

        const container = field.closest('.col-12, .col-md-6, .mb-3, .mb-4') || field.parentElement;
        let errorContainer = container.querySelector('.invalid-feedback') ||
                             container.querySelector('.tu-error-msg');

        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'tu-error-msg small text-danger fw-bold mt-1';
            container.appendChild(errorContainer);
        }

        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }

    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        const container = field.closest('.col-12, .col-md-6, .mb-3, .mb-4') || field.parentElement;
        const errorContainer = container.querySelector('.invalid-feedback') ||
                               container.querySelector('.tu-error-msg');
        if (errorContainer) {
            errorContainer.textContent = '';
            errorContainer.style.display = 'none';
        }
    }

    function attachLiveValidationClear(form) {
        const controls = form.querySelectorAll('input, select, textarea');
        controls.forEach(control => {
            control.addEventListener('input', () => clearFieldError(control));
            control.addEventListener('change', () => clearFieldError(control));
        });
    }

    // ==========================================
    // 11. VALIDATION: CONTACT POP-UP FORM
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        attachLiveValidationClear(contactForm);

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isFormValid = true;

            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');

            if (nameInput) {
                if (!nameInput.value.trim()) {
                    setFieldError(nameInput, 'Please enter your name.');
                    isFormValid = false;
                } else if (nameInput.value.trim().length < 2) {
                    setFieldError(nameInput, 'Name must be at least 2 characters.');
                    isFormValid = false;
                }
            }

            if (emailInput) {
                const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim()) {
                    setFieldError(emailInput, 'Email address is required.');
                    isFormValid = false;
                } else if (!emailReg.test(emailInput.value.trim())) {
                    setFieldError(emailInput, 'Please provide a valid email address.');
                    isFormValid = false;
                }
            }

            if (messageInput) {
                if (!messageInput.value.trim()) {
                    setFieldError(messageInput, 'Please enter your message.');
                    isFormValid = false;
                } else if (messageInput.value.trim().length < 5) {
                    setFieldError(messageInput, 'Message should be at least 5 characters.');
                    isFormValid = false;
                }
            }

            if (!isFormValid) return;

            contactForm.reset();
            contactForm.querySelectorAll('.is-invalid').forEach(el => clearFieldError(el));

            if (popupOverlay) {
                popupOverlay.classList.remove('active');
            }

            playSuccessSound();

            // Красивое всплывающее уведомление (Toast) вместо системного alert
            if (typeof window.showToast === 'function') {
                window.showToast('Thank you! Your message has been sent successfully.', 'success');
            }
        });
    }

    // ==========================================
    // 12. VALIDATION: BECOME A TUTOR FORM
    // ==========================================
    const tutorApplicationForm = document.getElementById('tutor-form');

    if (tutorApplicationForm) {
        attachLiveValidationClear(tutorApplicationForm);

        tutorApplicationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isFormValid = true;

            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('emailInput');
            const phoneInput = document.getElementById('phoneInput');
            const countryInput = document.getElementById('countryInput');
            const langSelect = document.getElementById('langSelect');
            const hoursInput = document.getElementById('hoursInput');
            const rateInput = document.getElementById('rateInput');
            const aboutText = document.getElementById('aboutSelf');

            const submitBtn = document.getElementById('tutorSubmitBtn');
            const spinner = submitBtn ? submitBtn.querySelector('.spinner-border') : null;
            const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

            if (nameInput) {
                if (!nameInput.value.trim()) {
                    setFieldError(nameInput, 'Full name is required.');
                    isFormValid = false;
                } else if (nameInput.value.trim().length < 3) {
                    setFieldError(nameInput, 'Name must be at least 3 characters.');
                    isFormValid = false;
                }
            }

            if (emailInput) {
                const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim()) {
                    setFieldError(emailInput, 'Email address is required.');
                    isFormValid = false;
                } else if (!emailReg.test(emailInput.value.trim())) {
                    setFieldError(emailInput, 'Enter a valid email (e.g. name@domain.com).');
                    isFormValid = false;
                }
            }

            if (phoneInput) {
                const phoneReg = /^[+0-9\s\-()]{7,20}$/;
                if (!phoneInput.value.trim()) {
                    setFieldError(phoneInput, 'Phone number is required.');
                    isFormValid = false;
                } else if (!phoneReg.test(phoneInput.value.trim())) {
                    setFieldError(phoneInput, 'Enter a valid phone number (7–20 digits).');
                    isFormValid = false;
                }
            }

            if (countryInput && !countryInput.value) {
                setFieldError(countryInput, 'Please select your country.');
                isFormValid = false;
            }

            if (langSelect && !langSelect.value) {
                setFieldError(langSelect, 'Please select the language you teach.');
                isFormValid = false;
            }

            if (hoursInput) {
                const hoursVal = Number(hoursInput.value.trim());
                if (!hoursInput.value.trim() || isNaN(hoursVal) || hoursVal < 1 || hoursVal > 60) {
                    setFieldError(hoursInput, 'Enter hours between 1 and 60 per week.');
                    isFormValid = false;
                }
            }

            if (rateInput) {
                const rateVal = Number(rateInput.value.trim());
                if (!rateInput.value.trim() || isNaN(rateVal) || rateVal < 5 || rateVal > 200) {
                    setFieldError(rateInput, 'Rate must be between $5 and $200 per hour.');
                    isFormValid = false;
                }
            }

            if (aboutText) {
                if (!aboutText.value.trim()) {
                    setFieldError(aboutText, 'Please tell us about your teaching background.');
                    isFormValid = false;
                } else if (aboutText.value.trim().length < 15) {
                    setFieldError(aboutText, 'Please write at least 15 characters.');
                    isFormValid = false;
                }
            }

            if (!isFormValid) return;

            if (submitBtn) {
                submitBtn.disabled = true;
                if (spinner) spinner.classList.remove('d-none');
                if (btnText) btnText.textContent = 'Please wait...';
            }

            await new Promise(resolve => setTimeout(resolve, 700));

            playSuccessSound();

            if (typeof window.showToast === 'function') {
                window.showToast('Tutor application submitted successfully!', 'success');
            }

            tutorApplicationForm.querySelectorAll('input, select, textarea').forEach(el => {
                el.disabled = true;
            });

            if (submitBtn) {
                if (spinner) spinner.classList.add('d-none');
                if (btnText) btnText.textContent = 'Application Received ✔';
            }

            let alertBox = document.getElementById('applicationSuccessAlert');
            if (!alertBox) {
                alertBox = document.createElement('div');
                alertBox.id = 'applicationSuccessAlert';
                alertBox.className = 'alert alert-success mt-4 text-center fw-bold shadow-sm';
                submitBtn.parentElement.appendChild(alertBox);
            }
            alertBox.innerHTML = '🎉 Thank you! Your application has been submitted and is under review.';
            alertBox.classList.remove('d-none');

            let resetBtn = document.getElementById('tutorResetAppBtn');
            if (!resetBtn) {
                resetBtn = document.createElement('button');
                resetBtn.id = 'tutorResetAppBtn';
                resetBtn.type = 'button';
                resetBtn.className = 'btn btn-outline-secondary btn-sm mt-3 fw-bold d-block mx-auto';
                resetBtn.textContent = '🔄 Submit Another Application';
                submitBtn.parentElement.appendChild(resetBtn);

                resetBtn.addEventListener('click', () => {
                    tutorApplicationForm.reset();
                    tutorApplicationForm.querySelectorAll('.is-invalid').forEach(el => clearFieldError(el));
                    tutorApplicationForm.querySelectorAll('input, select, textarea').forEach(el => {
                        el.disabled = false;
                    });

                    if (submitBtn) {
                        submitBtn.disabled = false;
                        if (btnText) btnText.textContent = 'Submit Application';
                    }

                    const incomeDisplay = document.getElementById('calculatedIncome');
                    if (incomeDisplay) {
                        incomeDisplay.textContent = '$1,200';
                    }

                    alertBox.classList.add('d-none');
                    resetBtn.classList.add('d-none');
                });
            } else {
                resetBtn.classList.remove('d-none');
            }
        });
    }

    // ==========================================
    // 13. VALIDATION & AUTH SIMULATION (LOGIN & SIGN UP)
    // ==========================================
    const authForm = document.getElementById('authForm');

    if (authForm) {
        attachLiveValidationClear(authForm);

        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            const nameInput = document.getElementById('signupName');
            const emailInput = document.getElementById('authEmail');
            const passwordInput = document.getElementById('authPassword');
            const confirmInput = document.getElementById('authPasswordConfirm');

            const isSignUpMode = nameInput && nameInput.offsetParent !== null;

            if (isSignUpMode) {
                if (!nameInput.value.trim()) {
                    setFieldError(nameInput, 'Full name is required.');
                    isFormValid = false;
                } else if (nameInput.value.trim().length < 2) {
                    setFieldError(nameInput, 'Name must be at least 2 characters.');
                    isFormValid = false;
                }
            }

            if (emailInput) {
                const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim()) {
                    setFieldError(emailInput, 'Email address is required.');
                    isFormValid = false;
                } else if (!emailReg.test(emailInput.value.trim())) {
                    setFieldError(emailInput, 'Please provide a valid email address.');
                    isFormValid = false;
                }
            }

            if (passwordInput) {
                const passwordVal = passwordInput.value;
                const trimmedPassword = passwordVal.trim();
                const hasLetterAndNumber = /^(?=.*[A-Za-z])(?=.*\d).+$/.test(trimmedPassword);

                if (!trimmedPassword) {
                    setFieldError(passwordInput, 'Password is required.');
                    isFormValid = false;
                } else if (/\s/.test(passwordVal)) {
                    setFieldError(passwordInput, 'Password must not contain spaces.');
                    isFormValid = false;
                } else if (trimmedPassword.length < 8) {
                    setFieldError(passwordInput, 'Password must be at least 8 characters.');
                    isFormValid = false;
                } else if (!hasLetterAndNumber) {
                    setFieldError(passwordInput, 'Password must contain both letters and numbers.');
                    isFormValid = false;
                }
            }

            if (isSignUpMode && confirmInput) {
                const confirmVal = confirmInput.value;
                if (!confirmVal.trim()) {
                    setFieldError(confirmInput, 'Please confirm your password.');
                    isFormValid = false;
                } else if (passwordInput && passwordInput.value !== confirmVal) {
                    setFieldError(confirmInput, 'Passwords do not match.');
                    isFormValid = false;
                }
            }

            if (!isFormValid) return;

            const emailVal = emailInput.value.trim();
            const passwordVal = passwordInput.value.trim();

            if (isSignUpMode) {
                const nameVal = nameInput.value.trim();
                const newUser = { name: nameVal, email: emailVal, password: passwordVal };

                localStorage.setItem('tilupRegisteredUser', JSON.stringify(newUser));
                localStorage.setItem('currentUser', JSON.stringify(newUser));
            } else {
                const registeredUserStr = localStorage.getItem('tilupRegisteredUser');

                if (!registeredUserStr) {
                    setFieldError(emailInput, 'No account found. Please create an account first.');
                    return;
                }

                const registeredUser = JSON.parse(registeredUserStr);

                if (registeredUser.email !== emailVal || registeredUser.password !== passwordVal) {
                    setFieldError(passwordInput, 'Invalid email or password.');
                    return;
                }

                localStorage.setItem('currentUser', JSON.stringify(registeredUser));
            }

            playSuccessSound();

            if (typeof window.showToast === 'function') {
                window.showToast(isSignUpMode ? 'Account created! Redirecting...' : 'Welcome back! Redirecting...', 'success');
            }

            const successMsg = document.getElementById('authSuccess');
            if (successMsg) {
                successMsg.classList.remove('d-none');
                successMsg.innerHTML = `<strong>Success!</strong> ${isSignUpMode ? 'Account created.' : 'Welcome back!'} Redirecting to profile...`;
            }

            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 800);
        });
    }
});