// Theme Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    const htmlElement = document.documentElement;
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Theme switcher click handler
    themeSwitcher.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Function to set theme
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        themeSwitcher.innerHTML = theme === 'light' ? moonIcon : sunIcon;
        localStorage.setItem('theme', theme);

        // Update meta theme color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', 
                theme === 'light' ? '#FFFFFF' : '#1A1D22'
            );
        }

        // Dispatch event for other scripts that might need to react to theme changes
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    // Add smooth transition when theme changes
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    // Optional: Add system theme preference detection
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}); 