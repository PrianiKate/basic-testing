// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Add,
      }),
    ).toEqual(5);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 3,
        b: 2,
        action: Action.Subtract,
      }),
    ).toEqual(1);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Multiply,
      }),
    ).toEqual(6);
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 6,
        b: 2,
        action: Action.Divide,
      }),
    ).toEqual(3);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Exponentiate,
      }),
    ).toEqual(8);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: null,
      }),
    ).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 'test',
        b: 3,
        action: Action.Add,
      }),
    ).toEqual(null);
  });
});
