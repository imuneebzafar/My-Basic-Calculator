// JavaScript for Calculator Functionality
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = null;
let firstOperand = '';
let secondOperand = '';

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'AC') {
            // Clear everything
            currentInput = '';
            operator = null;
            firstOperand = '';
            secondOperand = '';
            display.textContent = '0';
        } else if (value === 'DEL') {
            // Delete the last character
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        } else if (value === '=') {
            // Perform calculation
            if (operator && firstOperand && currentInput) {
                secondOperand = currentInput;
                const result = calculate(firstOperand, secondOperand, operator);
                display.textContent = result;
                currentInput = result.toString();
                operator = null;
                firstOperand = '';
                secondOperand = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            // Handle operators
            if (currentInput) {
                if (firstOperand && operator) {
                    // If there's already an operator, perform the previous calculation first
                    secondOperand = currentInput;
                    const result = calculate(firstOperand, secondOperand, operator);
                    firstOperand = result.toString();
                } else {
                    firstOperand = currentInput;
                }
                operator = value;
                currentInput = '';
                display.textContent = firstOperand + ' ' + operator; // Show operator with first operand
            }
        } else {
            // Handle numbers and decimal
            if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
            currentInput += value;
            display.textContent = firstOperand + (operator ? ' ' + operator + ' ' : '') + currentInput; // Maintain complete expression display
        }
    });
});

// Calculation Logic
function calculate(first, second, operator) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);
    if (isNaN(num1)) return second;
    if (isNaN(num2)) return first;

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 === 0 ? 'Error' : num1 / num2; // Handle division by zero
        default:
            return 'Error';
    }
}
