interface DateRange {
    startDate: Date;
    endDate: Date;
}

class DateRangeCheckerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DateRangeCheckerError';
    }
}

/**
 * @name isInRange
 * @category Date Range Helpers
 * @summary Checks if the provided date range is within another date range.
 *
 * @description
 * This function checks if the provided date range is within another date range.
 * It compares the start and end dates of the reference range with the comparison range.
 * Throws an error if the date range format is incorrect.
 *
 * @param {DateRange} referenceDateRange - The reference date range to check against.
 * @param {DateRange} comparisonDateRange - The date range to compare.
 * @returns {boolean} True if the comparison date range is within the reference date range, false otherwise.
 * @throws {DateRangeCheckerError} Throws an error if the date range format is incorrect.
 *
 * @example
 * // Example 1:
 * const result1 = isInRange(
 *   { startDate: new Date(), endDate: new Date() },
 *   { startDate: new Date('2024-01-02'), endDate: new Date('2025-01-03') }
 * );
 * //=> true
 *
 * // Example 2:
 * const result2 = isInRange(
 *   { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') },
 *   { startDate: new Date('2022-01-01'), endDate: new Date('2023-12-01') }
 * );
 * //=> false
 */
function isInRange(referenceDateRange: DateRange, comparisonDateRange: DateRange): boolean {
    checkDateRangeFormat(referenceDateRange);
    checkDateRangeFormat(comparisonDateRange);

    return (
        isStartDateInRange(referenceDateRange, comparisonDateRange) ||
        isEndDateInRange(referenceDateRange, comparisonDateRange) ||
        isStartDateAndEndDateIncludeRange(referenceDateRange, comparisonDateRange)
    );
}

/**
 * @name isStartDateInRange
 * @category Date Range Helpers
 * @summary Checks if the start date of the reference range is within the comparison range.
 *
 * @description
 * This function checks if the start date of the reference range is within the comparison range.
 * Throws an error if the date range format is incorrect.
 *
 * @param {DateRange} referenceDateRange - The reference date range to check against.
 * @param {DateRange} comparisonDateRange - The date range to compare.
 * @returns {boolean} True if the start date is within the specified range, false otherwise.
 * @throws {DateRangeCheckerError} Throws an error if the date range format is incorrect.
 *
 * @example
 * const result = isStartDateInRange(
 *   { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') },
 *   { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
 * );
 * //=> true
 */
function isStartDateInRange(referenceDateRange: DateRange, comparisonDateRange: DateRange): boolean {
    checkDateRangeFormat(referenceDateRange);
    checkDateRangeFormat(comparisonDateRange);

    return (
        referenceDateRange.startDate.getTime() >= comparisonDateRange.startDate.getTime() &&
        referenceDateRange.startDate.getTime() <= comparisonDateRange.endDate.getTime()
    );
}

/**
 * @name isEndDateInRange
 * @category Date Range Helpers
 * @summary Checks if the end date of the reference range is within the comparison range.
 *
 * @description
 * This function checks if the end date of the reference range is within the comparison range.
 * Throws an error if the date range format is incorrect.
 *
 * @param {DateRange} referenceDateRange - The reference date range to check against.
 * @param {DateRange} comparisonDateRange - The date range to compare.
 * @returns {boolean} True if the end date is within the specified range, false otherwise.
 * @throws {DateRangeCheckerError} Throws an error if the date range format is incorrect.
 *
 * @example
 * const result = isEndDateInRange(
 *   { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') },
 *   { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
 * );
 * //=> true
 */
function isEndDateInRange(referenceDateRange: DateRange, comparisonDateRange: DateRange): boolean {
    checkDateRangeFormat(referenceDateRange);
    checkDateRangeFormat(comparisonDateRange);

    return (
        referenceDateRange.endDate.getTime() >= comparisonDateRange.startDate.getTime() &&
        referenceDateRange.endDate.getTime() <= comparisonDateRange.endDate.getTime()
    );
}

