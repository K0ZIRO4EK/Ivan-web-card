window.addEventListener('scroll', function() {
    
    const progressLine = document.querySelector('.line');
    const steps = document.querySelectorAll('.step-number');
    const section = document.querySelector('.sale');
    const firstStep = steps[0];
    const lastStep = steps[steps.length - 1];
    
    const sectionRect = section.getBoundingClientRect();
    const firstStepRect = firstStep.getBoundingClientRect();
    const lastStepRect = lastStep.getBoundingClientRect();
    
    const windowHeight = window.innerHeight;
    const scrollPosition = window.pageYOffset + windowHeight / 2;
    const firstStepPosition = firstStepRect.top + window.pageYOffset;
    const lastStepPosition = lastStepRect.bottom + window.pageYOffset;

    if (scrollPosition < firstStepPosition) {
        progressLine.style.height = '0px';
        steps.forEach(step => step.classList.remove('active'));
        return;
    }

    if (scrollPosition > lastStepPosition) {
        const maxHeight = lastStepPosition - firstStepPosition;
        progressLine.style.height = maxHeight + 'px';
        steps.forEach(step => step.classList.add('active'));
        return;
    }

    const newHeight = scrollPosition - firstStepPosition;
    progressLine.style.height = newHeight + 'px';

    steps.forEach(step => {
        const stepPosition = step.getBoundingClientRect().top + window.pageYOffset;
        step.classList.toggle('active', scrollPosition > stepPosition);
    });
});
