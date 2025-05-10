// Uncomment the code below and write your tests
import axios, { AxiosStatic } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: (f: () => void) => f,
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    // Write your test here
    const axiosSpy = {
      get: jest.fn().mockResolvedValue({ data: '' }),
    };
    mockedAxios.create.mockReturnValue(axiosSpy as unknown as AxiosStatic);
    await throttledGetDataFromApi('/test');
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const axiosSpy = {
      get: jest.fn().mockResolvedValue({ data: '' }),
    };
    mockedAxios.create.mockReturnValue(axiosSpy as unknown as AxiosStatic);
    await throttledGetDataFromApi('/test');
    expect(axiosSpy.get).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    // Write your test here
    const axiosSpy = {
      get: jest.fn().mockResolvedValue({ data: 'test' }),
    };
    mockedAxios.create.mockReturnValue(axiosSpy as unknown as AxiosStatic);
    const res = await throttledGetDataFromApi('/test');
    expect(res).toEqual('test');
  });
});