/**
 * @name isStartDateAndEndDateInRange
 * @category Date Range Helpers
 * @summary Checks if both the start and end dates of the reference range are within the comparison range.
 *
 * @description
 * This function checks if both the start and end dates of the reference range are within the comparison range.
 * It utilizes the utility functions isStartDateInRange and isEndDateInRange.
 * Throws an error if the date range format is incorrect.
 *
 * @param {DateRange} referenceDateRange - The reference date range to check against.
 * @param {DateRange} comparisonDateRange - The date range to compare.
 * @returns {boolean} True if both start and end dates are within the specified range, false otherwise.
 * @throws {DateRangeCheckerError} Throws an error if the date range format is incorrect.
 *
 * @example
 * const result = isStartDateAndEndDateInRange(
 *   { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') },
 *   { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
 * );
 * //=> true
 */
function isStartDateAndEndDateInRange(referenceDateRange: DateRange, comparisonDateRange: DateRange): boolean {
    checkDateRangeFormat(referenceDateRange);
    checkDateRangeFormat(comparisonDateRange);

    return (
        isStartDateInRange(referenceDateRange, comparisonDateRange) &&
        isEndDateInRange(referenceDateRange, comparisonDateRange)
    );
}

/**
 * @name isStartDateAndEndDateIncludeRange
 * @category Date Range Helpers
 * @summary Checks if both start and end dates of the reference range include the comparison range.
 *
 * @description
 * This function checks if both start and end dates of the reference range include the comparison range.
 * Throws an error if the date range format is incorrect.
 *
 * @param {DateRange} referenceDateRange - The reference date range to check against.
 * @param {DateRange} comparisonDateRange - The date range to compare.
 * @returns {boolean} True if both start and end dates include the specified range, false otherwise.
 * @throws {DateRangeCheckerError} Throws an error if the date range format is incorrect.
 *
 * @example
 * const result1 = isStartDateAndEndDateIncludeRange(
 *   { startDate: new Date('2022-01-01'), endDate: new Date('2023-12-31') },
 *   { startDate: new Date('2023-01-01'), endDate: new Date('2023-11-01') }
 * );
 * //=> true
 * const result2 = isStartDateAndEndDateIncludeRange(
 *   { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') },
 *   { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
 * );
 * //=> false
 */
function isStartDateAndEndDateIncludeRange(referenceDateRange: DateRange, comparisonDateRange: DateRange): boolean {
    checkDateRangeFormat(referenceDateRange);
    checkDateRangeFormat(comparisonDateRange);

    return (
        referenceDateRange.startDate.getTime() <= comparisonDateRange.startDate.getTime() &&
        referenceDateRange.endDate.getTime() >= comparisonDateRange.endDate.getTime()
    );
}

/**
 * @name checkDateRangeFormat
 * @category Date Range Helpers
 * @summary Checks if the provided object adheres to the expected date range format.
 *
 * @description
 * This function checks if the provided object adheres to the expected date range format.
 * Throws an error if the date range format is incorrect.
 *
 * @param {DateRange} dateRange - The date range to check.
 * @throws {DateRangeCheckerError} Throws an error if the date range format is incorrect.
 *
 * @example
 * checkDateRangeFormat({ startDate: new Date(), endDate: new Date('2023-01-01') });
 */
function checkDateRangeFormat(dateRange: DateRange): void {
    if (!dateRange || dateRange.startDate === undefined || dateRange.endDate === undefined) {
        throw new DateRangeCheckerError('dateRange must be defined and contain both startDate and endDate.');
    }

    if (dateRange.startDate === null || dateRange.endDate === null) {
        throw new DateRangeCheckerError('Both startDate and endDate cannot be null.');
    }

    if (!(dateRange.startDate instanceof Date) || !(dateRange.endDate instanceof Date)) {
        throw new DateRangeCheckerError('Both startDate and endDate must be instances of the Date class.');
    }

    if (dateRange.startDate.getTime() > dateRange.endDate.getTime()) {
        throw new DateRangeCheckerError('startDate cannot be after endDate.');
    }
}

export {
    isInRange,
    isStartDateInRange,
    isEndDateInRange,
    isStartDateAndEndDateInRange,
    isStartDateAndEndDateIncludeRange,
    DateRangeCheckerError
}