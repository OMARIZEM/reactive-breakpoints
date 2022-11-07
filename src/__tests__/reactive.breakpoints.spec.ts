import { test, describe, expect, beforeEach } from 'vitest';
import { ReactiveBreakpoint } from '../types';
import { useReactiveBreakpoints } from '../use.reactive.breakpoints';
import { resizeMock } from './utils';

describe('-- Reactive breakpoints hook --', () => {
  let breakpoints: ReactiveBreakpoint;

  beforeEach(() => {
    breakpoints = useReactiveBreakpoints();
  });

  test('should be invocable', () => {
    expect(breakpoints).toBeInstanceOf(Object);
  });

  test('should allow overriding default thresholds', () => {
    const breakpoints = useReactiveBreakpoints({
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560,
    });
    expect(breakpoints).toBeInstanceOf(Object);
  });

  test('should update the state when the window is resized', async () => {
    await resizeMock(1900, 600);
    expect(breakpoints?.width.value).toBe(1900);
    expect(breakpoints?.height.value).toBe(600);
    expect(breakpoints?.name.value).toBe('xxl');
  });
});
