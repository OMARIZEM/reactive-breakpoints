import { BreakpointName, BreakpointState, Threshold } from '../types';
import { DEFAULT_THRESHOLDS } from './constants';
import { getViewportHeight, getViewportWidth } from './helpers';

/**
 * @description Reactive viewport breakpoint
 *
 * @class
 */
export class Breakpoint {
  /**
   * @property {BreakpointName} _name
   * @private
   * */
  private currentThreshold: BreakpointName = 'xs';

  /**
   * @property {boolean} thresholds
   * @private
   */
  private thresholds: Threshold;

  /**
   * @property {number} viewPortWidth
   * @private
   */
  private viewportWidth = DEFAULT_THRESHOLDS?.xs ?? 0;

  /**
   * @property {number} viewPortWidth
   * @private
   */
  private viewportHeight = DEFAULT_THRESHOLDS?.xs ?? 0;

  /**
   * create a new Breakpoint object
   *
   * @param {!Threshold=} thresholds
   * @constructor
   */
  public constructor(thresholds?: Threshold) {
    this.thresholds = thresholds ?? DEFAULT_THRESHOLDS;
  }

  /**
   * Current viewport width
   *
   * @return {number}
   * @public
   */
  public get width(): number {
    return this.viewportWidth;
  }

  /**
   * @param {number} newWidth
   *
   * @private
   */
  private set width(newWidth: number) {
    this.viewportWidth = newWidth;
  }

  /**
   * Current viewport height
   *
   * @return {number}
   * @public
   */
  public get height(): number {
    return this.viewportHeight;
  }

  /**
   * @param {number} newHeight
   *
   * @private
   */
  private set height(newHeight: number) {
    this.viewportHeight = newHeight;
  }

  /**
   * Whether current viewport Width represents very small devices
   *
   * @return {boolean}
   * @public
   */
  public get xs(): boolean {
    return this.name === 'xs';
  }

  /**
   * Whether current viewport Width represents small devices
   *
   * @return {boolean}
   * @public
   */
  public get sm(): boolean {
    return this.name === 'sm';
  }

  /**
   * @return {boolean}
   */
  public get smAndDown(): boolean {
    return (this.xs || this.sm) && !(this.md || this.lg || this.xl || this.xxl);
  }

  /**
   * @return {boolean}
   */
  public get smAndUp(): boolean {
    return !this.xs && (this.sm || this.md || this.lg || this.xl || this.xxl);
  }

  /**
   * Whether current viewport Width represents medium devices (e.g: tablet)
   *
   * @return {boolean}
   * @public
   */
  public get md(): boolean {
    return this.name === 'md';
  }

  /**
   * @return {boolean}
   */
  public get mdAndDown(): boolean {
    return (this.xs || this.sm || this.md) && !(this.lg || this.xl || this.xxl);
  }

  /**
   * @return {boolean}
   */
  public get mdAndUp(): boolean {
    return !(this.xs || this.sm) && (this.md || this.lg || this.xl || this.xxl);
  }

  /**
   * Whether current viewport Width large devices (e.g: laptop)
   *
   * @return {boolean}
   * @public
   */
  public get lg(): boolean {
    return this.name === 'lg';
  }

  /**
   * @return {boolean}
   */
  public get lgAndDown(): boolean {
    return (this.xs || this.sm || this.md || this.lg) && !this.xl && !this.xxl;
  }

  /**
   * @return {boolean}
   */
  public get lgAndUp(): boolean {
    return !(this.xs || this.sm || this.md) && (this.lg || this.xl || this.xxl);
  }

  /**
   * Whether current viewport Width very large devices (e.g: desktop)
   *
   * @return {boolean}
   * @public
   */
  public get xl(): boolean {
    return this.name === 'xl';
  }

  /**
   * @return {boolean}
   */
  public get xlAndDown(): boolean {
    return (this.xs || this.sm || this.md || this.lg || this.xl) && !this.xxl;
  }

  /**
   * @return {boolean}
   */
  public get xlAndUp(): boolean {
    return !(this.xs || this.sm || this.md || this.lg) && (this.xl || this.xxl);
  }

  /**
   * Whether current viewport Width extra large devices (e.g: desktop)
   *
   * @return {boolean}
   * @public
   */
  public get xxl(): boolean {
    return this.name === 'xxl';
  }

  /**
   * Current threshold name
   *
   * @return {BreakpointName}
   * @public
   */
  public get name(): BreakpointName {
    return this.currentThreshold;
  }

  /**
   * @param {BreakpointName} newName
   */
  private set name(newName: BreakpointName) {
    this.currentThreshold = newName;
  }

  /**
   * @return {BreakpointState}
   */
  public get state(): BreakpointState {
    return {
      xs: this.xs,
      sm: this.sm,
      smAndDown: this.smAndDown,
      smAndUp: this.smAndUp,
      md: this.md,
      mdAndDown: this.mdAndDown,
      mdAndUp: this.mdAndUp,
      lg: this.lg,
      lgAndDown: this.lgAndDown,
      lgAndUp: this.lgAndUp,
      xl: this.xl,
      xxl: this.xxl,
      name: this.name,
      width: this.width,
      height: this.height,
    };
  }

  /**
   * @param {number} width
   * @protected
   * @return {BreakpointName} - current breakpoint name
   * */
  protected getNameFromWidth(width: number): BreakpointName {
    const { thresholds } = this;

    if (width <= thresholds.xs) {
      return 'xs';
    }

    if (width <= thresholds.sm) {
      return 'sm';
    }

    if (width <= thresholds.md) {
      return 'md';
    }

    if (width <= thresholds.lg) {
      return 'lg';
    }

    if (width <= thresholds.xl) {
      return 'xl';
    }

    if (width >= thresholds.xxl) {
      return 'xxl';
    }

    return 'xs';
  }

  /**
   * Detect current viewport size and refresh the breakpoint state
   *
   * @return {void}
   */
  public refresh(): void {
    this.updateState(getViewportWidth(), getViewportHeight());
  }

  /**
   * Initialize breakpoint state
   *
   * @param {number} width - viewport width
   * @param {number} height - viewport height
   * @return {void}
   */
  protected updateState(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.name = this.getNameFromWidth(width);
  }
}
