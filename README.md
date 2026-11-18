# TilUP — Learn a Language with Confidence

TilUP is a language-learning platform concept for students who want to explore courses, find a tutor, and choose a learning path that fits their goals. It is also for tutors who want to introduce themselves and apply to teach on the platform.

## What you can do on TilUP

- **Explore courses:** browse language options and use the course search to find a language.
- **Find a tutor:** search tutor profiles and filter them by language and learning level.
- **Choose a learning path:** compare available study formats and Premium information.
- **Create an account:** use the Sign Up and Log In forms, then view your name and email on your profile page.
- **Apply to teach:** submit a tutor application, validate your contact details, and use the income calculator to estimate monthly earnings.
- **Learn about the platform:** read about the learning approach, browse team and project information, and explore FAQs and student reviews.
- **Personalize the site:** switch between light and dark themes; the selected theme is remembered between pages.

## Who TilUP is for

TilUP is designed for language learners looking for courses or one-to-one tutoring, and for language tutors interested in teaching students through the platform.

## Project repository

The source code and project history are available on [GitHub](https://github.com/AyaulymAshirbayeva/webtechnologiesbootstrap).

## Project structure

```text
webtechnologiesbootstrap/
├── index.html
├── about.html
├── become_tutor.html
├── courses.html
├── login.html
├── profile.html
├── tutors.html
├── why-learn.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── script.js
└── images/
```

## Interactive features

Search and filters update the displayed courses and tutor cards. The site also includes form validation with on-page messages, interactive buttons, animated cards and popups, and a light/dark theme toggle.

### Country API

The **Become a Tutor** page loads country names for its country selector from [countries.dev](https://countries.dev/docs), using `https://countries.dev/countries?fields=name`. The response is fetched dynamically in `js/main.js`; the API documentation says browser requests are supported with CORS and do not require an API key. If the request fails, the page uses a built-in fallback list.



## Technologies

- HTML5
- CSS3
- Bootstrap
- JavaScript
- jQuery
- Browser `localStorage`
- countries.dev API
