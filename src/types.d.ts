import type { ComputedRef } from 'vue-demi';
import { useReactiveBreakpoints } from './use.reactive.breakpoints';

/**
 * Media query list.
 */
export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Breakpoint limits.
 */
export type Threshold = {
  [key in BreakpointName]: number;
};

export type BreakpointState = { [key in BreakpointName]: boolean } & {
  name: BreakpointName;
  width: number;
  height: number;
  smAndDown: boolean;
  smAndUp: boolean;
  mdAndDown: boolean;
  mdAndUp: boolean;
  lgAndDown: boolean;
  lgAndUp: boolean;
};

export type BreakpointStateRef = {
  [key in keyof BreakpointState]: ComputedRef<BreakpointState[key]>;
};

export type ReactiveBreakpoint = BreakpointStateRef & {
  watch: (handler: (state?: BreakpointState) => void) => Function;
};

export type Config = {
  thresholds?: Threshold;
};

/**
 * Infer the global breakpoint property type.
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $breakpoints: BreakpointState;
  }
}

export * from './index';
