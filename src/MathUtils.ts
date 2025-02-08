export class MathUtils {
  static roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }
}