/**
 * Julian Day calculations for astronomical precision
 * Based on Jean Meeus "Astronomical Algorithms" (1998)
 */

/**
 * Converts a Gregorian date to Julian Day Number
 * @param date - The date to convert
 * @returns Julian Day Number (JD)
 */
export function dateToJulianDay(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JS months are 0-indexed
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  
  // Convert time to decimal day
  const decimalDay = day + (hour + minute / 60 + second / 3600) / 24;
  
  // Adjust for January and February
  let y = year;
  let m = month;
  if (month <= 2) {
    y = year - 1;
    m = month + 12;
  }
  
  // Gregorian calendar correction
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  
  const jd = Math.floor(365.25 * (y + 4716)) +
             Math.floor(30.6001 * (m + 1)) +
             decimalDay + b - 1524.5;
  
  return jd;
}

/**
 * Converts a Julian Day Number to a Gregorian date
 * @param jd - Julian Day Number
 * @returns Date object
 */
export function julianDayToDate(jd: number): Date {
  const z = Math.floor(jd + 0.5);
  const f = (jd + 0.5) - z;
  
  let a = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  
  const day = b - d - Math.floor(30.6001 * e) + f;
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;
  
  const dayInt = Math.floor(day);
  const timeFraction = day - dayInt;
  const hours = timeFraction * 24;
  const hoursInt = Math.floor(hours);
  const minutes = (hours - hoursInt) * 60;
  const minutesInt = Math.floor(minutes);
  const seconds = Math.floor((minutes - minutesInt) * 60);
  
  return new Date(year, month - 1, dayInt, hoursInt, minutesInt, seconds);
}

/**
 * Gets the current Julian Day
 */
export function getCurrentJulianDay(): number {
  return dateToJulianDay(new Date());
}
