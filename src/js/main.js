import { getRandomInteger, saveNumberToStorage, validateInputValue } from "./service.js";

const rangeNumbersWrapper = document.querySelectorAll('.input_wrapper');
const rangeText = document.querySelector('.subtitle_text');
const attempt = document.querySelector('.attempt_text');
const help = document.querySelector('.text_number');
const helpText = document.querySelector('.message');
const checkBtn = document.querySelector('.check');
const inputNumber = document.querySelector('#number');
const container = document.querySelector('.inner');
const enter = document.querySelector('.enter');

const computerNumber = getRandomInteger(100);
console.log(computerNumber)
let countAttemt = 0;
let userNumber;

;[...rangeNumbersWrapper].forEach(item => {
    const input = item.querySelector('.radio');

    const label = item.querySelector('.label');

    input.addEventListener('change', () => {
        console.log(input)
        input.checked = true;
    })
});

checkBtn.addEventListener('click', (e) => {

    e.preventDefault();

    const min = 1;
    let max = 100;

    const templateHint = document.querySelector('#hint-temp').content;
    const hint = templateHint.cloneNode(true);
    const hintText = hint.querySelector('.hint_span');
    const hasHint = document.querySelector('.hint');

    const templateError = document.querySelector('#error-temp').content;
    const errorContainer = templateError.cloneNode(true);
    const errorText = errorContainer.querySelector('.error');
    const hasError = document.querySelector('.error');
    userNumber = inputNumber.value;

    console.log(validateInputValue(userNumber, max, min));
    errorText.textContent = validateInputValue(userNumber, max, min);

    if(!hasError) {  
        enter.append(errorContainer);
    } else {
        hasError.textContent = validateInputValue(userNumber, max, min);
    }

    helpText.classList.remove('hidden');


    if (computerNumber % 2 === 0) {
        hintText.textContent = "четное"
    }

    if (userNumber > computerNumber) {
        help.textContent = `меньше  ${userNumber}`;
        countAttemt++;
        attempt.textContent = countAttemt;
    } else if (userNumber < computerNumber) {
        help.textContent = `больше  ${userNumber}`;
        countAttemt++;
        attempt.textContent = countAttemt;
    } else {
        helpText.textContent = `Ура! Вы угадали число!`;
        countAttemt++;
        attempt.textContent = countAttemt;
    }


    if (countAttemt >= 3 && !hasHint) {
        container.append(hint);
    }
});

