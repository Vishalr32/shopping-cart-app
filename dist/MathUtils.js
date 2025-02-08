"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = void 0;
class MathUtils {
    static roundToTwoDecimals(value) {
        return Math.round(value * 100) / 100;
    }
}
exports.MathUtils = MathUtils;
