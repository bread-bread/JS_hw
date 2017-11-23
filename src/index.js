/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
    return arg;
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b) {
    b = b || 100;
    
    return a + b;
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
    let arr = [];

    for (let i = 0; i<arguments.length; i++) {
        arr.push(arguments[i]);
    }
    
    return arr;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
    let func = fn();

    return func;
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number) {
    return function() {
        number = number || 0;
        
        return ++number;
    }
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(fn) {
    var newFunc = fn.bind(null, arguments[1]);

    for (let i = 2; i<arguments.length; i++) {
        newFunc = newFunc.bind(null, arguments[i]);
    }
    
    return newFunc;
    // let newFunc = function() {
        
    //     return fn.apply(null, bArgs);
    // }

    // return newFunc;
}

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
