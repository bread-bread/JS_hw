// import { assert } from 'chai';
// import { randomValue as random, randomStringArray } from '../helper';
// import {
//     bindFunction,
//     defaultParameterValue,
//     returnArgumentsArray,
//     returnCounter,
//     returnFirstArgument,
//     returnFnResult
// } from '../src/index';

// describe('ДЗ 1 - функции', () => {
//     describe('returnFirstArgument', () => {
//         it('должна возвращать переданный аргумент', () => {
//             let value = random();
//             let result = returnFirstArgument(value);

//             assert.strictEqual(result, value);
//         });
//     });

//     describe('defaultParameterValue', () => {
//         it('должна возвращать сумму переданных аргументов', () => {
//             let valueA = random('number');
//             let valueB = random('number');
//             let result = defaultParameterValue(valueA, valueB);

//             assert.strictEqual(result, valueA + valueB);
//         });

//         it('значение по умолчанию второго аргумента должно быть 100', () => {
//             let value = random('number');
//             let result = defaultParameterValue(value);

//             assert.strictEqual(result, value + 100);
//         });
//     });

//     describe('returnArgumentsArray', () => {
//         it('должна возвращать переданные аргументы в виде массива', () => {
//             let result;
//             let value;

//             value = random('array', 1);
//             result = returnArgumentsArray(...value);
//             assert.deepEqual(result, value);
//         });

//         it('должна возвращать пустой массив если нет аргументов', () => {
//             let result = returnArgumentsArray();

//             assert.deepEqual(result, []);
//         });
//     });

//     describe('returnFnResult', () => {
//         it('должна возвращать результат вызова переданной функции', () => {
//             function fn() {
//                 return value;
//             }

//             let value = random();
//             let result = returnFnResult(fn);

//             assert.strictEqual(result, value);
//         });
//     });

//     describe('returnCounter', () => {
//         it('должна возвращать функцию', () => {
//             let result = returnCounter();

//             assert.typeOf(result, 'function');
//         });

//         it('возвращаемая функция должна увеличивать переданное число на единицу при каждом вызове', () => {
//             let value = random('number');
//             let result = returnCounter(value);

//             assert.equal(result(), value + 1);
//             assert.equal(result(), value + 2);
//             assert.equal(result(), value + 3);
//         });

//         it('значение аргумента должно быть 0 по умолчанию', () => {
//             let result = returnCounter();

//             assert.equal(result(), 1);
//             assert.equal(result(), 2);
//             assert.equal(result(), 3);
//         });
//     });

//     describe('bindFunction', () => {
//         let valuesArr = randomStringArray();

//         function fn(...valuesArr) {
//             return [...arguments].join('');
//         }

//         it('должна возвращать функцию', () => {
//             let result = bindFunction(fn);

//             assert.typeOf(result, 'function');
//         });

//         it('должна привязывать любое кол-во аргументов возвращаемой функции', () => {

//             let result = bindFunction(fn, ...valuesArr);

//             assert.equal(result(), valuesArr.join(''));
//         });
//     });
// });

/* ========| || |======== */

import { assert } from 'chai';
import { randomNumberArray, randomStringArray, randomValue as random } from '../helper';
import { calculator, isAllTrue, isSomeTrue, returnBadArguments } from '../src/index';

