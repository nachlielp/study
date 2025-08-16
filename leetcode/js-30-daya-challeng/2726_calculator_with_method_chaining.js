class Calculator {
  /**
   * @param {number} value
   */
  constructor(value) {
    this.result = value;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  add(value) {
    this.result += value;
    return this;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  subtract(value) {
    this.result -= value;
    return this;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  multiply(value) {
    this.result *= value;
    return this;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  divide(value) {
    if (value !== 0) this.result /= value;
    else this.result = "Division by zero is not allowed";
    return this;
  }

  /**
   * @param {number} value
   * @return {Calculator}
   */
  power(value) {
    this.result **= value;
    return this;
  }

  /**
   * @return {number}
   */
  getResult() {
    return this.result;
  }

  valueOf() {
    return this.result;
  }
}
const calc = new Calculator(7)
  .add(5)
  .subtract(2)
  .multiply(3)
  .divide(2)
  .getResult();
console.log(calc);
