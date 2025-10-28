const themeButton = document.getElementById('themeToggle');
const html = document.documentElement;


const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme); 
} else {
    html.setAttribute('data-theme', 'light');
}

themeButton.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    
    // Переключаем тему
    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        

    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

