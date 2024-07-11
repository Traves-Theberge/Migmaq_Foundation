document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navbar = document.getElementById('navbar');

    // Load the saved theme from localStorage, default to dark-mode if not set
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedTheme);
    navbar.classList.remove('light-mode', 'dark-mode');
    navbar.classList.add(savedTheme);

    // Set the initial icon based on the theme
    themeToggle.src = savedTheme === 'dark-mode' ? 'https://img.icons8.com/ios-glyphs/30/ffffff/moon-symbol.png' : 'https://img.icons8.com/ios-glyphs/30/000000/sun.png';
    document.querySelector('.navbar .icon:nth-child(1)').src = savedTheme === 'dark-mode' ? 'https://img.icons8.com/material-outlined/24/ffffff/github.png' : 'https://img.icons8.com/material-outlined/24/000000/github.png';

    // Toggle the theme on button click
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            navbar.classList.remove('light-mode');
            navbar.classList.add('dark-mode');
            themeToggle.src = 'https://img.icons8.com/ios-glyphs/30/ffffff/moon-symbol.png';
            document.querySelector('.navbar .icon:nth-child(1)').src = 'https://img.icons8.com/material-outlined/24/ffffff/github.png';
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            navbar.classList.remove('dark-mode');
            navbar.classList.add('light-mode');
            themeToggle.src = 'https://img.icons8.com/ios-glyphs/30/000000/sun.png';
            document.querySelector('.navbar .icon:nth-child(1)').src = 'https://img.icons8.com/material-outlined/24/000000/github.png';
            localStorage.setItem('theme', 'light-mode');
        }
    });
});