/**
 * Custom errors for lunar calculations
 */

export class LunarCalculationError extends Error {
  readonly date?: Date;
  readonly errorCause?: unknown;
  
  constructor(message: string, date?: Date, cause?: unknown) {
    super(message);
    this.name = 'LunarCalculationError';
    this.date = date;
    this.errorCause = cause;
  }
}

export class DateValidationError extends LunarCalculationError {
  constructor(message: string, date: Date) {
    super(message, date);
    this.name = 'DateValidationError';
  }
}

export class CacheError extends Error {
  readonly errorCause?: unknown;
  
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'CacheError';
    this.errorCause = cause;
  }
}
