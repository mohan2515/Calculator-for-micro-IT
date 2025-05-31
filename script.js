(function() {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.button');
  let expression = '';
  let lastWasOperator = false;

  function updateDisplay(value) {
    display.textContent = value;
  }

  function clearDisplay() {
    expression = '';
    updateDisplay('0');
    display.classList.remove('green-success', 'red-success', 'orange-success', 'yellow-success');
    lastWasOperator = false;
  }

  function endsWithOperator(expr) {
    return /[+\-*/.]$/.test(expr);
  }

  function isValidExpression(expr) {
    return expr.length > 0 && !endsWithOperator(expr);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value');
      if (button.id === 'clear') {
        clearDisplay();
        return;
      }
      if (button.id === 'equals') {
        if (!isValidExpression(expression)) {
          return;
        }
        try {
          let calcResult = eval(expression);
          if (typeof calcResult === 'number' && !isNaN(calcResult)) {
            const ops = ['+', '-', '*', '/'];
            let lastOpIndex = -1;
            let lastOp = null;
            ops.forEach(op => {
              const idx = expression.lastIndexOf(op);
              if (idx > lastOpIndex) {
                lastOpIndex = idx;
                lastOp = op;
              }
            });

            display.classList.remove('green-success', 'red-success', 'orange-success', 'yellow-success');

            if (lastOp === '+') {
              display.classList.add('green-success');
            } else if (lastOp === '-') {
              display.classList.add('red-success');
            } else if (lastOp === '*') {
              display.classList.add('orange-success');
            } else if (lastOp === '/') {
              display.classList.add('yellow-success');
            }

            expression = String(calcResult);
            updateDisplay(expression);
            lastWasOperator = false;
          }
        } catch (e) {
          updateDisplay('Error');
          expression = '';
          lastWasOperator = false;
          display.classList.remove('green-success', 'red-success', 'orange-success', 'yellow-success');
        }
        return;
      }
      if (/[+\-*/]/.test(value)) {
        if (expression === '') {
          if (value === '-') {
            expression += value;
            updateDisplay(expression);
            lastWasOperator = true;
          }
          return;
        }
        if (lastWasOperator) {
          expression = expression.slice(0, -1) + value;
        } else {
          expression += value;
        }
        lastWasOperator = true;
        display.classList.remove('green-success', 'red-success', 'orange-success', 'yellow-success');
        updateDisplay(expression);
        return;
      }
      if (value === '.') {
        const parts = expression.split(/[+\-*/]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
          return;
        }
      }
      expression += value;
      lastWasOperator = false;
      display.classList.remove('green-success', 'red-success', 'orange-success', 'yellow-success');
      updateDisplay(expression);
    });
  });

  clearDisplay();
})();
