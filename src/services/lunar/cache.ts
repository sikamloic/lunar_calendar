/**
 * LRU Cache implementation for lunar calculations
 * Optimizes performance by caching computed results
 */

import { CacheError } from './errors';
import type { LunarDayInfo } from './types';

interface CacheEntry<T> {
  value: T;
  timestamp: number;
}

export class LRUCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private accessOrder: string[] = [];
  private maxSize: number;
  private ttlMs: number;
  
  constructor(
    maxSize: number = 365,
    ttlMs: number = 24 * 60 * 60 * 1000 // 24 hours default
  ) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
    
    if (maxSize < 1) {
      throw new CacheError('Cache maxSize must be at least 1');
    }
  }
  
  /**
   * Gets a value from cache or computes it
   */
  getOrCompute(key: string, computer: () => T): T {
    const cached = this.get(key);
    
    if (cached !== undefined) {
      return cached;
    }
    
    const value = computer();
    this.set(key, value);
    return value;
  }
  
  /**
   * Gets a value from cache
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return undefined;
    }
    
    // Check TTL
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.delete(key);
      return undefined;
    }
    
    // Update access order (LRU)
    this.updateAccessOrder(key);
    
    return entry.value;
  }
  
  /**
   * Sets a value in cache
   */
  set(key: string, value: T): void {
    // Evict if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
    
    this.updateAccessOrder(key);
  }
  
  /**
   * Deletes a key from cache
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.accessOrder = this.accessOrder.filter(k => k !== key);
    }
    return deleted;
  }
  
  /**
   * Clears the entire cache
   */
  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }
  
  /**
   * Gets cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      utilizationPercent: (this.cache.size / this.maxSize) * 100
    };
  }
  
  /**
   * Updates the access order for LRU
   */
  private updateAccessOrder(key: string): void {
    // Remove from current position
    this.accessOrder = this.accessOrder.filter(k => k !== key);
    // Add to end (most recently used)
    this.accessOrder.push(key);
  }
  
  /**
   * Evicts the least recently used item
   */
  private evictLRU(): void {
    if (this.accessOrder.length === 0) {
      return;
    }
    
    const lruKey = this.accessOrder[0];
    this.delete(lruKey);
  }
}

/**
 * Global cache instance for lunar day info
 */
export const lunarDayCache = new LRUCache<LunarDayInfo>(365);

/**
 * Creates a cache key from a date
 */
export function dateToKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
