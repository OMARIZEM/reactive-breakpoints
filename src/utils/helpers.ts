/**
 * @returns {number}
 */
export function getViewportWidth(): number {
  return Math.max(
    document?.documentElement?.clientWidth ?? 0,
    window?.innerWidth ?? 0
  );
}

/**
 * @returns {number}
 */
export function getViewportHeight(): number {
  return Math.max(
    document?.documentElement?.clientHeight ?? 0,
    window?.innerHeight ?? 0
  );
}

/**
 * Check if is server side rendering
 *
 * @returns {boolean}
 */
export function isSSR(): boolean {
  return typeof window === 'undefined';
}
