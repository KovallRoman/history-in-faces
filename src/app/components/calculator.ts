class Calculator {
  private _result: number;

  get result(): number {
    return this._result;
  }

  set result(value: number) {
    if (value === 0 || !Number.isFinite(value)) {
      this.clear();
      throw 'error';
    }

    this._result = value;
  }

  constructor() {
    this._result = 0;
  }

  public add(x: number): void {
    this._result += x;
  }

  public subtract(x: number): void {
    this._result -= x;
  }

  public multiply(x: number): void {
    this._result *= x;
  }

  public divide(x: number): void {
    if(x === 0) {
      throw 'Division error by zero';
    }
    this._result /= x;
  }

  public clear(): void {
    this._result = 0;
  }
}

const calculator = new Calculator()
calculator.add(9);
console.log(calculator.result);

calculator.subtract(6);
console.log(calculator.result);

calculator.multiply(3);
console.log(calculator.result);

calculator.divide(0);
console.log(calculator.result);

calculator.clear();
console.log(calculator.result);

calculator.result = 10;
