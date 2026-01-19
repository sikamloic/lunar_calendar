/**
 * Moon phase calculations using Meeus algorithm
 * Based on Jean Meeus "Astronomical Algorithms" Chapter 49
 * Provides accuracy of ~2 minutes for new moon calculations
 */

import { dateToJulianDay, julianDayToDate } from './julianDay';
import { LunarCalculationError } from '../errors';

/**
 * Calculates the k value (lunation number) for a given date
 * k = 0 at the first new moon of 2000 (January 6, 2000)
 */
function calculateK(jd: number): number {
  const year = 2000 + (jd - 2451550.09765) / 365.25;
  return (year - 2000) * 12.3685;
}

/**
 * Calculates periodic correction terms for moon phase
 */
function calculatePeriodicCorrections(k: number, T: number): number {
  // Mean anomaly of the Sun
  const M = 2.5534 + 29.10535670 * k - 0.0000014 * T * T - 0.00000011 * T * T * T;
  
  // Mean anomaly of the Moon
  const Mprime = 201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T * T * T - 0.000000058 * T * T * T * T;
  
  // Moon's argument of latitude
  const F = 160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T * T * T + 0.000000011 * T * T * T * T;
  
  // Longitude of ascending node of lunar orbit
  const Omega = 124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T * T * T;
  
  // Convert to radians
  const toRad = Math.PI / 180;
  const Mr = M * toRad;
  const Mpr = Mprime * toRad;
  const Fr = F * toRad;
  const Or = Omega * toRad;
  
  // Planetary arguments
  const A1 = (299.77 + 0.107408 * k - 0.009173 * T * T) * toRad;
  const A2 = (251.88 + 0.016321 * k) * toRad;
  const A3 = (251.83 + 26.651886 * k) * toRad;
  const A4 = (349.42 + 36.412478 * k) * toRad;
  const A5 = (84.66 + 18.206239 * k) * toRad;
  const A6 = (141.74 + 53.303771 * k) * toRad;
  const A7 = (207.14 + 2.453732 * k) * toRad;
  const A8 = (154.84 + 7.306860 * k) * toRad;
  const A9 = (34.52 + 27.261239 * k) * toRad;
  const A10 = (207.19 + 0.121824 * k) * toRad;
  const A11 = (291.34 + 1.844379 * k) * toRad;
  const A12 = (161.72 + 24.198154 * k) * toRad;
  const A13 = (239.56 + 25.513099 * k) * toRad;
  const A14 = (331.55 + 3.592518 * k) * toRad;
  
  // Corrections for new moon
  let correction = 0;
  correction -= 0.40720 * Math.sin(Mpr);
  correction += 0.17241 * Math.sin(Mr);
  correction += 0.01608 * Math.sin(2 * Mpr);
  correction += 0.01039 * Math.sin(2 * Fr);
  correction += 0.00739 * Math.sin(Mpr - Mr);
  correction -= 0.00514 * Math.sin(Mpr + Mr);
  correction += 0.00208 * Math.sin(2 * Mr);
  correction -= 0.00111 * Math.sin(Mpr - 2 * Fr);
  correction -= 0.00057 * Math.sin(Mpr + 2 * Fr);
  correction += 0.00056 * Math.sin(2 * Mpr + Mr);
  correction -= 0.00042 * Math.sin(3 * Mpr);
  correction += 0.00042 * Math.sin(Mr + 2 * Fr);
  correction += 0.00038 * Math.sin(Mr - 2 * Fr);
  correction -= 0.00024 * Math.sin(2 * Mpr - Mr);
  correction -= 0.00017 * Math.sin(Or);
  correction -= 0.00007 * Math.sin(Mpr + 2 * Mr);
  correction += 0.00004 * Math.sin(2 * Mpr - 2 * Fr);
  correction += 0.00004 * Math.sin(3 * Mr);
  correction += 0.00003 * Math.sin(Mpr + Mr - 2 * Fr);
  correction += 0.00003 * Math.sin(2 * Mpr + 2 * Fr);
  correction -= 0.00003 * Math.sin(Mpr + Mr + 2 * Fr);
  correction += 0.00003 * Math.sin(Mpr - Mr + 2 * Fr);
  correction -= 0.00002 * Math.sin(Mpr - Mr - 2 * Fr);
  correction -= 0.00002 * Math.sin(3 * Mpr + Mr);
  correction += 0.00002 * Math.sin(4 * Mpr);
  
  // Additional planetary corrections
  correction += 0.000325 * Math.sin(A1);
  correction += 0.000165 * Math.sin(A2);
  correction += 0.000164 * Math.sin(A3);
  correction += 0.000126 * Math.sin(A4);
  correction += 0.000110 * Math.sin(A5);
  correction += 0.000062 * Math.sin(A6);
  correction += 0.000060 * Math.sin(A7);
  correction += 0.000056 * Math.sin(A8);
  correction += 0.000047 * Math.sin(A9);
  correction += 0.000042 * Math.sin(A10);
  correction += 0.000040 * Math.sin(A11);
  correction += 0.000037 * Math.sin(A12);
  correction += 0.000035 * Math.sin(A13);
  correction += 0.000023 * Math.sin(A14);
  
  return correction;
}

