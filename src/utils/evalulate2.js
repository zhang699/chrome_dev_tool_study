/* evaluate a given expression where tokens are separated  
   by space. 
   Test Cases: 
     "10+2*6"        ---> 22 
     "100*2+12"      ---> 212 
     "100*(2+12)"    ---> 1400 
     "100*(2+12)/14" ---> 100     
*/

const SYMBOL_ADD = "+";
const SYMBOL_SUB = "-";
const SYMBOL_MUL = "*";
const SYMBOL_DIV = "/";
const SYMBOL_BRACKET_OPEN = "(";
const SYMBOL_BRACKET_CLOSE = ")";
// Stack class
class Stack {
  // Array is used to implement stack
  constructor() {
    this.items = [];
  }
  // push function
  push(element) {
    // push element into the items
    this.items.push(element);
  }
  pop() {
    // return top most element in the stack
    // and removes it from the stack
    // Underflow if stack is empty
    if (this.items.length == 0) throw new Error("empty stack cannot pop");
    return this.items.pop();
  }
  peek() {
    // return the top most element from the stack
    // but does'nt delete it.
    return this.items[this.items.length - 1];
  }
  empty() {
    // return true if stack is empty
    return this.items.length == 0;
  }
}

export function evaluate(expression) {
  const tokens = expression.split("");
  // Stack for numbers: 'values'
  const valuesStack = new Stack();
  // Stack for Operators: 'ops'
  const opsStack = new Stack();

  for (let i = 0; i < tokens.length; i++) {
    // Current token is a whitespace, skip it
    if (tokens[i] == " ") continue;

    // Current token is a number, push it to stack for numbers
    if (tokens[i] >= "0" && tokens[i] <= "9") {
      let sbuf = "";
      // There may be more than one digits in number,
      // we setup needRestore for keep index to track next symbol.
      let needRestore = false;
      while (i < tokens.length && tokens[i] >= "0" && tokens[i] <= "9") {
        sbuf += tokens[i++];
        needRestore = true;
      }
      if (needRestore) {
        i = i - 1;
      }

      valuesStack.push(parseInt(sbuf));
    }

    // Current token is an opening brace, push it to 'ops'
    else if (tokens[i] == SYMBOL_BRACKET_OPEN) opsStack.push(tokens[i]);
    // Closing brace encountered, solve entire brace
    else if (tokens[i] == SYMBOL_BRACKET_CLOSE) {
      while (opsStack.peek() != SYMBOL_BRACKET_OPEN)
        valuesStack.push(
          applyOp(opsStack.pop(), valuesStack.pop(), valuesStack.pop())
        );
      opsStack.pop();
    }

    // Current token is an operator.
    else if (
      tokens[i] == SYMBOL_ADD ||
      tokens[i] == SYMBOL_SUB ||
      tokens[i] == SYMBOL_MUL ||
      tokens[i] == SYMBOL_DIV
    ) {
      // While top of 'ops' has same or greater precedence to current
      // token, which is an operator. Apply operator on top of 'ops'
      // to top two elements in values stack
      while (!opsStack.empty() && hasPrecedence(tokens[i], opsStack.peek()))
        valuesStack.push(
          applyOp(opsStack.pop(), valuesStack.pop(), valuesStack.pop())
        );

      // Push current token to 'ops'.
      opsStack.push(tokens[i]);
    }
  }

  // Entire expression has been parsed at this point, apply remaining
  // ops to remaining values
  while (!opsStack.empty())
    valuesStack.push(
      applyOp(opsStack.pop(), valuesStack.pop(), valuesStack.pop())
    );

  // Top of 'values' contains result, return it
  return valuesStack.pop();
}

// Returns true if 'op2' has higher or same precedence as 'op1',
// otherwise returns false.
function hasPrecedence(op1, op2) {
  if (op2 == SYMBOL_BRACKET_OPEN || op2 == SYMBOL_BRACKET_CLOSE) return false;
  if (
    (op1 == SYMBOL_MUL || op1 == SYMBOL_DIV) &&
    (op2 == SYMBOL_ADD || op2 == SYMBOL_SUB)
  )
    return false;
  else return true;
}

// A utility method to apply an operator 'op' on operands 'a'
// and 'b'. Return the result.
function applyOp(op, b, a) {
  switch (op) {
    case SYMBOL_ADD:
      return a + b;
    case SYMBOL_SUB:
      return a - b;
    case SYMBOL_MUL:
      return a * b;
    case SYMBOL_DIV:
      if (b == 0) throw new Error("Cannot divide by zero");
      return a / b;
  }
  return 0;
}
