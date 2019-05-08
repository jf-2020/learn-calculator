"use strict";

/*******************/
/* Calculator Data */
/*******************/
const input = document.getElementById('input'), // input/output button
    number = document.querySelectorAll('.numbers div'), // number buttons
    operator = document.querySelectorAll('.operators div'), // operator buttons
    result = document.getElementById('result'), // equal button
    clear = document.getElementById('clear'); // clear button

let computation = []; // stack of items in computation

let operatorPrevious = false // boolean to keep track if previous input
							 // was operator

let performedComputation = false // another boolean state tracker

/********************/
/* Helper Functions */
/********************/
// get button data
function getData(node) {
	// given a node, return its text data
	return node.srcElement.innerText;
};

// add data to computation
function addData(data) {
	// n.b. data is a string, assumed to be either a number
	// or operator
	computation.push(data);
	// log it
	console.log("[" + computation + "]");
};

// generate an array given a list of nodes
function getArray(nodeList) {
	// n.b. nodeList is a node list object
	return Array.from(nodeList);
};

// post click event data to input box
function postData(node) {
	// given a node, pass its data to the input box
	input.innerHTML += getData(node);
};

// setup event handlers for each node in a given array of nodes
function handlerSetup(nodes, oper) {
	// n.b. nodes is an array of node objects
	for (let i=0; i<nodes.length; i++) {
		let node = nodes[i];
		node.addEventListener('click', (node) => {
			// handle whether or not performed computation already
			if (performedComputation) {
				// clear out input box
				clearComputation();
				// update state
				performedComputation = false;
			}
			// log it
			console.log(node.srcElement.innerText);
			// handle case where operator posted twice
			if (!oper) {
				// insert data into input display
				postData(node);
				// add it to the computation global
				addData(getData(node));
				// adjust operator boolean
				operatorPrevious = false;
			} else {
				// if haven't seen operator and not first button
				// press, proceed
				console.log(computation);
				if ((!operatorPrevious) && (computation.length > 0)) {
					// all as above logic
					postData(node);
					addData(getData(node));
					operatorPrevious = true;
				}
				// otherwise, just ignore it
			}
		});
	};
};

// clear out the input box & computation
function clearComputation() {
	// first, clear out the computation array
	computation = [];
	// second, clear out the input box
	input.innerHTML = "";
};

// evaluate & return the arithmetic expression
function evaluateExpression() {
	// stringify the computation array
	let expr = computation.join('');
	// log it
	console.log("expr: " + expr);
	// evaluate it
	expr = eval(expr);
	// log it
	console.log("result: " + expr);
	return "" + expr;
}

/*******************************************/
/* adding click handlers to number buttons */
/*******************************************/
// get numbers as array
const numbers = getArray(number);
// setup event listeners for all numbers except clear
handlerSetup(numbers.slice(0, numbers.length - 1));

/**************************************************/
/* adding click handlers to the operation buttons */
/**************************************************/
// get operators as array
const operators = getArray(operator);
// setup event listeners
handlerSetup(operators, true);

/********************************************/
/* adding click handler to the clear button */
/********************************************/
// setup event listener
clear.addEventListener('click', (click) => {
	// log it
	console.log(click.srcElement.innerText);
	// clear out the computation
	clearComputation(computation);
	// log it
	console.log("[" + computation + "]");
});

/******************************/
/* on click of 'equal' button */
/******************************/
// setup event listener
result.addEventListener('click', () => {
	// get the result
	const res = evaluateExpression();
	// clear out the input box
	clearComputation();
	// lastly, post the result to said box
	input.innerHTML = res;
	// update state for having computed result
	performedComputation = true;
});