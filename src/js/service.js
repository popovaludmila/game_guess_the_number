const getRandomInteger = (range) => {
    const number = 1 + Math.floor((Math.random().toFixed(3)) * range);
    return number;
};

const validateInputValue = (value, max, min) => {

    let errorMessage;
    const punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
    const strRE = /[a-zA-Z]+/g;

    if (value === '') {
       return errorMessage = "Поле для ввода не должно быть пустым";
       
    }
    if (value > max) {
        return errorMessage = `Число должно быть меньше или равно ${max}`;
    }
    if (value < min) {
        return errorMessage = `Число должно быть больше или равно ${min}`;
    }
    if (punctRE.test(value)) {
        return errorMessage = `Введите целое число`;
    }
    if (strRE.test(value)) {
        return errorMessage = `Введите число, а не текст пожалуйста`;
    }
}

const saveNumberToStorage = (number) => {
    return localStorage.setItem('number', number);
};

const deleteNumberOfStorage = (key) => {
    return localStorage.removeItem(key);
};
export { getRandomInteger, saveNumberToStorage, deleteNumberOfStorage, validateInputValue };