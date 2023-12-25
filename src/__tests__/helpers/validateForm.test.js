import {
  validateName,
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  validateSurname,
} from '@/components/helpers/validators/validateForm';

describe('validateForm', () => {
  it('validates name correctly', () => {
    expect(validateName('')).toBe(true);
    expect(validateName(' ')).toBe(true);
    expect(validateName('John')).toBe(false);
  });

  it('validates surname correctly', () => {
    expect(validateSurname('')).toBe(true);
    expect(validateSurname(' ')).toBe(true);
    expect(validateSurname('Doe')).toBe(false);
  });

  it('validates email correctly', () => {
    expect(validateEmail('')).toBe(true);
    expect(validateEmail('john')).toBe(true);
    expect(validateEmail('john@doe.com')).toBe(false);
  });

  it('validates password correctly', () => {
    expect(validatePassword('1234567')).toBe(true);
    expect(validatePassword('12345678')).toBe(false);
  });

  it('validates repeat password correctly', () => {
    expect(validateRepeatPassword('12345678', '12345679')).toBe(true);
    expect(validateRepeatPassword('12345678', '12345678')).toBe(false);
    expect(validateRepeatPassword('1234567', '1234567')).toBe(true);
  });
});
