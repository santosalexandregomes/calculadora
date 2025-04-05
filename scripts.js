$(document).ready(function() {
    let currentInput = '';
    let currentCalculation = '';
    let lastResult = '';
    let waitingForOperand = false;
    
    function updateDisplay() {
        $('.calculation').text(currentCalculation || '0');
        $('.result').text(currentInput || '0');
    }
    
    function clearCalculator() {
        currentInput = '';
        currentCalculation = '';
        lastResult = '';
        waitingForOperand = false;
        updateDisplay();
    }
    
    $('.number').click(function() {
        const digit = $(this).text();
        
        if (waitingForOperand) {
            currentInput = digit;
            waitingForOperand = false;
        } else {
            if (digit === '.' && currentInput.includes('.')) return;
            
            if (currentInput === '0' && digit !== '.') {
                currentInput = digit;
            } else {
                currentInput += digit;
            }
        }
        
        updateDisplay();
    });
    
    $('.operator').click(function() {
        const operator = $(this).text();
        
        if (operator === '=') {
            if (currentCalculation && currentInput) {
                try {
                    let calculation = currentCalculation.replace('×', '*').replace('÷', '/');
                    calculation += currentInput;
                    
                    lastResult = eval(calculation).toString();
                    currentCalculation = currentCalculation + currentInput + '=';
                    currentInput = lastResult;
                    waitingForOperand = true;
                } catch (e) {
                    currentInput = 'Error';
                }
            }
        } else {
            if (currentInput) {
                if (waitingForOperand) {
                    currentCalculation = currentCalculation.slice(0, -1) + operator;
                } else {
                    currentCalculation += currentInput + operator;
                    waitingForOperand = true;
                }
            } else if (currentCalculation) {
                currentCalculation = currentCalculation.slice(0, -1) + operator;
            }
        }
        
        updateDisplay();
    });
    
    $('#clear').click(function() {
        clearCalculator();
    });
    
    $('#plusMinus').click(function() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay();
        }
    });
    
    $('#percent').click(function() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        }
    });
    
    updateDisplay();
});
