// Simple JavaScript functionality for the website

document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for the header
    const header = document.querySelector('h1');
    const originalText = header.textContent;
    header.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            header.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 70 + 40); // Random delay for more realistic typing
        }
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 300);
    
    // Simple fade-in animation for sections
    const sections = document.querySelectorAll('section');
    
    // Add fade-in class to all sections
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
        // Stagger the animations
        setTimeout(() => {
            section.classList.add('visible');
        }, 300 + (index * 150));
    });
});

// Add CSS for the fade-in animation to the existing stylesheet
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(5px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// List of languages with their codes
const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'it', name: 'Italian', native: 'Italiano' },
    { code: 'pt', name: 'Portuguese', native: 'Português' },
    { code: 'ru', name: 'Russian', native: 'Русский' },
    { code: 'zh', name: 'Chinese', native: '中文' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    // Add more languages here...
];

// Initialize language menu
document.addEventListener('DOMContentLoaded', () => {
    const languageList = document.querySelector('.language-list');
    languages.forEach(lang => {
        const div = document.createElement('div');
        div.className = 'language-item';
        div.innerHTML = `
            <span>${lang.name}</span>
            <span>${lang.native}</span>
        `;
        div.onclick = () => changeLanguage(lang.code);
        languageList.appendChild(div);
    });
});

// Toggle language menu
function toggleLanguageMenu(event) {
    event.preventDefault();
    const menu = document.getElementById('language-menu');
    menu.classList.toggle('show');
    
    // Close menu when clicking outside
    document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target) && !e.target.closest('.language-selector')) {
            menu.classList.remove('show');
            document.removeEventListener('click', closeMenu);
        }
    });
}

// Filter languages
function filterLanguages(query) {
    const items = document.querySelectorAll('.language-item');
    query = query.toLowerCase();
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

// Change language
function changeLanguage(langCode) {
    // Here you would typically:
    // 1. Load translations for the selected language
    // 2. Update all text content on the page
    // 3. Update URLs if needed
    // 4. Store language preference
    
    // For now, we'll just simulate the change
    console.log(`Changing language to: ${langCode}`);
    // You would need to implement the actual translation logic here
}
