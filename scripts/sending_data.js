function handleFormSubmit(formId, nameId, phoneId) {
    
    const form = document.getElementById(formId);
    const nameInput = document.getElementById(nameId);
    const phoneInput = document.getElementById(phoneId);
    const phonePlaceholder = phoneInput.placeholder;
    let wasEdited = false;
    
    let lastSubmissionTime = 0;
    const MIN_SUBMISSION_INTERVAL = 5000;
    let submissionAttempts = 0;
    const MAX_ATTEMPTS = 5;
    const ATTEMPT_RESET_TIME = 300000;
    
    setInterval(() => {
        submissionAttempts = 0;
    }, ATTEMPT_RESET_TIME);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentTime = Date.now();
        if (currentTime - lastSubmissionTime < MIN_SUBMISSION_INTERVAL) {
            alert('Пожалуйста, не отправляйте формы так часто. Подождите несколько секунд.');
            return;
        }
        
        if (submissionAttempts >= MAX_ATTEMPTS) {
            alert('Слишком много попыток отправки. Пожалуйста, попробуйте позже.');
            return;
        }

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const phoneDigits = phone.replace(/\D/g, '');
        const errors = [];

        if (!name) {
            errors.push('Укажите ФИО');
        } else if (/\d/.test(name)) {
            errors.push('ФИО не должно содержать цифр');
        }

        if (!phone || phone === '+7') {
            errors.push('Укажите номер телефона');
        } else {
            if (!phone.startsWith('+7')) {
                errors.push('Номер должен начинаться с +7');
            }
            
            if (phoneDigits.length !== 11) {
                const missing = 11 - phoneDigits.length;
                errors.push(`В номере не хватает ${missing} ${getRussianWord(missing, ['цифры', 'цифр', 'цифр'])}`);
            }
        }

        if (errors.length > 0) {
            submissionAttempts++;
            alert(errors.join('\n'));
            return;
        }

        const token = '8106937908:AAFweL_ddaNFkwkTg1y2TpgDnLhfQ_S4kV0';
        const chatId = '7211816486';
        const message = `ФИО: ${name}\nТелефон: ${phone}`;

        setTimeout(() => {
            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            })
            .then(response => {
                lastSubmissionTime = Date.now();
                return response.json();
            })
            .then(data => {
                if (data.ok) {
                    alert('Ваше сообщение отправлено!');
                    form.reset();
                    wasEdited = false;
                    phoneInput.placeholder = phonePlaceholder;
                    phoneInput.value = '';
                    submissionAttempts = 0;
                } else {
                    throw new Error('Ошибка отправки');
                }
            })
            .catch(() => {
                submissionAttempts++;
                alert('Ошибка отправки сообщения. Попробуйте еще раз.');
            });
        }, 1000);
    });

    function getRussianWord(number, words) {
        const cases = [2, 0, 1, 1, 1, 2];
        return words[
            number % 100 > 4 && number % 100 < 20 
                ? 2 
                : cases[Math.min(number % 10, 5)]
        ];
    }

    phoneInput.addEventListener('focus', function() {
        if (!wasEdited) {
            phoneInput.value = '+7';
            phoneInput.placeholder = '';
        }
    });

    phoneInput.addEventListener('input', function(e) {
        if (!wasEdited) wasEdited = true;
        
        let phoneValue = phoneInput.value.replace(/\D/g, '');
        
        if (!phoneValue.startsWith('7') && phoneValue.length > 0) {
            phoneValue = '7' + phoneValue;
        }

        let formattedPhone = '+';
        if (phoneValue.length > 0) formattedPhone += phoneValue.substring(0, 1);
        if (phoneValue.length > 1) formattedPhone += ' (' + phoneValue.substring(1, 4);
        if (phoneValue.length >= 5) formattedPhone += ') ' + phoneValue.substring(4, 7);
        if (phoneValue.length >= 8) formattedPhone += '-' + phoneValue.substring(7, 9);
        if (phoneValue.length >= 10) formattedPhone += '-' + phoneValue.substring(9, 11);

        phoneInput.value = formattedPhone;
    });

    phoneInput.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && phoneInput.selectionStart <= 2 && wasEdited) {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener('blur', function() {
        if (!wasEdited || phoneInput.value === '+7') {
            phoneInput.value = '';
            phoneInput.placeholder = phonePlaceholder;
            wasEdited = false;
        }
    });
}

handleFormSubmit('form', 'name', 'phone');