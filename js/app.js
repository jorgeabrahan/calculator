/* ------------SELECTORES------------ */
/* Obtiene todos los numeros */
const numbers = document.querySelectorAll('.numbers');
/* Obtiene todos los operadores */
const operators = document.querySelectorAll('.operators');
/* Obtiene el operador de igual */
const equal = document.querySelector('.equal');
/* Obtiene el operador para limpiar la calculadora */
const clear = document.querySelector('.clear');
/* Obtiene el input que mostrara el resultado */
const result = document.querySelector('.calculator__result');
/* Obtiene el input que muestra la operacion que se esta realizando */
const operation = document.querySelector('.calculator__operation');

/* ------------EVENTOS------------ */
/* Evento de click al boton de igual */
equal.addEventListener('click', () => {
    /* Ejecuta la funcion para calcular el resultado */
    operate();
    /* La variable que almacena el signo operador se limpia */
    operatorSign = '';
});
/* Evento de click al boton de limpiar */
clear.addEventListener('click', clearCalculator);


/* ------------EVENTOS Y FUNCIONES------------ */
/* Almacena el primer numero introducido */
let firstNumber = '';
/* Se declara un booleano para saber cuando se realiza operaciones sin usar el igual (solo concatenando operadores) y se le da un valor de falso */
let operatorClick = false;
/* Añade un evento a cada numero y ejecuta una funcion */
numbers.forEach(number => {
    number.addEventListener('click', () => {
        /* Si aun no se ha realizado alguna operacion */
        if(totalCalculated == false) {
            /* Si aun no se ha dado click en ningun operador */
            if (operatorSign == '') {
                /* El input que muestra el resultado ira concatenando los numeros introducidos */
                result.value += number.value;
                /* La variable firstNumber guarda ese numero hasta que se da click en un operador */
                firstNumber = result.value;
            }
            /* Si ya se dio click en un operador */
            else {
                /* En caso de que se haya realizado la operacion por la concatenacion de operadores */
                if (operatorClick == true) {
                    /* Se limpia el input que muestra el resultado para mostrar el nuevo */
                    result.value = '';
                    /* Se vuelve a establecer como falso la operacion realizada por la concatenacion de operadores porque ya se mostro el resultado */
                    operatorClick = false;
                }
                /* Se concatenan los numero introducidos en el input que muestra el resultado */
                result.value += number.value;
            }
        }
        /* Si ya se realizaron operaciones */
        else {
            /* Se vuelve a establecer en falso el booleano que indica si ya se calculo el total o no */
            totalCalculated = false;
            /* Se muestra el numero introducido en el input que muestra el resultado */
            result.value = number.value;
        }

        /* Si el primer numero añadido es 0 */
        if (firstNumber == '0') {
            /* Se limpia la variable que almacena el primer numero */
            firstNumber = '';
        }
        /* Si el input que muestra el resultado tiene un valor de 0 */
        if (result.value == '0') {
            /* Se limpia */
            result.value = '';
        }
    })
})

/* Almacena el simbolo del operador */
let operatorSign = '';
/* Añade un evento a cada operador y ejecuta una funcion */
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        /* Si no se ha dado click en ningun simbolo de operacion */
        if (operatorSign == '') {
            /* Se almacena el simbolo en la variable operatorSign */
            operatorSign = operator.value;
            console.log(firstNumber)
            operation.value = `${firstNumber} ${operatorSign}`;
        } else {
            /* Si no, se realiza la operacion */
            operate();
            /* Y se almacena el nuevo simbolo introducido en la variable de operatorSign */
            operatorSign = operator.value;
            if(isNaN(firstNumber)) operation.value = '';
            else operation.value = `${firstNumber} ${operatorSign}`;
        }
        /* Se establece el booleano que indica si la operacion se realizo por medio del operador */
        operatorClick = true;
        /* La variable que indica si ya esta realizado el calculo se establece en falso */
        totalCalculated = false;
    })
})

/* Se declara una variable para saber cuando se ha realizado una operacion y se le da un valor de falso por defecto */
let totalCalculated = false;
/* Funciones */
function operate() {
    operation.value += ` ${result.value} =`;
    /* Se declara una variable para almacenar el total */
    let total = 0;
    /* Se evaluan casos para el simbolo de operacion */
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
    /* Si el total es 0, no es un numero, no esta definido o es nulo */
    if (total == 0 || isNaN(total) || total == undefined || total == null) {
        /* Se limpia el input que muestra el resultado*/
        result.value = '';
    } else {
        /* Se muestra el total en el input */
        result.value = total;
    }
    /* La variable que almacenaba el primer numero introducido, ahora almacena el total */
    firstNumber = total;
    /* Se establece como true la variable que establece un valor booleano para cuando se calculo el resultado o no */
    totalCalculated = true;
}

/* funcion para limpiar la calculadora */
function clearCalculator() {
    /* El input que muestra el resultado se limpia */
    result.value = '';
    /* se des selecciona cada operador */
    operators.forEach(operator => {
        operator.selected = false;
    });
    /* La variable con el primer numero introducido se limpia */
    firstNumber = '';
    /* La variable con el simbolo de operacion se limpia */
    operatorSign = '';
    /* Se limpia el input que muestra la operacion realizada */
    operation.value = '';
}

