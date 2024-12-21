function initializeTheme() {
    const themeToggle = document.getElementById('toggle');
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    
    // Apply the saved theme
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(savedTheme);

    // Set initial toggle state
    themeToggle.checked = savedTheme === 'dark-mode';

    // Toggle theme function
    function toggleTheme(e) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Toggle the themes
        if (isDarkMode) {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    }

    // Add change event listener
    themeToggle.addEventListener('change', toggleTheme);
}

export { initializeTheme };
