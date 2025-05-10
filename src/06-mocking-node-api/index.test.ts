// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const fn = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(fn, 1000);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const fn = jest.fn();
    doStuffByTimeout(fn, 1000);
    expect(fn).not.toHaveBeenCalled();
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
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const fn = jest.fn();
    doStuffByInterval(fn, 1000);
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    setIntervalSpy.mockRestore();
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
      expect(joinSpy).toHaveBeenCalledWith(__dirname, './test.txt');
    });
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    readFileAsynchronously('./test.txt').then((val) =>
      expect(val).toEqual(null),
    );
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const filePath = './some-file.txt';
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue('File content');
    readFileAsynchronously(filePath).then((val) =>
      expect(val).toEqual('File content'),
    );
  });
});