describe('ДЗ 2 - работа с исключениями и отладчиком', () => {
    describe('isAllTrue', () => {
        it('должна вызывать fn для всех элементов массива', () => {
            let array = random('array', 1);
            let pass = [];

            isAllTrue(array, e => pass.push(e));

            assert.deepEqual(pass, array);
        });

        it('должна вернуть true, если fn вернула true для всех элементов массива', () => {
            let array = randomNumberArray();
            let result = isAllTrue(array, Number.isFinite);

            assert.isTrue(result);
        });

        it('должна вернуть false, если fn вернула false хотя бы для одного элемента массива', () => {
            let array = randomNumberArray();

            array.push(random('string'));
            let result = isAllTrue(array, Number.isFinite);

            assert.isFalse(result);
        });

        it('должна выбросить исключение, если передан пустой массив', () => {
            assert.throws(isAllTrue.bind(null, [], () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если передан не массив', () => {
            assert.throws(isAllTrue.bind(null, ':(', () => {
            }), 'empty array');
            assert.throws(isAllTrue.bind(null, {}), 'empty array');
        });

        it('должна выбросить исключение, если fn не функция', () => {
            let array = randomNumberArray();

            assert.throws(isAllTrue.bind(null, array, ':('), 'fn is not a function');
        });
    });

    describe('isSomeTrue', () => {
        it('должна вернуть true, если fn вернула true хотя бы для одного элемента массива', () => {
            let array = randomStringArray().concat(random('number'));
            let result = isSomeTrue(array, Number.isFinite);

            assert.isTrue(result);
        });

        it('должна вернуть false, если fn не вернула true хотя бы для одного элемента массива', () => {
            let array = randomStringArray();
            let result = isSomeTrue(array, Number.isFinite);

            assert.isFalse(result);
        });

        it('должна выбросить исключение, если передан пустой массив', () => {
            assert.throws(isSomeTrue.bind(null, [], () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если передан не массив', () => {
            assert.throws(isSomeTrue.bind(null, ':(', () => {
            }), 'empty array');
            assert.throws(isSomeTrue.bind(null, {}), 'empty array');
        });

        it('должна выбросить исключение, если fn не функция', () => {
            let array = randomNumberArray();

            assert.throws(isSomeTrue.bind(null, array, ':('), 'fn is not a function');
        });
    });

    describe('returnBadArguments', () => {
        it('должна вызывать fn для всех элементов массива', () => {
            let array = random('array', 1);
            let pass = [];

            returnBadArguments(e => pass.push(e), ...array);

            assert.deepEqual(pass, array);
        });

        it('должна вернуть массив с аргументами, для которых fn выбрасила исключение', () => {
            let evenNumbers = randomNumberArray('even');
            let oddNumbers = randomNumberArray('odd');
            let fn = a => {
                if (a % 2 != 0) {
                    throw new Error('not even');
                }
            };
            let result = returnBadArguments(fn, ...evenNumbers, ...oddNumbers);

            assert.deepEqual(result, oddNumbers);
        });

        it('должна вернуть массив пустой массив, если не передано дополнительных аргументов', () => {
            let fn = () => ':)';
            let result = returnBadArguments(fn);

            assert.deepEqual(result, []);
        });

        it('должна выбросить исключение, если fn не функция', () => {
            assert.throws(returnBadArguments.bind(null, ':('), 'fn is not a function');
        });
    });

    describe('calculator', () => {
        it('должна возвращать объект с методами', () => {
            let calc = calculator();

            assert.includeMembers(Object.keys(calc), ['sum', 'dif', 'div', 'mul']);
        });

        it('метод sum должен складывать аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.sum(...args), args.reduce((prev, current) => prev + current, initialValue));
        });

        it('метод dif должен вычитать аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.dif(...args), args.reduce((prev, current) => prev - current, initialValue));
        });

        it('метод div должен делить аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.div(...args), args.reduce((prev, current) => prev / current, initialValue));
        });

        it('метод div должен выбрасывать исключение, если хотя бы один из аргументов равен 0', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = [...randomNumberArray(), 0];

            assert.throws(calc.div.bind(null, ...args), 'division by 0');
        });

        it('метод mul должен умножать аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.mul(...args), args.reduce((prev, current) => prev * current, initialValue));
        });

        it('функция должна выбрасывать исключение, если number не является числом', () => {
            assert.throws(calculator.bind(null, ':('), 'number is not a number');
        });

        it('значение по умолчанию для аргумента number должно быть равно 0', () => {
            let calc = calculator();
            let args = randomNumberArray();

            assert.strictEqual(calc.sum(...args), args.reduce((prev, current) => prev + current));
        });
    });
});
