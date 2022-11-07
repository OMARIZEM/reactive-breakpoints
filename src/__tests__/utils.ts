import { Breakpoint } from '../utils/breakpoint';
import { BreakpointObserver } from '../utils/Breakpoint.observer';

export class BreakpointMock extends Breakpoint {
  public update(newWidth: number, newHeight: number): void {
    this.updateState(newWidth, newHeight);
  }
}

export class BreakpointObserverMock extends BreakpointObserver {
  public constructor(breakpoint: Breakpoint) {
    super(breakpoint);
  }

  public get isWatching(): boolean {
    return this.watching.value;
  }

  public get handlersCount(): number {
    return this.handlers.length;
  }
}

export const resizeMock = (width: number, height: number) => {
  return new Promise((resolve) => {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event('resize'));
    setTimeout(resolve, 300);
  });
};

export const sleep = (timeout?: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
