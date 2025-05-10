// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  const bankAccount = getBankAccount(initialBalance);

  test('should create account with initial balance', () => {
    // Write your test here
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    try {
      bankAccount.withdraw(initialBalance * 2);
    } catch (err) {
      expect(err).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    try {
      const anotherBankAccount = getBankAccount(initialBalance);
      bankAccount.transfer(initialBalance * 2, anotherBankAccount);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    try {
      bankAccount.transfer(initialBalance, bankAccount);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('should deposit money', () => {
    // Write your test here
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.deposit(10);
    expect(bankAccount.getBalance()).toEqual(initialBalance + 10);
  });

  test('should withdraw money', () => {
    // Write your test here
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(10);
    expect(bankAccount.getBalance()).toEqual(initialBalance - 10);
  });

  test('should transfer money', () => {
    // Write your test here
    const bankAccount = getBankAccount(initialBalance);
    const anotherBankAccount = getBankAccount(initialBalance);
    bankAccount.transfer(10, anotherBankAccount);
    expect(bankAccount.getBalance()).toEqual(initialBalance - 10);
    expect(anotherBankAccount.getBalance()).toEqual(initialBalance + 10);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    bankAccount
      .fetchBalance()
      .then((num) => expect(num).toEqual(initialBalance))
      .catch((err) => console.log(err));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const bankAccount = getBankAccount(initialBalance);
    bankAccount
      .synchronizeBalance()
      .then((num) => expect(bankAccount.getBalance()).toEqual(num))
      .catch((err) => console.log(err));
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    bankAccount
      .synchronizeBalance()
      .catch((err) => expect(err).toBeInstanceOf(SynchronizationFailedError));
  });
});
