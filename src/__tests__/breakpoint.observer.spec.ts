import { reactive } from 'vue-demi';
import { test, describe, expect, beforeEach, vi } from 'vitest';
import { Breakpoint } from '../utils/breakpoint';
import { BreakpointObserver } from '../utils/Breakpoint.observer';
import { BreakpointMock, BreakpointObserverMock, sleep } from './utils';

describe('-- Breakpoint Observer --', () => {
  let observer: BreakpointObserverMock;
  let breakpoint: BreakpointMock;

  beforeEach(() => {
    breakpoint = reactive<BreakpointMock>(
      new BreakpointMock()
    ) as BreakpointMock;

    observer = new BreakpointObserverMock(breakpoint);
  });

  test('should be instantiable', () => {
    expect(observer).toBeInstanceOf(BreakpointObserver);
  });

  test('should pause watching', () => {
    observer.pause();
    expect(observer.isWatching).toBe(false);
  });

  test('should resume watching', () => {
    observer.pause();
    observer.resume();
    expect(observer.isWatching).toBe(true);
  });

  test('should add a handler', () => {
    observer.watch(() => {});
    expect(observer.handlersCount).toBe(1);
  });

  test('should remove a handler', () => {
    const handler = () => {};
    const unwatch = observer.watch(handler);
    unwatch();
    expect(observer.handlersCount).equals(0);
  });

  test('should call a handler', () => {
    const handler = vi.fn();
    observer.watch(handler);
    observer.notify(breakpoint.state);
    expect(handler).toBeCalled();
  });

  test("should call notify's subscribers on breakpoint change", async () => {
    const handler = vi.fn();
    observer.watch(handler);
    breakpoint.update(100, 100);
    await sleep(100);
    expect(handler).toBeCalled();
  });
});
