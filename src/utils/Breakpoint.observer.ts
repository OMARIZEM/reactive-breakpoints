import {
  getCurrentInstance,
  onUnmounted,
  ref,
  watch as onBreakPointUpdated,
} from 'vue-demi';
import { BreakpointState } from '../types';
import { Breakpoint } from './breakpoint';

/**
 * @description Observe a breakpoint changes
 *
 * Watching is enabled by default
 */
export class BreakpointObserver {
  /**
   * List of callbacks to be called whenever the viewport size changes
   *
   * @property Array<(state?: BreakpointState) => void>
   * @private
   */
  protected handlers: Array<(state?: BreakpointState) => void> = [];

  /**
   * @description Whether the observer is watching for changes
   *
   * @property {boolean}
   * @private
   */
  protected watching = ref(true);

  /**
   * @description The breakpoint instance to observe
   */
  private breakpoint: Breakpoint | null = null;

  public constructor(breakpoint: Breakpoint) {
    this.breakpoint = breakpoint;

    onBreakPointUpdated(
      () => this.breakpoint?.state,
      (newState) => {
        if (breakpoint && this.watching)
          this.notify(newState as BreakpointState);
      },
      { deep: true }
    );
  }

  /**
   * Setups a callback/handler to be called whenever the viewport size changes
   *
   * It will be automatically cleaned up when the component gets unmounted
   *
   * @param handler
   * @returns {(state?: BreakpointState) => void} - Function to remove the watcher
   */
  public watch(handler: (state?: BreakpointState) => void): Function {
    /* avoid watching twice */
    if (!this.handlers.includes(handler)) this.handlers.push(handler);

    /**
     * Remove the watcher from handlers list
     *
     * @return {void}
     */
    const unwatch = (): void => {
      const idx = this.handlers.indexOf(handler);
      if (idx > -1) {
        this.handlers.splice(idx, 1);
      }
    };

    if (getCurrentInstance()) {
      onUnmounted(unwatch);
    }

    return unwatch;
  }

  /**
   * Notify watcher with the new state
   */
  public notify(newState: BreakpointState) {
    this.handlers.forEach((handler) => {
      handler(newState);
    });
  }

  /**
   * Stop watching for the breakpoint changes
   *
   * @returns {void}
   * @public
   */
  public pause(): void {
    this.watching.value = false;
  }

  /**
   * Resume watching for the breakpoint changes
   *
   * @returns {void}
   * @public
   */
  public resume(): void {
    this.watching.value = true;
  }
}
