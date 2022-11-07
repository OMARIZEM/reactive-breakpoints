import {
  reactive,
  computed,
  ComputedRef,
  watch,
  getCurrentInstance,
} from 'vue-demi';
import { Breakpoint } from './utils/breakpoint';
import { BreakpointObserver } from './utils/Breakpoint.observer';
import {
  BreakpointState,
  BreakpointStateRef,
  ReactiveBreakpoint,
  Threshold,
} from './types';
import { RESIZE_DELAY } from './utils/constants';
import { isSSR } from './utils/helpers';

/**
 *
 * @param {!Threshold} thresholds
 * @returns {ReactiveBreakpoint}
 */
export const useReactiveBreakpoints = (
  thresholds?: Threshold
): ReactiveBreakpoint => {
  /**
   * @description The breakpoint instance
   *
   * @type {Breakpoint}
   */
  const breakpoint: Breakpoint = reactive<Breakpoint>(
    new Breakpoint(thresholds)
  ) as Breakpoint;

  /**
   * @description The breakpoint observer instance
   *
   * @type {BreakpointObserver}
   */
  const observer: BreakpointObserver = new BreakpointObserver(breakpoint);

  /**
   * Resize denouncer
   *
   * @type {number}
   */
  let debounceTimeout: number = 0;

  /**
   * Whether the app is mounted
   *
   * @type {ComputedRef<boolean>}
   */
  const isMounted: ComputedRef<boolean> = computed(
    () => getCurrentInstance()?.isMounted ?? false
  );

  /**
   * @description Update the current breakpoint state
   */
  const onResize = () => {
    clearTimeout(debounceTimeout);

    if (isSSR()) return;

    debounceTimeout = window.setTimeout(() => {
      breakpoint.refresh();
    }, RESIZE_DELAY);
  };

  /**
   * @description Setup the resize event listener
   */
  const init = () => {
    breakpoint.refresh();
    window.addEventListener('resize', onResize, { passive: true });
  };

  /**
   * @description Remove the resize event listener
   */
  const destroy = () => {
    window.removeEventListener('resize', onResize);
  };

  /**
   * Map breakpoint names to computed refs
   *
   * @type {BreakpointStateRef}
   */
  const breakpoints: BreakpointStateRef = (
    Object.keys(breakpoint.state) as [keyof BreakpointState]
  ).reduce((bp, k) => {
    Object.defineProperty(bp, k, {
      get: () => computed(() => breakpoint.state[k]),
      enumerable: true,
      configurable: true,
    });
    return bp;
  }, {} as BreakpointStateRef);

  // lifecycle hooks
  watch(
    () => isMounted,
    (instance) => {
      if (instance) {
        init();
      } else {
        destroy();
      }
    },
    { immediate: true }
  );

  return {
    ...breakpoints,
    watch: observer.watch.bind(observer),
  };
};
