function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    document.addEventListener('touchstart', function(e) {
        const targetButton = e.target.closest('.btn');
        if (targetButton) {
            targetButton.classList.add('touch-active');
        }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        document.querySelectorAll('.btn.touch-active').forEach(btn => {
            btn.classList.remove('touch-active');
        });
    }, { passive: true });

    document.addEventListener('touchcancel', function(e) {
        document.querySelectorAll('.btn.touch-active').forEach(btn => {
            btn.classList.remove('touch-active');
        });
    }, { passive: true });
}