
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // SUCCESS SOUND
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
    // CONTACT FORM: VALIDATION + ASYNC FETCH
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formInputs = contactForm.querySelectorAll(
                'input:not([type="checkbox"]):not([type="radio"]), textarea'
            );

            let isValid = true;

            // Validate required fields
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            // Validate email format
            const emailInput =
                contactForm.querySelector('input[type="email"]');

            if (emailInput && emailInput.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(emailInput.value.trim())) {
                    emailInput.classList.add('is-invalid');
                    isValid = false;
                }
            }

            // Stop if validation fails
            if (!isValid) {
                alert('Please fill in all required fields correctly.');
                return;
            }

            // Collect form data
            const formData = Object.fromEntries(
                new FormData(contactForm).entries()
            );

            // Send data asynchronously using fetch()
            try {
                console.log('Sending form data...', formData);

                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: 'TilUP Contact Form Message',
                            body: JSON.stringify(formData),
                            userId: 1
                        })
                    }
                );

                console.log('HTTP status:', response.status);

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const result = await response.json();

                console.log('Server response:', result);

                playSuccessSound();
                alert('Message submitted successfully!');

                contactForm.reset();

                contactForm.querySelectorAll('.is-invalid').forEach(input => {
                    input.classList.remove('is-invalid');
                });

                if (popupOverlay) {
                    popupOverlay.classList.remove('active');
                }

            } catch (error) {
                console.error(
                    'Form submission error:',
                    error.name,
                    error.message
                );

                alert('Request failed: ' + error.message);
            }
        });

        // Clear validation styles when editing fields
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid');
            });
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
    // LANGUAGE SEARCH: FILTER
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
    // TASK 1: LOGIN VALIDATION
    // ==========================================
    const authForm = document.getElementById('authForm');

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            const nameInput = document.getElementById('signupName');
            const emailInput = document.getElementById('authEmail');
            const passwordInput = document.getElementById('authPassword');
            const confirmInput =
                document.getElementById('authPasswordConfirm');

            document.querySelectorAll('.tu-error-msg').forEach(msg => {
                msg.textContent = '';
            });

            if (
                nameInput &&
                nameInput.offsetParent !== null &&
                nameInput.value.trim().length < 2
            ) {
                const el = document.getElementById('nameError');

                if (el) {
                    el.textContent = 'Please enter your full name.';
                }

                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailInput && !emailPattern.test(emailInput.value.trim())) {
                const el = document.getElementById('emailError');

                if (el) {
                    el.textContent = 'Please provide a valid email.';
                }

                isValid = false;
            }

            if (passwordInput && passwordInput.value.length < 6) {
                const el = document.getElementById('passwordError');

                if (el) {
                    el.textContent = 'Password must be at least 6 characters.';
                }

                isValid = false;
            }

            if (
                confirmInput &&
                confirmInput.offsetParent !== null &&
                passwordInput &&
                passwordInput.value !== confirmInput.value
            ) {
                const el = document.getElementById('confirmError');

                if (el) {
                    el.textContent = 'Passwords do not match.';
                }

                isValid = false;
            }

            if (isValid) {
                const successMsg = document.getElementById('authSuccess');

                if (successMsg) {
                    successMsg.classList.remove('d-none');
                    successMsg.innerHTML =
                        '<strong>Success!</strong> Redirecting...';
                }

                setTimeout(() => {
                    alert('Authentication successful!');

                    authForm.reset();

                    if (successMsg) {
                        successMsg.classList.add('d-none');
                    }
                }, 800);
            }
        });
    }
});
