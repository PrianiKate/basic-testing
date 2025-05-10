// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
    jest.clearAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Write your test here
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation();
    mockOne();
    mockTwo();
    mockThree();
    expect(logSpy).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation();
    unmockedFunction();
    expect(logSpy).toBeCalled();
  });
});
