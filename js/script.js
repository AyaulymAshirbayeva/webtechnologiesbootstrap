/**
 * TilUP Platform - jQuery Enhancements & UI Logic
 * Group: SE-2507
 */

jQuery(document).ready(function ($) {
    console.log("jQuery is ready!");

    // ==========================================================
    // 1. SCROLL PROGRESS BAR
    // ==========================================================
    function initScrollProgressBar() {
        if ($('#scrollProgressBar').length === 0) {
            $('body').prepend('<div id="scrollProgressBar"></div>');
        }

        function updateProgress() {
            const scrollTop = $(window).scrollTop();
            const docHeight = $(document).height() - $(window).height();
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            $('#scrollProgressBar').css('width', scrollPercent + '%');
        }

        $(window).off('scroll.progressBar resize.progressBar').on('scroll.progressBar resize.progressBar', updateProgress);
        updateProgress();
    }

    initScrollProgressBar();

    // ==========================================================
    // 2. TOAST NOTIFICATION SYSTEM (GLOBAL)
    // ==========================================================
    if ($('#tuToastContainer').length === 0) {
        $('body').append('<div id="tuToastContainer"></div>');
    }

    window.showToast = function (message, type = 'success') {
        const icon = type === 'success' ? '✅' : 'ℹ️';
        const $toast = $(`
            <div class="tu-toast ${type}">
                <span>${icon}</span>
                <span>${message}</span>
            </div>
        `).hide();

        $('#tuToastContainer').append($toast);
        $toast.fadeIn(300).delay(2500).fadeOut(400, function () {
            $(this).remove();
        });
    };

    // ==========================================================
    // 3. IMAGE LAZY LOADING (ON SCROLL VIEWPORT ENTRY)
    // ==========================================================
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src && !img.classList.contains('loaded')) {
                            img.setAttribute('src', src);
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            }, { rootMargin: "0px 0px 120px 0px" });

            $('img.lazy-img').each(function () {
                lazyObserver.observe(this);
            });
        } else {
            // Запасной вариант для старых браузеров
            $('img.lazy-img').each(function () {
                const $img = $(this);
                const realSrc = $img.attr('data-src');
                if (realSrc) {
                    $img.attr('src', realSrc).addClass('loaded');
                }
            });
        }
    }

    initLazyLoading();

    // ==========================================================
    // 4. COPY TO CLIPBOARD BUTTON (БЕЗ ДУБЛИРОВАНИЯ)
    // ==========================================================
    $(document).off('click', '.copy-btn').on('click', '.copy-btn', function (e) {
        e.preventDefault();
        const textToCopy = $(this).attr('data-copy');
        const $btn = $(this);
        const $icon = $btn.find('.copy-icon');
        const $text = $btn.find('.copy-text');

        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
            $icon.text('✔️');
            $text.text('Copied!');
            window.showToast(`Copied to clipboard: "${textToCopy}"`, 'info');

            setTimeout(() => {
                $icon.text('📋');
                $text.text(textToCopy.includes('@') ? 'Copy Email' : 'Copy');
            }, 2000);
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    });

    // ==========================================================
    // 5. ANIMATED NUMBER COUNTERS (INDEX & ABOUT US)
    // ==========================================================
    const $counters = $('.counter-value');
    let countersStarted = false;

    function runCounters() {
        if ($counters.length === 0 || countersStarted) return;

        const windowBottom = $(window).scrollTop() + $(window).height();
        const firstCounter = $counters.first();

        if (firstCounter.length && windowBottom > firstCounter.offset().top + 50) {
            countersStarted = true;

            $counters.each(function () {
                const $this = $(this);
                const target = parseInt($this.attr('data-target'), 10);

                $({ countNum: 0 }).animate({ countNum: target }, {
                    duration: 1800,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum).toLocaleString('en-US') + "+");
                    },
                    complete: function () {
                        $this.text(target.toLocaleString('en-US') + "+");
                    }
                });
            });
        }
    }

    if ($counters.length > 0) {
        $(window).on('scroll resize', runCounters);
        runCounters();
    }

    // Вспомогательная функция экранирования спецсимволов для поиска
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // ==========================================================
    // 6. TUTORS PAGE: LIVE SEARCH, AUTOCOMPLETE & HIGHLIGHTING
    // ==========================================================
    const $tutorSearch = $('#tutorSearchInput');
    const $autocompleteDropdown = $('#autocompleteDropdown');
    const $cards = $('.tutor-item-col');

    const searchSuggestions = [
        "Kazakh", "English", "Chinese", "Korean", "French", "German",
        "Spanish", "Japanese", "Italian", "Arabic", "Turkish", "Russian",
        "Aizhan Kassymova", "Li Wei", "Emily Brown", "Kim Ji-eun", "Sophie Martin",
        "Max Müller", "Carlos Ruiz", "Yuki Tanaka", "Matteo Rossi", "Yasmin Al-Farsi",
        "Elif Demir", "Dmitry Morozov"
    ];

    $cards.each(function () {
        const $card = $(this);
        $card.find('.subject-tag, .tutor-name, .rating, .tutor-bio, .tutor-details li').each(function () {
            $(this).data('original-html', $(this).html());
        });
    });

    if ($tutorSearch.length > 0) {
        $tutorSearch.on('input keyup', function () {
            const query = $(this).val().trim();
            const lowerQuery = query.toLowerCase();

            // Сохраняем поисковый запрос в localStorage (Пункт 5.3 критериев)
            localStorage.setItem('tilupLastTutorSearch', query);

            $cards.each(function () {
                const $col = $(this);
                const $targetElements = $col.find('.subject-tag, .tutor-name, .rating, .tutor-bio, .tutor-details li');

                $targetElements.each(function () {
                    if ($(this).data('original-html')) {
                        $(this).html($(this).data('original-html'));
                    }
                });

                const cardText = $col.find('.tutor-card').text().toLowerCase();
                const isMatch = !lowerQuery || cardText.indexOf(lowerQuery) !== -1;

                if (isMatch) {
                    $col.removeClass('d-none').addClass('d-flex');

                    if (query.length > 0) {
                        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
                        $targetElements.each(function () {
                            const original = $(this).data('original-html');
                            if (regex.test(original)) {
                                $(this).html(original.replace(regex, '<span class="tu-highlight">$1</span>'));
                            }
                        });
                    }
                } else {
                    $col.removeClass('d-flex').addClass('d-none');
                }
            });

            if (lowerQuery.length > 0) {
                const matched = searchSuggestions.filter(item =>
                    item.toLowerCase().includes(lowerQuery)
                );

                if (matched.length > 0) {
                    $autocompleteDropdown.empty();
                    matched.slice(0, 5).forEach(item => {
                        $autocompleteDropdown.append(`
                            <a href="#" class="list-group-item list-group-item-action py-2 suggestion-item">${item}</a>
                        `);
                    });
                    $autocompleteDropdown.show();
                } else {
                    $autocompleteDropdown.hide();
                }
            } else {
                $autocompleteDropdown.hide();
            }
        });

        // Восстановление последнего поиска из localStorage при загрузке страницы
        const savedTutorQuery = localStorage.getItem('tilupLastTutorSearch');
        if (savedTutorQuery) {
            $tutorSearch.val(savedTutorQuery).trigger('input');
        }

        $(document).off('click', '.suggestion-item').on('click', '.suggestion-item', function (e) {
            e.preventDefault();
            const selectedText = $(this).text().trim();
            $tutorSearch.val(selectedText).trigger('input');
            $autocompleteDropdown.hide();
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('#tutorSearchInput, #autocompleteDropdown').length) {
                $autocompleteDropdown.hide();
            }
        });

        $('#resetTutorsFilter').on('click', function () {
            localStorage.removeItem('tilupLastTutorSearch');
            $tutorSearch.val('').trigger('input');
        });
    }

    // ==========================================================
    // 7. COURSES PAGE: LIVE SEARCH, AUTOCOMPLETE & HIGHLIGHTING
    // ==========================================================
    const $courseSearch = $('#languageSearch');
    const $courseAutocomplete = $('#courseAutocompleteDropdown');
    const $courseResultsText = $('#languageSearchResults');
    const $courseCards = $('.language-card');

    if ($courseSearch.length > 0 && $courseCards.length > 0) {
        const courseSuggestions = [
            "English", "Chinese", "Korean", "Spanish", "German", "French",
            "Kazakh", "Japanese", "Italian", "Turkish", "Russian", "Arabic"
        ];

        $courseCards.each(function () {
            const $card = $(this);
            $card.find('.card-title, .badge, .language-info-content p, .language-info-content li').each(function () {
                $(this).data('original-html', $(this).html());
            });
        });

        function filterCourses() {
            const query = $courseSearch.val().trim();
            const lowerQuery = query.toLowerCase();

            let matchedCount = 0;
            const matchingNames = [];

            $courseCards.each(function () {
                const $card = $(this);
                const $col = $card.closest('[class*="col-"]');
                const colElem = $col[0];
                const $targetElements = $card.find('.card-title, .badge, .language-info-content p, .language-info-content li');

                $targetElements.each(function () {
                    if ($(this).data('original-html')) {
                        $(this).html($(this).data('original-html'));
                    }
                });

                const cardText = $card.text().toLowerCase();
                const isMatch = !lowerQuery || cardText.indexOf(lowerQuery) !== -1;

                if (!lowerQuery) {
                    if (colElem) {
                        colElem.style.removeProperty('display');
                    }
                    matchedCount++;
                } else if (isMatch) {
                    if (colElem) {
                        colElem.style.setProperty('display', 'block', 'important');
                    }
                    matchedCount++;

                    const titleText = $card.find('.card-title').text().trim();
                    if (titleText) matchingNames.push(titleText);

                    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
                    $targetElements.each(function () {
                        const original = $(this).data('original-html');
                        if (regex.test(original)) {
                            $(this).html(original.replace(regex, '<span class="tu-highlight">$1</span>'));
                        }
                    });
                } else {
                    if (colElem) {
                        colElem.style.setProperty('display', 'none', 'important');
                    }
                }
            });

            $courseResultsText.text(
                lowerQuery
                    ? `Found ${matchedCount} language(s): ${matchingNames.join(', ')}`
                    : `Available languages: ${$courseCards.length}`
            );

            if (lowerQuery.length > 0) {
                const matchedSuggestions = courseSuggestions.filter(item =>
                    item.toLowerCase().includes(lowerQuery)
                );

                if (matchedSuggestions.length > 0) {
                    $courseAutocomplete.empty();
                    matchedSuggestions.slice(0, 5).forEach(item => {
                        $courseAutocomplete.append(`
                            <a href="#" class="list-group-item list-group-item-action py-2 course-suggestion-item">${item}</a>
                        `);
                    });
                    $courseAutocomplete.show();
                } else {
                    $courseAutocomplete.hide();
                }
            } else {
                $courseAutocomplete.hide();
            }
        }

        $courseSearch.on('input keyup', filterCourses);

        $(document).off('click', '.course-suggestion-item').on('click', '.course-suggestion-item', function (e) {
            e.preventDefault();
            const selectedText = $(this).text().trim();
            $courseSearch.val(selectedText);
            $courseAutocomplete.hide();
            filterCourses();
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('#languageSearch, #courseAutocompleteDropdown').length) {
                $courseAutocomplete.hide();
            }
        });

        $courseResultsText.text(`Available languages: ${$courseCards.length}`);
    }

    // ==========================================================
    // 8. INTERACTIVE TUTOR BOOKING & PREMIUM BUTTONS
    // ==========================================================
    $(document).on('click', '.tutor-btn', function (e) {
        e.preventDefault();
        const tutorName = $(this).closest('.tutor-card').find('.tutor-name').text().trim();
        const tutorLang = $(this).closest('.tutor-card').find('.subject-tag').text().trim();
        localStorage.setItem('tilupSelectedTutor', JSON.stringify({ name: tutorName, language: tutorLang }));
        window.showToast(`Trial lesson request sent to ${tutorName} (${tutorLang})!`, 'success');
    });

    $(document).on('click', '.premium-section .button', function (e) {
        e.preventDefault();
        const plansSection = $('table').closest('section');
        if (plansSection.length) {
            $('html, body').animate({ scrollTop: plansSection.offset().top - 80 }, 500);
        }
        window.showToast('Compare our plans below to activate TilUP Premium!', 'info');
    });
});