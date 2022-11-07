import { test, describe, expect, beforeEach } from 'vitest';
import { Breakpoint } from '../utils/breakpoint';
import { DEFAULT_THRESHOLDS } from '../utils/constants';
import { BreakpointMock } from './utils';

describe('-- Breakpoint --', () => {
  let breakpoint: BreakpointMock;
  beforeEach(() => {
    breakpoint = new BreakpointMock();
  });

  test('should be instantiable', () => {
    const breakpoint = new Breakpoint();
    expect(breakpoint).toBeInstanceOf(Breakpoint);
  });

  test('should allow width and height to be set', () => {
    breakpoint.update(100, 100);
    expect(breakpoint.width).toBe(100);
    expect(breakpoint.height).toBe(100);
  });

  test('should return the right breakpoint name', () => {
    Object.entries(DEFAULT_THRESHOLDS).forEach(([name, threshold]) => {
      breakpoint.update(threshold, 0);
      expect(breakpoint.name).toBe(name);
    });
  });

  test('should return the right state', () => {
    breakpoint.update(DEFAULT_THRESHOLDS.lg, 600);
    expect(breakpoint.state).toStrictEqual({
      xs: false,
      sm: false,
      md: false,
      lg: true,
      xl: false,
      xxl: false,
      name: 'lg',
      width: DEFAULT_THRESHOLDS.lg,
      height: 600,
      smAndDown: false,
      smAndUp: true,
      mdAndDown: false,
      mdAndUp: true,
      lgAndDown: true,
      lgAndUp: true,
    });
  });
});
