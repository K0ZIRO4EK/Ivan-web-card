document.addEventListener('DOMContentLoaded', function() {
    
    const buttons = document.querySelectorAll('.button-details');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const task = this.closest('.task-card');
            task.classList.toggle('flipped');
        });
    });
});