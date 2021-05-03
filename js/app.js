/* Selectores */
const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.calculator__result');
const operators = document.querySelectorAll('.operators');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');


/* Eventos */
equal.addEventListener('click', () => {
    operate();
    operatorSign = '';
});
clear.addEventListener('click', clearCalculator);


/* Eventos y funciones */
/* Almacena el primer valor introducido */
let firstNumber = '';
let operatorClick = false;
/* Añade un evento a cada numero y ejecuta una funcion */
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if(totalCalculated == false) {
            /* Si aun no se ha dado click en ningun operador */
            if (operatorSign == '') {
                /* El input que muestra el resultado ira concatenando los numeros introducidos */
                result.value += number.value;
                /* La variable firstNumber guarda ese numero hasta que se da click en un operador */
                firstNumber = result.value;
            } else {
                if (operatorClick == true) {
                    result.value = '';
                    operatorClick = false;
                }
                result.value += number.value;
            }
        } else {
            totalCalculated = false;
            result.value = number.value;
        }

        /* Si el primer numero añadido es 0 */
        if (firstNumber == '0') {
            /* Se limpia la variable que almacena el primer numero */
            firstNumber = '';
        }
        if (result.value == '0') {
            result.value = '';
        }
    })
})

/* Almacena el simbolo del operador */
let operatorSign = '';
/* Añade un evento a cada operador y ejecuta una funcion */
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (operatorSign == '') {
            operatorSign = operator.value;
        } else {
            operate();
            operatorSign = operator.value;
        }
        operatorClick = true;
        totalCalculated = false;
    })
})

let totalCalculated = false;
/* Funciones */
function operate() {
    let total = 0;
    switch (operatorSign) {
        case '+':
            total = Number(firstNumber) + Number(result.value);
            break;
        case '-':
            total = Number(firstNumber) - Number(result.value);
            break;
        case 'x':
            total = Number(firstNumber) * Number(result.value);
            break;
        case '÷':
            total = Number(firstNumber) / Number(result.value);
            break;
    }
    if (total == 0 || isNaN(total) || total == undefined || total == null) {
        result.value = '';
    } else {
        result.value = total;
    }

    firstNumber = total;
    totalCalculated = true;
}

function clearCalculator() {
    result.value = '';
    operators.forEach(operator => {
        operator.selected = false;
    });
    firstNumber = '';
    operatorSign = '';
}