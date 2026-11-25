const display = document.getElementById('display');
let currentInput = '0';
let shouldReset = false;

function updateDisplay() {
  display.textContent = currentInput;
}

// Angka & Operator
document.querySelectorAll('[data-value]').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;

    if (shouldReset) {
      currentInput = '0';
      shouldReset = false;
    }

    if (currentInput === '0' && !isNaN(value)) {
      currentInput = value;
    } else {
      // Cegah operator ganda, misal ++ atau **
      const lastChar = currentInput.slice(-1);
      const operators = ['+', '-', '*', '/', '%'];
      if (operators.includes(lastChar) && operators.includes(value)) {
        currentInput = currentInput.slice(0, -1) + value;
      } else {
        currentInput += value;
      }
    }
    updateDisplay();
  });
});

// Tombol C (Clear)
document.querySelector('[data-action="clear"]').addEventListener('click', () => {
  currentInput = '0';
  updateDisplay();
});

// Tombol Hapus (Backspace)
document.querySelector('[data-action="delete"]').addEventListener('click', () => {
  currentInput = currentInput.slice(0, -1) || '0';
  updateDisplay();
});

// Tombol =
document.querySelector('[data-action="equals"]').addEventListener('click', () => {
  try {
    // Ubah % jadi /100, misal 50% -> 50/100
    let expression = currentInput.replace(/%/g, '/100');
    // Ubah ÷ dan × kalau ada
    expression = expression.replace(/÷/g, '/').replace(/×/g, '*');
    
    let result = eval(expression);
    currentInput = String(result);
    shouldReset = true;
    updateDisplay();
  } catch {
    currentInput = 'Error';
    shouldReset = true;
    updateDisplay();
  }
});

updateDisplay();