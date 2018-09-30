// function output(txt) {
// 	console.log(txt);
// }

// function printIf(predicate) {
// 	return function(msg) {
// 		if (predicate(msg)) {
// 			output(msg);
// 		}
// 	};
// }

// function isShortEnough(str) {
// 	return str.length <= 5;
// }

// function isLongEnough(str) {
// 	return !isShortEnough(str);
// }

// var msg1 = "Hello";
// var msg2 = msg1 + " World";

// printIf(isShortEnough)(msg1);		// Hello
// printIf(isShortEnough)(msg2);
// printIf(isLongEnough)(msg1);
// printIf(isLongEnough)(msg2);		// Hello World

/* 
    Point free version
*/

var msg1 = "Hello";
var msg2 = msg1 + " World";

const isShortEnough = str => str.length <= 5;
const not = fn => (...arg) => !fn(...arg);
const when = fn => checkFn => (...arg) => checkFn(...arg) && fn(...arg);
const output = console.log.bind(console);
const printIf = when(output);
const isLongEnough = not(isShortEnough);

printIf(isShortEnough)(msg1); // Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2); // Hello World
