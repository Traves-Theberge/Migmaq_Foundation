document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        applyTheme();
    });

    applyTheme(); // Apply the initial theme

    // Function to apply the current theme (dark or light)
    function applyTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const themeToggleIcon = document.getElementById('theme-toggle');
        const githubIcon = document.querySelector('.icon[src*="github"]');

        // Update the theme toggle icon
        themeToggleIcon.src = isDarkMode
            ? 'https://img.icons8.com/ios-glyphs/30/ffffff/moon-symbol.png'
            : 'https://img.icons8.com/ios-glyphs/30/000000/sun.png';

        // Update the GitHub icon color
        githubIcon.src = isDarkMode
            ? 'https://img.icons8.com/material-outlined/24/ffffff/github.png'
            : 'https://img.icons8.com/material-outlined/24/000000/github.png';

        // Update the navbar classes
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('dark-mode', isDarkMode);
        navbar.classList.toggle('light-mode', !isDarkMode);

        // Set the background color for HTML and body elements
        document.documentElement.style.backgroundColor = isDarkMode ? '#1a202c' : '#f9f9f9';
        document.body.style.backgroundColor = isDarkMode ? '#1a202c' : '#f9f9f9';
    }
});
