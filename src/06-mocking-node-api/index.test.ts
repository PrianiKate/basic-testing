// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const fn = jest.fn();
    doStuffByTimeout(fn, 1000);
    expect(fn).not.toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const fn = jest.fn();
    doStuffByTimeout(fn, 1000);
    jest.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const fn = jest.fn();
    doStuffByInterval(fn, 1000);
    expect(fn).not.toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const fn = jest.fn();
    doStuffByInterval(fn, 1000);

    jest.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const joinSpy = jest.spyOn(path, 'join').mockImplementation();
    readFileAsynchronously('./test.txt').then(() => {
      expect(joinSpy).toHaveBeenCalled();
    });
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    readFileAsynchronously('./test.txt').then((val) =>
      expect(val).toEqual(null),
    );
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const filePath = './some-file.txt';
    const fileContent = fs.readFileSync(path.join(__dirname, filePath), {
      encoding: 'utf8',
    });
    readFileAsynchronously(filePath).then((val) =>
      expect(val).toEqual(fileContent),
    );
  });
});
