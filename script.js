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
