"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverage = exports.countOccurrences = void 0;
// analyticsHelpers.ts
function countOccurrences(arr) {
    return arr.reduce((counts, val) => {
        counts[val] = (counts[val] || 0) + 1;
        return counts;
    }, {});
}
exports.countOccurrences = countOccurrences;
function calculateAverage(arr) {
    const sum = arr.reduce((total, val) => total + val, 0);
    return arr.length > 0 ? sum / arr.length : 0;
}
exports.calculateAverage = calculateAverage;
