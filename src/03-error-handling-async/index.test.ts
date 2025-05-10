// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    // Write your test here
    const value = 5;
    resolveValue(value).then((val) => expect(val).toEqual(value));
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    const message = 'Test';
    try {
      throwError(message);
    } catch (err) {
      expect(err).toEqual(new Error(message));
    }
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    try {
      throwError();
    } catch (err) {
      expect(err).toEqual(new Error('Oops!'));
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    try {
      throwCustomError();
    } catch (err) {
      expect(err).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    rejectCustomError().catch((err) =>
      expect(err).toBeInstanceOf(MyAwesomeError),
    );
  });
});
