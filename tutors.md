<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Created by: Ashirbayeva Ayaulym, Kairullina Madina -->

    <title>TilUP | Find a Language Tutor</title>

    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<div class="tutors-page-layout">

    <!-- =====================================================
         NAVBAR
    ====================================================== -->

    <header class="site-header">

        <nav class="navbar">

            <a href="index.html" class="logo">
                <img src="images/logo.PNG" alt="TilUP logo">
                <span>Til<span class="logo-up">UP</span></span>
            </a>

            <div class="nav-menu">
                <a href="index.html">Home</a>
                <a href="why-learn.html">Why Learn</a>
                <a href="courses.html">Courses</a>
                <a href="tutors.html" class="active">Find a Tutor</a>
                <a href="become_tutor.html">Become a Tutor</a>
                <a href="about.html">About Us</a>
            </div>

            <a href="#" class="login-button">Login</a>

        </nav>

    </header>


    <!-- =====================================================
         HERO
         FULL WIDTH
    ====================================================== -->

    <section class="tutors-hero">

        <div class="tutors-hero-content">

            <p class="section-label">
                LANGUAGE EXPERTS
            </p>

            <h1>
                Meet our tutors!
            </h1>

            <p>
                Choose a tutor based on the language you want to learn
                and your current level.
            </p>

        </div>

    </section>


    <!-- =====================================================
         SIDEBAR / FILTERS
    ====================================================== -->

    <aside class="tutors-sidebar">

        <div class="sidebar-content">

            <p class="section-label">
                FIND YOUR TUTOR
            </p>

            <h2>
                Filter Tutors
            </h2>

            <p class="sidebar-description">
                Choose a language, level and lesson type to find a tutor.
            </p>


            <form class="filters">

                <!-- LANGUAGE -->

                <div class="filter-box">

                    <label for="filter-language">

                        <svg class="ui-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor"
                             stroke-width="2"
                             stroke-linecap="round"
                             stroke-linejoin="round">

                            <circle cx="12" cy="12" r="10"></circle>

                            <line x1="2"
                                  y1="12"
                                  x2="22"
                                  y2="12"></line>

                            <path d="M12 2a15.3 15.3 0 0 1 4 10
                                     15.3 15.3 0 0 1-4 10
                                     15.3 15.3 0 0 1-4-10
                                     15.3 15.3 0 0 1 4-10z"></path>

                        </svg>

                        Language

                    </label>


                    <select id="filter-language" name="language">

                        <option value="">
                            All Languages
                        </option>

                        <option value="kazakh">
                            Kazakh
                        </option>

                        <option value="chinese">
                            Chinese
                        </option>

                        <option value="english">
                            English
                        </option>

                        <option value="korean">
                            Korean
                        </option>

                        <option value="french">
                            French
                        </option>

                        <option value="german">
                            German
                        </option>

                        <option value="spanish">
                            Spanish
                        </option>

                        <option value="japanese">
                            Japanese
                        </option>

                        <option value="italian">
                            Italian
                        </option>

                        <option value="arabic">
                            Arabic
                        </option>

                        <option value="turkish">
                            Turkish
                        </option>

                        <option value="russian">
                            Russian
                        </option>

                    </select>

                </div>


                <!-- LEVEL -->

                <div class="filter-box">

                    <label for="filter-level">

                        <svg class="ui-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor"
                             stroke-width="2"
                             stroke-linecap="round"
                             stroke-linejoin="round">

                            <line x1="18"
                                  y1="20"
                                  x2="18"
                                  y2="10"></line>

                            <line x1="12"
                                  y1="20"
                                  x2="12"
                                  y2="4"></line>

                            <line x1="6"
                                  y1="20"
                                  x2="6"
                                  y2="14"></line>

                        </svg>

                        Level

                    </label>


                    <select id="filter-level" name="level">

                        <option value="">
                            All Levels
                        </option>

                        <option value="a1-a2">
                            A1–A2 (Beginner)
                        </option>

                        <option value="b1-b2">
                            B1–B2 (Intermediate)
                        </option>

                        <option value="c1-c2">
                            C1–C2 (Advanced)
                        </option>

                    </select>

                </div>


                <!-- LESSON TYPE -->

                <div class="filter-box">

                    <label for="filter-type">

                        <svg class="ui-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor"
                             stroke-width="2"
                             stroke-linecap="round"
                             stroke-linejoin="round">

                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>

                            <path d="M6.5 2H20v20H6.5
                                     A2.5 2.5 0 0 1 4 19.5v-15
                                     A2.5 2.5 0 0 1 6.5 2z"></path>

                        </svg>

                        Lesson Type

                    </label>


                    <select id="filter-type" name="type">

                        <option value="">
                            All Lessons
                        </option>

                        <option value="speaking">
                            Speaking Practice
                        </option>

                        <option value="grammar">
                            Grammar & Writing
                        </option>

                        <option value="exam">
                            Exam Preparation
                        </option>

                        <option value="business">
                            Business Language
                        </option>

                    </select>

                </div>

            </form>

        </div>

    </aside>


    <!-- =====================================================
         TUTORS
    ====================================================== -->

    <main class="tutors-main">

        <section class="tutors-section">

            <div class="tutors-grid">


                <!-- TUTOR 1 -->

                <article class="tutor-card">

                    <img src="images/tutor7.jpg"
                         alt="Aizhan Kassymova"
                         class="tutor-photo">

                    <span class="subject-tag">
                        Kazakh
                    </span>

                    <h3 class="tutor-name">
                        Aizhan Kassymova
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        5.0 • Native Speaker & Philologist

                    </p>

                    <p class="tutor-bio">
                        Modern Kazakh for everyday life,
                        conversational practice and business communication.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A1–C1</li>
                        <li>Lesson: Conversational & QAZTEST</li>
                        <li>Hourly Rate: $16</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 2 -->

                <article class="tutor-card">

                    <img src="images/tutor8.jpg"
                         alt="Li Wei"
                         class="tutor-photo">

                    <span class="subject-tag">
                        Chinese
                    </span>

                    <h3 class="tutor-name">
                        Li Wei
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        4.9 • Certified HSK Trainer

                    </p>

                    <p class="tutor-bio">
                        Mandarin pronunciation, pinyin,
                        Chinese characters and intensive HSK 1–6 preparation.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: Beginner – HSK 6</li>
                        <li>Lesson: HSK Exam & Speaking</li>
                        <li>Hourly Rate: $22</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 3 -->

                <article class="tutor-card">

                    <img src="images/tutor1.jpg"
                         alt="Emily Brown"
                         class="tutor-photo">

                    <span class="subject-tag">
                        English
                    </span>

                    <h3 class="tutor-name">
                        Emily Brown
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        4.9 • Native English Speaker

                    </p>

                    <p class="tutor-bio">
                        Specializes in IELTS, Business English
                        and conversational fluency practice.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A2–C2</li>
                        <li>Lesson: IELTS & Speaking</li>
                        <li>Hourly Rate: $18</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 4 -->

                <article class="tutor-card">

                    <img src="images/tutor2.jpg"
                         alt="Kim Ji-eun"
                         class="tutor-photo">

                    <span class="subject-tag">
                        Korean
                    </span>

                    <h3 class="tutor-name">
                        Kim Ji-eun
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        5.0 • TOPIK Specialist

                    </p>

                    <p class="tutor-bio">
                        Teaches Korean grammar, everyday expressions
                        and TOPIK exam preparation.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A1–B2</li>
                        <li>Lesson: TOPIK & Conversation</li>
                        <li>Hourly Rate: $20</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 5 -->

                <article class="tutor-card">

                    <img src="images/tutor3.jpg"
                         alt="Sophie Martin"
                         class="tutor-photo">

                    <span class="subject-tag">
                        French
                    </span>

                    <h3 class="tutor-name">
                        Sophie Martin
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        4.8 • DELF Certified Tutor

                    </p>

                    <p class="tutor-bio">
                        French conversation, accent reduction,
                        grammar and DELF preparation.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: Beginner – Advanced</li>
                        <li>Lesson: Grammar & Speaking</li>
                        <li>Hourly Rate: $19</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 6 -->

                <article class="tutor-card">

                    <img src="images/tutor4.jpg"
                         alt="Max Müller"
                         class="tutor-photo">

                    <span class="subject-tag">
                        German
                    </span>

                    <h3 class="tutor-name">
                        Max Müller
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        4.9 • Goethe Exam Tutor

                    </p>

                    <p class="tutor-bio">
                        Structured German lessons focused on vocabulary,
                        grammar and Goethe certificates.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A1–C1</li>
                        <li>Lesson: Goethe Exam</li>
                        <li>Hourly Rate: $21</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 7 -->

                <article class="tutor-card">

                    <img src="images/tutor5.jpg"
                         alt="Carlos Ruiz"
                         class="tutor-photo">

                    <span class="subject-tag">
                        Spanish
                    </span>

                    <h3 class="tutor-name">
                        Carlos Ruiz
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        4.8 • Speaking Club Host

                    </p>

                    <p class="tutor-bio">
                        Practice everyday Spanish through interactive
                        speaking lessons and cultural discussions.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A1–B2</li>
                        <li>Lesson: Speaking Practice</li>
                        <li>Hourly Rate: $17</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 8 -->

                <article class="tutor-card">

                    <img src="images/tutor6.jpg"
                         alt="Yuki Tanaka"
                         class="tutor-photo">

                    <span class="subject-tag">
                        Japanese
                    </span>

                    <h3 class="tutor-name">
                        Yuki Tanaka
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        5.0 • JLPT Specialist

                    </p>

                    <p class="tutor-bio">
                        Japanese lessons for JLPT preparation,
                        kanji mastery and natural conversational flow.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A1–C1</li>
                        <li>Lesson: JLPT & Speaking</li>
                        <li>Hourly Rate: $22</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 9 -->

                <article class="tutor-card">

                    <img src="images/tutor9.jpg"
                         alt="Matteo Rossi"
                         class="tutor-photo">

                    <span class="subject-tag">
                        Italian
                    </span>

                    <h3 class="tutor-name">
                        Matteo Rossi
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        4.9 • Italian Conversation Tutor

                    </p>

                    <p class="tutor-bio">
                        Italian pronunciation, everyday conversation,
                        grammar and travel communication.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A1–C1</li>
                        <li>Lesson: Speaking & Grammar</li>
                        <li>Hourly Rate: $18</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 10 -->

                <article class="tutor-card">

                    <img src="images/tutor10.jpg"
                         alt="Yasmin Al-Farsi"
                         class="tutor-photo">

                    <span class="subject-tag">
                        Arabic
                    </span>

                    <h3 class="tutor-name">
                        Yasmin Al-Farsi
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        4.8 • Arabic Language Coach

                    </p>

                    <p class="tutor-bio">
                        Modern Arabic, pronunciation, reading and
                        practical conversation for beginners.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A1–B2</li>
                        <li>Lesson: Speaking & Reading</li>
                        <li>Hourly Rate: $17</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 11 -->

                <article class="tutor-card">

                    <img src="images/tutor11.jpg"
                         alt="Elif Demir"
                         class="tutor-photo">

                    <span class="subject-tag">
                        Turkish
                    </span>

                    <h3 class="tutor-name">
                        Elif Demir
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        4.9 • Turkish Conversation Tutor

                    </p>

                    <p class="tutor-bio">
                        Learn Turkish through practical conversation,
                        grammar and everyday vocabulary.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A1–C1</li>
                        <li>Lesson: Conversation & Grammar</li>
                        <li>Hourly Rate: $16</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


                <!-- TUTOR 12 -->

                <article class="tutor-card">

                    <img src="images/tutor12.jpg"
                         alt="Dmitry Morozov"
                         class="tutor-photo">

                    <span class="subject-tag">
                        Russian
                    </span>

                    <h3 class="tutor-name">
                        Dmitry Morozov
                    </h3>

                    <p class="rating">

                        <svg class="star-icon"
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="#F2C94C">

                            <polygon points="
                                12 2
                                15.09 8.26
                                22 9.27
                                17 14.14
                                18.18 21.02
                                12 17.77
                                5.82 21.02
                                7 14.14
                                2 9.27
                                8.91 8.26
                                12 2
                            "></polygon>

                        </svg>

                        5.0 • Russian Language Teacher

                    </p>

                    <p class="tutor-bio">
                        Russian grammar, vocabulary, pronunciation
                        and confident everyday communication.
                    </p>

                    <ul class="tutor-details">
                        <li>Levels: A1–C2</li>
                        <li>Lesson: Grammar & Speaking</li>
                        <li>Hourly Rate: $15</li>
                    </ul>

                    <a href="#" class="button tutor-btn">
                        Choose Tutor
                    </a>

                </article>


            </div>

        </section>

    </main>


    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <footer class="site-footer">

        <p>&copy; 2026 TilUP</p>

        <p>
            Team Members: Ashirbayeva Ayaulym, Kairullina Madina
        </p>

    </footer>

</div>

</body>
</html>