// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    const axiosSpy = jest.spyOn(axios, 'create').mockImplementation();
    throttledGetDataFromApi('/test')?.catch(() => {
      expect(axiosSpy).toHaveBeenCalled();
      expect(axiosSpy).toHaveBeenCalledTimes(1);
      expect(axiosSpy).toHaveBeenCalledWith({
        baseURL: 'https://jsonplaceholder.typicode.com',
      });
      axiosSpy.mockClear();
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
