const display = document.querySelector('#calculator-value');
const expressionDisplay = document.querySelector('#calculator-expression');
const status = document.querySelector('#calculator-status');
const keys = document.querySelector('.calculator-keys');
const modeButton = document.querySelector('[data-action="angle-mode"]');
const state = { expression: '', preview: '', answer: 0, angleMode: 'DEG' };
const numberPattern = /^(?:\d+\.?\d*|\.\d+)$/;

const tokenize = (expression) => {
  const tokens = [];
  let remaining = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  while (remaining.length) {
    remaining = remaining.trimStart();
    const match = remaining.match(/^(\d+\.?\d*|\.\d+|[a-z]+|[+*/^()!%-])/i);
    if (!match) throw new SyntaxError('Check the expression and try again.');
    tokens.push(match[0].toLowerCase());
    remaining = remaining.slice(match[0].length);
  }
  return tokens;
};

const parse = (tokens) => {
  let position = 0;
  const peek = () => tokens[position];
  const take = (value) => {
    if (peek() !== value) return false;
    position += 1;
    return true;
  };
  const expect = (value) => {
    if (!take(value)) throw new SyntaxError(`Expected ${value}.`);
  };

  const expression = () => {
    let value = term();
    while (peek() === '+' || peek() === '-') {
      const operator = tokens[position++];
      const next = term();
      value = operator === '+' ? value + next : value - next;
    }
    return value;
  };

  const startsValue = () => {
    const token = peek();
    return token !== undefined && (numberPattern.test(token) || /^[a-z]+$/i.test(token) || token === '(');
  };

  const term = () => {
    let value = unary();
    while (true) {
      if (take('*')) value *= unary();
      else if (take('/')) {
        const divisor = unary();
        if (divisor === 0) throw new RangeError('You cannot divide by zero.');
        value /= divisor;
      } else if (startsValue()) value *= unary();
      else return value;
    }
  };

  const unary = () => {
    if (take('+')) return unary();
    if (take('-')) return -unary();
    return power();
  };

  const power = () => {
    const base = postfix();
    if (take('^')) return base ** unary();
    return base;
  };

  const postfix = () => {
    let value = primary();
    while (peek() === '!' || peek() === '%') {
      const operator = tokens[position++];
      if (operator === '%') value /= 100;
      else {
        if (value < 0 || !Number.isInteger(value) || value > 170) throw new RangeError('Factorial needs a whole number from 0 to 170.');
        let product = 1;
        for (let factor = 2; factor <= value; factor += 1) product *= factor;
        value = product;
      }
    }
    return value;
  };

  const primary = () => {
    const token = tokens[position++];
    if (token === undefined) throw new SyntaxError('Complete the expression first.');
    if (numberPattern.test(token)) return Number(token);
    if (token === '(') {
      const value = expression();
      expect(')');
      return value;
    }
    if (token === 'pi') return Math.PI;
    if (token === 'e') return Math.E;
    if (token === 'ans') return state.answer;

    const functions = {
      sin: (value) => Math.sin(toRadians(value)),
      cos: (value) => Math.cos(toRadians(value)),
      tan: (value) => Math.tan(toRadians(value)),
      asin: (value) => fromRadians(Math.asin(value)),
      acos: (value) => fromRadians(Math.acos(value)),
      atan: (value) => fromRadians(Math.atan(value)),
      sqrt: (value) => Math.sqrt(value),
      ln: (value) => Math.log(value),
      log: (value) => Math.log10(value),
      abs: (value) => Math.abs(value),
      exp: (value) => Math.exp(value),
    };
    if (!functions[token]) throw new SyntaxError(`Unknown function: ${token}.`);
    expect('(');
    const result = functions[token](expression());
    expect(')');
    return result;
  };

  const result = expression();
  if (position !== tokens.length) throw new SyntaxError('Check the expression and try again.');
  if (!Number.isFinite(result)) throw new RangeError('That result is outside the calculator range.');
  return result;
};

const toRadians = (value) => state.angleMode === 'DEG' ? value * Math.PI / 180 : value;
const fromRadians = (value) => state.angleMode === 'DEG' ? value * 180 / Math.PI : value;

const formatNumber = (number) => {
  const rounded = Number(number.toPrecision(12));
  return Object.is(rounded, -0) ? '0' : String(rounded);
};

const render = () => {
  display.textContent = state.preview ? formatNumber(state.answer) : state.expression || '0';
  expressionDisplay.textContent = state.preview || state.expression;
  modeButton.textContent = state.angleMode;
};

const insert = (value) => {
  if (state.preview && !/^(?:[+\-*/^%!×÷]|\^\d+|\))$/.test(value)) state.expression = '';
  state.expression += value;
  state.preview = '';
  status.textContent = '';
  render();
};

const toggleSign = () => {
  const expression = state.expression;
  const negativeGroup = expression.match(/-\((-?(?:\d+\.?\d*|\.\d+|pi|e|ans))\)$/i);
  if (negativeGroup) {
    state.expression = expression.slice(0, -negativeGroup[0].length) + negativeGroup[1];
    state.preview = '';
    status.textContent = '';
    render();
    return;
  }
  const finalNumber = expression.match(/(?:\d+\.?\d*|\.\d+|pi|e|ans)$/i);
  if (finalNumber) {
    const start = expression.length - finalNumber[0].length;
    const beforeNumber = expression.slice(0, start);
    const signed = beforeNumber.endsWith('-') && /[+*/^(]$/.test(beforeNumber.slice(0, -1))
      ? beforeNumber.slice(0, -1) + finalNumber[0]
      : `${beforeNumber}-(${finalNumber[0]})`;
    state.expression = signed;
  } else if (!expression || /[+\-*/^(]$/.test(expression)) {
    state.expression += '-';
  } else {
    state.expression = `-(${expression})`;
  }
  state.preview = '';
  status.textContent = '';
  render();
};

const evaluate = () => {
  if (!state.expression.trim()) return;
  try {
    const result = parse(tokenize(state.expression));
    state.answer = result;
    state.preview = `${state.expression} =`;
    status.textContent = '';
  } catch (error) {
    state.preview = '';
    status.textContent = error.message;
  }
  render();
};

const deleteLast = () => {
  state.expression = state.expression.slice(0, -1);
  state.preview = '';
  status.textContent = '';
  render();
};

keys.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.dataset.insert !== undefined) insert(button.dataset.insert);
  else if (button.dataset.action === 'equals') evaluate();
  else if (button.dataset.action === 'delete') deleteLast();
  else if (button.dataset.action === 'clear') {
    state.expression = '';
    state.preview = '';
    status.textContent = '';
    render();
  } else if (button.dataset.action === 'angle-mode') {
    state.angleMode = state.angleMode === 'DEG' ? 'RAD' : 'DEG';
    status.textContent = '';
    render();
  } else if (button.dataset.action === 'answer') insert('ans');
  else if (button.dataset.action === 'sign') toggleSign();
});

document.addEventListener('keydown', (event) => {
  if (event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
  if (/^\d$/.test(event.key) || ['.', '+', '-', '*', '/', '^', '(', ')', '%', '!'].includes(event.key)) insert(event.key);
  else if (event.key === 'Enter' || event.key === '=') {
    if (event.target instanceof HTMLButtonElement) return;
    evaluate();
  } else if (event.key === 'Backspace') deleteLast();
  else if (event.key === 'Escape') {
    state.expression = '';
    state.preview = '';
    status.textContent = '';
    render();
  } else return;
  event.preventDefault();
});

render();