/**
 * Calculates the Julian Day of a new moon for a given k value
 * @param k - Lunation number
 * @returns Julian Day of the new moon
 */
function calculateNewMoonJD(k: number): number {
  // Time in Julian centuries from J2000.0
  const T = k / 1236.85;
  
  // Mean new moon
  const JDE = 2451550.09766 +
              29.530588861 * k +
              0.00015437 * T * T -
              0.000000150 * T * T * T +
              0.00000000073 * T * T * T * T;
  
  // Add periodic corrections
  const correction = calculatePeriodicCorrections(k, T);
  
  return JDE + correction;
}

/**
 * Finds the new moon immediately before or on the given date
 * Uses Meeus algorithm for high precision (~2 minutes accuracy)
 * @param date - The reference date
 * @returns Date of the new moon
 */
export function findPreviousNewMoon(date: Date): Date {
  try {
    const jd = dateToJulianDay(date);
    
    // Calculate approximate k value
    const k = Math.floor(calculateK(jd));
    
    // Calculate new moon for this k
    let newMoonJD = calculateNewMoonJD(k);
    
    // If this new moon is after our date, use previous lunation
    if (newMoonJD > jd) {
      newMoonJD = calculateNewMoonJD(k - 1);
    }
    
    return julianDayToDate(newMoonJD);
  } catch (error) {
    throw new LunarCalculationError(
      'Failed to calculate previous new moon',
      date,
      error
    );
  }
}

/**
 * Finds the next new moon after the given date
 * @param date - The reference date
 * @returns Date of the next new moon
 */
export function findNextNewMoon(date: Date): Date {
  try {
    const jd = dateToJulianDay(date);
    
    // Calculate approximate k value
    const k = Math.floor(calculateK(jd));
    
    // Calculate new moon for this k
    let newMoonJD = calculateNewMoonJD(k);
    
    // If this new moon is before our date, use next lunation
    if (newMoonJD <= jd) {
      newMoonJD = calculateNewMoonJD(k + 1);
    }
    
    return julianDayToDate(newMoonJD);
  } catch (error) {
    throw new LunarCalculationError(
      'Failed to calculate next new moon',
      date,
      error
    );
  }
}

/**
 * Calculates all new moons in a given year
 * @param year - The year to calculate for
 * @returns Array of new moon dates
 */
export function getNewMoonsForYear(year: number): Date[] {
  const newMoons: Date[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31, 23, 59, 59);
  
  let currentNewMoon = findPreviousNewMoon(startDate);
  
  // If the first new moon is before the year, get the next one
  if (currentNewMoon.getFullYear() < year) {
    currentNewMoon = findNextNewMoon(currentNewMoon);
  }
  
  // Collect all new moons in the year
  while (currentNewMoon <= endDate) {
    if (currentNewMoon >= startDate) {
      newMoons.push(new Date(currentNewMoon));
    }
    currentNewMoon = findNextNewMoon(currentNewMoon);
  }
  
  return newMoons;
}
