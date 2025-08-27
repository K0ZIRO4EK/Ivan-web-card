document.addEventListener('DOMContentLoaded', function() {
    
    const animationSettings = {
        duration: 800,
        delay: 200,
        threshold: 0.1
    };

    const blocks = document.querySelectorAll('.animated-block');
    blocks.forEach(block => {
        if (!block.classList.contains('animated')) {
            block.style.opacity = '0';
            block.style.transform = 'translateY(30px)';
            block.style.transition = `all ${animationSettings.duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, animationSettings.delay);
            }
        });
    }, {
        threshold: animationSettings.threshold,
        rootMargin: animationSettings.rootMargin
    });

    blocks.forEach(block => {
        observer.observe(block);
    });
});