/**
 * Date validation utilities for lunar calculations
 */

import { DateValidationError } from './errors';

const MIN_SUPPORTED_YEAR = 1900;
const MAX_SUPPORTED_YEAR = 2100;

/**
 * Validates that a date is valid and within supported range
 * @throws {DateValidationError} If date is invalid or out of range
 */
export function validateDate(date: Date): void {
  if (!(date instanceof Date)) {
    throw new DateValidationError('Value is not a Date object', date);
  }
  
  if (isNaN(date.getTime())) {
    throw new DateValidationError('Date is invalid (NaN timestamp)', date);
  }
  
  const year = date.getFullYear();
  if (year < MIN_SUPPORTED_YEAR || year > MAX_SUPPORTED_YEAR) {
    throw new DateValidationError(
      `Year ${year} is out of supported range (${MIN_SUPPORTED_YEAR}-${MAX_SUPPORTED_YEAR})`,
      date
    );
  }
}

/**
 * Validates a year value
 */
export function validateYear(year: number): void {
  if (!Number.isInteger(year)) {
    throw new DateValidationError(`Year must be an integer, got ${year}`, new Date(year, 0, 1));
  }
  
  if (year < MIN_SUPPORTED_YEAR || year > MAX_SUPPORTED_YEAR) {
    throw new DateValidationError(
      `Year ${year} is out of supported range (${MIN_SUPPORTED_YEAR}-${MAX_SUPPORTED_YEAR})`,
      new Date(year, 0, 1)
    );
  }
}

/**
 * Validates a month value (1-12)
 */
export function validateMonth(month: number): void {
  if (!Number.isInteger(month)) {
    throw new DateValidationError(`Month must be an integer, got ${month}`, new Date(2000, month - 1, 1));
  }
  
  if (month < 1 || month > 12) {
    throw new DateValidationError(`Month must be between 1 and 12, got ${month}`, new Date(2000, month - 1, 1));
  }
}

/**
 * Safe date creation with validation
 */
export function createValidDate(year: number, month: number, day: number): Date {
  validateYear(year);
  validateMonth(month);
  
  const date = new Date(year, month - 1, day, 12, 0, 0);
  validateDate(date);
  
  return date;
}
