import type { Threshold } from '../types';

/**
 * @constant
 *
 * @type {Threshold} - Default breakpoint limits
 */
export const DEFAULT_THRESHOLDS: Threshold = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

/**
 * @constant
 *
 * @type {number} The maximum time (in milliseconds)  allowed to delay the resize callback.
 */
export const RESIZE_DELAY: number = 300;
