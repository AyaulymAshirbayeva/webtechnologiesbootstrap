/**
 * Assignment 6: jQuery Implementation for TilUP Platform
 * Group: SE-2507
 */

jQuery(document).ready(function ($) {
    console.log("jQuery is ready!");

    // ==========================================================
    // PART 2 - TASK 4: SCROLL PROGRESS BAR
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
    // PART 3 - TASK 7: TOAST NOTIFICATION SYSTEM
    // ==========================================================
    if ($('#tuToastContainer').length === 0) {
        $('body').append('<div id="tuToastContainer"></div>');
    }

    function showToast(message, type = 'success') {
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
    }

    // ==========================================================
    // PART 3 - TASK 9: IMAGE LAZY LOADING
    // ==========================================================
    function loadVisibleImages() {
        $('img.lazy-img').each(function () {
            const $img = $(this);
            const realSrc = $img.attr('data-src');

            if (realSrc && !$img.hasClass('loaded')) {
                // Напрямую присваиваем src для немедленного отображения
                $img.attr('src', realSrc).addClass('loaded');
            }
        });
    }

    // Запуск сразу после готовности документа
    loadVisibleImages();

    // Повторный запуск при скролле и после полной загрузки всех ресурсов страницы
    $(window).on('scroll resize load', loadVisibleImages);

    // ==========================================================
    // PART 1 - TASK 1, 2 & 3: LIVE SEARCH, AUTOCOMPLETE & HIGHLIGHTING
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

    // Сохраняем исходный чистый HTML текстовых элементов каждой карточки
    $cards.each(function () {
        const $card = $(this);
        $card.find('.subject-tag, .tutor-name, .rating, .tutor-bio, .tutor-details li').each(function () {
            $(this).data('original-html', $(this).html());
        });
    });

    // Функция экранирования спецсимволов для регулярного выражения
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    if ($tutorSearch.length > 0) {
        $tutorSearch.on('input keyup', function () {
            const query = $(this).val().trim();
            const lowerQuery = query.toLowerCase();

            $cards.each(function () {
                const $col = $(this);
                const $targetElements = $col.find('.subject-tag, .tutor-name, .rating, .tutor-bio, .tutor-details li');

                // 1. Сбрасываем предыдущую подсветку к чистому тексту
                $targetElements.each(function () {
                    if ($(this).data('original-html')) {
                        $(this).html($(this).data('original-html'));
                    }
                });

                // Проверяем совпадение карточки с запросом
                const cardText = $col.find('.tutor-card').text().toLowerCase();
                const isMatch = !lowerQuery || cardText.indexOf(lowerQuery) !== -1;

                if (isMatch) {
                    $col.removeClass('d-none').addClass('d-flex');

                    // 2. Если есть поисковый запрос — подсвечиваем совпавшие буквы
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

            // Автодополнение (Autocomplete)
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

        // Клик по подсказке из списка
        $(document).on('click', '.suggestion-item', function (e) {
            e.preventDefault();
            const selectedText = $(this).text().trim();
            $tutorSearch.val(selectedText).trigger('input');
            $autocompleteDropdown.hide();
        });

        // Скрытие подсказок при клике вне зоны поиска
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#tutorSearchInput, #autocompleteDropdown').length) {
                $autocompleteDropdown.hide();
            }
        });

        // Сброс подсветки при нажатии кнопки "Reset Filters"
        $('#resetTutorsFilter').on('click', function () {
            $tutorSearch.val('').trigger('input');
        });
    }

    // ==========================================================
    // PART 2 - TASK 5: ANIMATED COUNTER (ABOUT US)
    // ==========================================================
    const $counters = $('.counter-value');
    let countersStarted = false;

    function runCounters() {
        if ($counters.length === 0 || countersStarted) return;

        const windowBottom = $(window).scrollTop() + $(window).height();
        const firstCounter = $counters.first();
        if (firstCounter.length && windowBottom > firstCounter.offset().top) {
            countersStarted = true;

            $counters.each(function () {
                const $this = $(this);
                const target = parseInt($this.attr('data-target'), 10);

                $({ countNum: 0 }).animate({ countNum: target }, {
                    duration: 1800,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum).toLocaleString() + "+");
                    },
                    complete: function () {
                        $this.text(target.toLocaleString() + "+");
                    }
                });
            });
        }
    }

    if ($counters.length > 0) {
        $(window).on('scroll', runCounters);
        runCounters();
    }

    // ==========================================================
    // PART 3 - TASK 8: COPY TO CLIPBOARD BUTTON
    // ==========================================================
    $(document).on('click', '.copy-btn', function () {
        const textToCopy = $(this).attr('data-copy');
        const $btn = $(this);
        const $icon = $btn.find('.copy-icon');
        const $text = $btn.find('.copy-text');

        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
            $icon.text('✔️');
            $text.text('Copied!');
            showToast(`Copied to clipboard: "${textToCopy}"`, 'info');

            setTimeout(() => {
                $icon.text('📋');
                $text.text('Copy');
            }, 2000);
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    });

    // ==========================================================
    // COURSES PAGE: LIVE SEARCH, AUTOCOMPLETE & HIGHLIGHTING
    // ==========================================================
    const $courseSearch = $('#languageSearch');
    const $courseAutocomplete = $('#courseAutocompleteDropdown');
    const $courseResultsText = $('#languageSearchResults');
    const $courseCards = $('.language-card');

    if ($courseSearch.length > 0 && $courseCards.length > 0) {
        // Список доступных языков для подсказок
        const courseSuggestions = [
            "English", "Chinese", "Korean", "Spanish", "German", "French",
            "Kazakh", "Japanese", "Italian", "Turkish", "Russian", "Arabic"
        ];

        // Сохраняем исходный чистый HTML текстовых элементов карточек курсов
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
                const colElem = $col[0]; // Получаем нативный DOM-элемент колонки
                const $targetElements = $card.find('.card-title, .badge, .language-info-content p, .language-info-content li');

                // Сбрасываем предыдущую подсветку к чистому тексту
                $targetElements.each(function () {
                    if ($(this).data('original-html')) {
                        $(this).html($(this).data('original-html'));
                    }
                });

                // Проверяем совпадение текста карточки с поисковым запросом
                const cardText = $card.text().toLowerCase();
                const isMatch = !lowerQuery || cardText.indexOf(lowerQuery) !== -1;

                if (!lowerQuery) {
                    // Если строка поиска пуста — возвращаем исходную верстку Bootstrap
                    if (colElem) {
                        colElem.style.removeProperty('display');
                    }
                    matchedCount++;
                } else if (isMatch) {
                    // Принудительно показываем совпавшую колонку
                    if (colElem) {
                        colElem.style.setProperty('display', 'block', 'important');
                    }
                    matchedCount++;

                    const titleText = $card.find('.card-title').text().trim();
                    if (titleText) matchingNames.push(titleText);

                    // Подсвечиваем совпавшие буквы
                    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
                    $targetElements.each(function () {
                        const original = $(this).data('original-html');
                        if (regex.test(original)) {
                            $(this).html(original.replace(regex, '<span class="tu-highlight">$1</span>'));
                        }
                    });
                } else {
                    // ПРИНУДИТЕЛЬНО скрываем неподходящую колонку с приоритетом !important
                    // Это гарантированно перебивает Bootstrap класс .d-md-block
                    if (colElem) {
                        colElem.style.setProperty('display', 'none', 'important');
                    }
                }
            });

            // Обновляем текст со счетчиком результатов
            $courseResultsText.text(
                lowerQuery
                    ? `Found ${matchedCount} language(s): ${matchingNames.join(', ')}`
                    : `Available languages: ${$courseCards.length}`
            );

            // Обработка блока подсказок (Autocomplete)
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

        // Слушатель ввода текста
        $courseSearch.on('input keyup', filterCourses);

        // Клик по подсказке из списка
        $(document).on('click', '.course-suggestion-item', function (e) {
            e.preventDefault();
            const selectedText = $(this).text().trim();
            $courseSearch.val(selectedText);
            $courseAutocomplete.hide();
            filterCourses();
        });

        // Закрытие подсказок при клике вне зоны поиска
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#languageSearch, #courseAutocompleteDropdown').length) {
                $courseAutocomplete.hide();
            }
        });

        // Начальная инициализация текста
        $courseResultsText.text(`Available languages: ${$courseCards.length}`);
    }
});