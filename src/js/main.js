import { getRandomInteger, saveNumberToStorage, validateInputValue } from "./service.js";

document.addEventListener('DOMContentLoaded', () => {

    const radioInputs = document.querySelectorAll('.radio');
    const rangeText = document.querySelector('.subtitle_text');
    const attempt = document.querySelector('.attempt_text');
    const help = document.querySelector('.text_number');
    const helpText = document.querySelector('.message');
    const checkBtn = document.querySelector('.check');
    const startBtn = document.querySelector('.start');
    const inputNumber = document.querySelector('#number');
    const container = document.querySelector('.inner');
    const enter = document.querySelector('.enter');

    const templateHint = document.querySelector('#hint-temp').content;
    const hint = templateHint.cloneNode(true);
    const hintText = hint.querySelector('.hint_span');

    const templateError = document.querySelector('#error-temp').content;
    const errorContainer = templateError.cloneNode(true);
    const errorText = errorContainer.querySelector('.error');

    const min = 1;
    let max = 100;
    let number =  getRandomInteger(max);



    ;[...radioInputs].forEach(input => {
        input.addEventListener('change', () => {
            max = document.querySelector('input[name="range"]:checked').value;
            number = getRandomInteger(max);
            onStartAgain();
        })
    });
    console.log(max);
    const computerNumber = localStorage.getItem('number');

    if (!computerNumber) {
        saveNumberToStorage(number);

        console.log(computerNumber)
    }

    let countAttemt = 0;
    let userNumber;

    const showHelpText = (number) => {
        console.log(number);
        if (number > computerNumber) {
            help.textContent = `меньше  ${number}`;
            countAttemt++;
            attempt.textContent = countAttemt;
        } else if (number < computerNumber) {
            help.textContent = `больше  ${number}`;
            countAttemt++;
            attempt.textContent = countAttemt;
        } else {
            helpText.textContent = `Ура! Вы угадали число!`;
            countAttemt++;
            attempt.textContent = countAttemt;
        }
    };

    const onCheckBtnClick = () => {
        const hasError = document.querySelector('.error');
        const hasHint = document.querySelector('.hint');

        userNumber = inputNumber.value;

        let errorMessage = validateInputValue(userNumber, max, min);

        if (errorMessage !== undefined) {
            errorText.textContent = errorMessage;
            if (!hasError) {
                enter.append(errorContainer);
            } else {
                hasError.textContent = errorMessage;
                hasError.classList.remove('none');
            }
        } else {
            helpText.classList.remove('hidden');
            if (hasError) {
                hasError.classList.add('none');;
            }
            showHelpText(userNumber);
        }

        if (computerNumber % 2 === 0) {
            hintText.textContent = "четное"
        }

        if (countAttemt >= 3 && !hasHint) {
            container.append(hint);
        }

        if (computerNumber === userNumber && hasHint) {
            hasHint.remove();
        }
    };

    const onStartAgain = () => {
        const hasError = document.querySelector('.error');
        const hasHint = document.querySelector('.hint');

        helpText.classList.add('hidden');
        localStorage.clear();
        saveNumberToStorage(number);

        if (hasHint) {
            hasHint.remove();
        }

        if (hasError) {
            hasError.remove();
        }

        countAttemt = 0;
        attempt.textContent = countAttemt;

        inputNumber.value = ''
    }

    checkBtn.addEventListener('click', onCheckBtnClick);

    startBtn.addEventListener('click', onStartAgain);
})
