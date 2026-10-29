document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // SUCCESS SOUND (WEB AUDIO API)
    // ==========================================
    function playSuccessSound() {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            console.log('AudioContext is not supported');
            return;
        }

        const audioContext = new AudioContextClass();

        audioContext.resume().then(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.value = 880;

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.3
            );

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);

            oscillator.onended = () => {
                audioContext.close();
            };
        }).catch(error => {
            console.error('Could not play sound:', error);
        });
    }

    // ==========================================
    // TASK 4: DARK THEME TOGGLE
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
    // TASK 5: REAL-TIME CLOCK
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
    // TASK 2: ACCORDION
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.tu-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;

            if (!body) return;

            const isAlreadyOpen = body.classList.contains('open');

            document.querySelectorAll('.tu-accordion-body').forEach(b => {
                b.classList.remove('open');
            });

            document.querySelectorAll('.tu-accordion-header').forEach(h => {
                h.classList.remove('active');
            });

            if (!isAlreadyOpen) {
                header.classList.add('active');
                body.classList.add('open');
            }
        });
    });

    // ==========================================
    // TASK 3: POPUP MODAL
    // ==========================================
    const openPopupBtns = document.querySelectorAll('.open-popup-btn');
    const popupOverlay = document.getElementById('contactPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');

    if (popupOverlay) {
        openPopupBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                popupOverlay.classList.add('active');

                const popupWindow =
                    popupOverlay.querySelector('.tu-popup-window');

                if (popupWindow) {
                    popupWindow.animate(
                        [
                            { opacity: 0, transform: 'translateY(-20px)' },
                            { opacity: 1, transform: 'translateY(0)' }
                        ],
                        {
                            duration: 250,
                            easing: 'ease-out'
                        }
                    );
                }
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
    // KEYBOARD NAVIGATION + SWITCH
    // ==========================================
    const navLinks = Array.from(
        document.querySelectorAll('header nav a[href]')
    );

    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', (event) => {
            let nextIndex = index;

            switch (event.key) {
                case 'ArrowRight':
                    nextIndex = (index + 1) % navLinks.length;
                    break;

                case 'ArrowLeft':
                    nextIndex = (index - 1 + navLinks.length) % navLinks.length;
                    break;

                default:
                    return;
            }

            event.preventDefault();
            navLinks[nextIndex].focus();
        });
    });

    // ==========================================
    // LANGUAGE SEARCH: FILTER (COURSES PAGE)
    // ==========================================
    const languageSearch = document.getElementById('languageSearch');
    const languageSearchResults =
        document.getElementById('languageSearchResults');

    if (languageSearch && languageSearchResults) {
        const languageCards = Array.from(
            document.querySelectorAll('.language-card')
        );

        languageSearch.addEventListener('input', () => {
            const query = languageSearch.value.trim().toLowerCase();

            const matchingCards = languageCards.filter(card =>
                card.innerText.toLowerCase().includes(query)
            );

            languageCards.forEach(card => {
                card.hidden = !matchingCards.includes(card);
            });

            const matchingLanguages = matchingCards
                .map(card => {
                    const title = card.querySelector('h3');
                    return title ? title.innerText.trim() : '';
                })
                .filter(Boolean);

            languageSearchResults.innerText = query
                ? `Found ${matchingCards.length} language(s): ${matchingLanguages.join(', ')}`
                : `Available languages: ${languageCards.length}`;
        });

        languageSearchResults.innerText =
            `Available languages: ${languageCards.length}`;
    }

    // ==========================================
    // TUTORS PAGE: DYNAMIC FILTERING & SWITCH
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

            const matchingCards = tutorCards.filter(card => {
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

                return matchesLang && matchesLevel;
            });

            tutorCards.forEach(card => {
                const isMatch = matchingCards.includes(card);

                if (isMatch) {
                    card.classList.remove('d-none');
                    card.classList.add('d-flex');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
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
    // BECOME TUTOR: INCOME CALCULATOR (OBJECT & METHODS)
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
                calculatedIncomeDisplay.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    calculatedIncomeDisplay.style.transform = 'scale(1)';
                }, 150);
            }
        };

        const handleIncomeChange = () => {
            incomeCalculator.rate = Number(hourlyRateInput.value) || 0;
            if (hoursPerWeekInput) {
                incomeCalculator.hoursPerWeek = Number(hoursPerWeekInput.value) || 0;
            }
            incomeCalculator.updateDisplay();
        };

        hourlyRateInput.addEventListener('input', handleIncomeChange);
        if (hoursPerWeekInput) {
            hoursPerWeekInput.addEventListener('input', handleIncomeChange);
        }
    }

    // ==========================================
    // ABOUT US: INTERACTIVE FACT GENERATOR
    // ==========================================
    const quoteButton = document.getElementById('generateFactBtn');
    const quoteDisplay = document.getElementById('factDisplay');

    if (quoteButton && quoteDisplay) {
        const languageFacts = [
            "Over 7,000 languages are spoken around the world today.",
            "Kazakh is a Turkic language written with Cyrillic, Latin, and Arabic scripts historically.",
            "Learning a second language improves problem-solving and multitasking abilities.",
            "Mandarin Chinese is the language with the most native speakers globally.",
            "Half of the world's population is bilingual or multilingual."
        ];

        quoteButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * languageFacts.length);
            quoteDisplay.style.opacity = '0';
            setTimeout(() => {
                quoteDisplay.textContent = `“${languageFacts[randomIndex]}”`;
                quoteDisplay.style.opacity = '1';
                quoteDisplay.style.transition = 'opacity 0.3s ease';
            }, 150);
        });
    }

    // ==========================================
    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ВАЛИДАЦИИ ФОРМ
    // ==========================================
    function setFieldError(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');

        let errorContainer = field.parentElement.querySelector('.invalid-feedback') || 
                             field.parentElement.querySelector('.tu-error-msg');

        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'invalid-feedback small text-danger fw-bold mt-1';
            field.parentElement.appendChild(errorContainer);
        }

        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }

    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        const errorContainer = field.parentElement.querySelector('.invalid-feedback') || 
                               field.parentElement.querySelector('.tu-error-msg');
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
    // 1. ВАЛИДАЦИЯ ФОРМЫ СВЯЗИ (CONTACT POP-UP)
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        attachLiveValidationClear(contactForm);

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isFormValid = true;

            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');

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

            const formData = Object.fromEntries(new FormData(contactForm).entries());

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: 'TilUP Contact Request',
                        body: JSON.stringify(formData),
                        userId: 1
                    })
                });

                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

                playSuccessSound();
                alert('Thank you! Your message has been sent successfully.');

                contactForm.reset();
                contactForm.querySelectorAll('.is-invalid').forEach(el => clearFieldError(el));

                if (popupOverlay) {
                    popupOverlay.classList.remove('active');
                }
            } catch (error) {
                alert('Submission failed: ' + error.message);
            }
        });
    }

    // ==========================================
    // 2. ВАЛИДАЦИЯ ФОРМЫ ЗАЯВКИ РЕПЕТИТОРА (BECOME TUTOR)
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
            const rateInput = document.getElementById('rateInput');
            const aboutText = document.getElementById('aboutSelf');

            if (nameInput) {
                if (!nameInput.value.trim()) {
                    setFieldError(nameInput, 'Full name is required.');
                    isFormValid = false;
                } else if (nameInput.value.trim().length < 3) {
                    setFieldError(nameInput, 'Name is too short (min 3 characters).');
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
                    setFieldError(phoneInput, 'Invalid phone number format.');
                    isFormValid = false;
                }
            }

            if (countryInput && !countryInput.value.trim()) {
                setFieldError(countryInput, 'Please specify your country.');
                isFormValid = false;
            }

            if (langSelect && !langSelect.value) {
                setFieldError(langSelect, 'Please select the language you teach.');
                isFormValid = false;
            }

            if (rateInput) {
                const rateVal = Number(rateInput.value);
                if (isNaN(rateVal) || rateVal < 5 || rateVal > 200) {
                    setFieldError(rateInput, 'Rate must be between $5 and $200 per hour.');
                    isFormValid = false;
                }
            }

            if (aboutText) {
                if (!aboutText.value.trim()) {
                    setFieldError(aboutText, 'Please provide details about your background.');
                    isFormValid = false;
                } else if (aboutText.value.trim().length < 15) {
                    setFieldError(aboutText, 'Please write at least 15 characters.');
                    isFormValid = false;
                }
            }

            if (!isFormValid) return;

            const payload = Object.fromEntries(new FormData(tutorApplicationForm).entries());

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: 'Tutor Application',
                        applicant: payload,
                        appliedAt: new Date().toISOString()
                    })
                });

                if (!response.ok) throw new Error('Submission failed');

                playSuccessSound();
                alert('Congratulations! Your tutor application has been submitted.');

                tutorApplicationForm.reset();
                tutorApplicationForm.querySelectorAll('.is-invalid').forEach(el => clearFieldError(el));

                const incomeDisplay = document.getElementById('calculatedIncome');
                if (incomeDisplay) {
                    incomeDisplay.textContent = '$1,200';
                }
            } catch (err) {
                alert('Request failed: ' + err.message);
            }
        });
    }

    // ==========================================
    // 3. ВАЛИДАЦИЯ ФОРМЫ АВТОРИЗАЦИИ (LOGIN & SIGN UP)
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

            // Проверка имени (только при регистрации)
            if (isSignUpMode) {
                if (!nameInput.value.trim()) {
                    setFieldError(nameInput, 'Full name is required.');
                    isFormValid = false;
                } else if (nameInput.value.trim().length < 2) {
                    setFieldError(nameInput, 'Name must be at least 2 characters.');
                    isFormValid = false;
                }
            }

            // Проверка Email
            if (emailInput) {
                const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim()) {
                    setFieldError(emailInput, 'Email address is required.');
                    isFormValid = false;
                } else if (!emailReg.test(emailInput.value.trim())) {
                    setFieldError(emailInput, 'Please provide a valid email.');
                    isFormValid = false;
                }
            }

            // Проверка пароля: запрет одних пробелов, пробелов вообще и проверка длины
            if (passwordInput) {
                const passwordVal = passwordInput.value;
                const trimmedPassword = passwordVal.trim();

                if (!trimmedPassword) {
                    setFieldError(passwordInput, 'Password cannot be empty or contain only spaces.');
                    isFormValid = false;
                } else if (/\s/.test(passwordVal)) {
                    setFieldError(passwordInput, 'Password must not contain spaces.');
                    isFormValid = false;
                } else if (trimmedPassword.length < 6) {
                    setFieldError(passwordInput, 'Password must be at least 6 characters.');
                    isFormValid = false;
                }
            }

            // Повтор пароля при регистрации
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

            playSuccessSound();
            const successMsg = document.getElementById('authSuccess');
            if (successMsg) {
                successMsg.classList.remove('d-none');
                successMsg.innerHTML = `<strong>Success!</strong> ${isSignUpMode ? 'Account created.' : 'Welcome back!'} Redirecting...`;
            }

            setTimeout(() => {
                alert(isSignUpMode ? 'Registration successful!' : 'Login successful!');
                authForm.reset();
                authForm.querySelectorAll('.is-invalid').forEach(el => clearFieldError(el));
                if (successMsg) successMsg.classList.add('d-none');
            }, 600);
        });
    }
});