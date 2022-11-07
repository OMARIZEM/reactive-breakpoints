import type { Config } from './types';
import type { App } from 'vue';
import { useReactiveBreakpoints } from './use.reactive.breakpoints';

export const ReactiveBreakpoints = {
  install(app: App, options: Config) {
    app.config.globalProperties.$breakpoints = useReactiveBreakpoints(
      options?.thresholds
    );
  },
};
