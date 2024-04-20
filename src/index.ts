import { DateRange } from "./type/type";
import { findDateRangeEachDates } from "./util";

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
 * @name findoverlappingDates
 * @category Date Range Helpers
 * @summary Finds overlapping dates between two date ranges.
 * 
 * @description
 * This function returns an array of dates that overlap between the given reference date range and comparison date range.
 * If there is no overlap, an empty array is returned.
 * Throws an error if the date range format is incorrect.
 * 
 * @param {DateRange} referenceDateRange - The reference date range.
 * @param {DateRange} comparisonDateRange - The comparison date range.
 * @returns {Date[]} An array of overlapping dates found within the overlapping period of the two date ranges.
 * @throws {DateRangeCheckerError} Throws an error if the date range format is incorrect.
 * 
 * @example
 * const overlappingDates = findOverlappingDates(
 *   { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-10') },
 *   { startDate: new Date('2022-01-05'), endDate: new Date('2022-01-15') }
 * );
 * //=> [
 * //     new Date('2022-01-05'),
 * //     new Date('2022-01-06'),
 * //     new Date('2022-01-07'),
 * //     new Date('2022-01-08'),
 * //     new Date('2022-01-09'),
 * //     new Date('2022-01-10')
 * //   ]
 */
function findOverlappingDates(referenceDateRange: DateRange, comparisonDateRange: DateRange): Date[] {
    checkDateRangeFormat(referenceDateRange);
    checkDateRangeFormat(comparisonDateRange);

    if (!isInRange(referenceDateRange, comparisonDateRange)) {
        return [];
    }

    const startDate = referenceDateRange.startDate.getTime() > comparisonDateRange.startDate.getTime() ? new Date(referenceDateRange.startDate) : new Date(comparisonDateRange.startDate);
    const endDate = referenceDateRange.endDate.getTime() < comparisonDateRange.endDate.getTime() ? new Date(referenceDateRange.endDate) : new Date(comparisonDateRange.endDate);

    return [
        ...findDateRangeEachDates({startDate, endDate})
    ]
}

/**
 * @name findNonOverlappingDates
 * @category Date Range Helpers
 * @summary Finds non overlapping dates between two date ranges.
 * 
 * @description
 * This function returns an array of dates that non overlapping between the given reference date range and comparison date range.
 * If two date ranges are same, return empty array.
 * Throws an error if the date range format is incorrect.
 * 
 * @param {DateRange} referenceDateRange - The reference date range.
 * @param {DateRange} comparisonDateRange - The comparison date range.
 * @returns {Date[]} An array of overlapping dates found within the overlapping period of the two date ranges.
 * @throws {DateRangeCheckerError} Throws an error if the date range format is incorrect.
 * 
 * @example
 * const nonOverlappingDates = findNonOverlappingDates(
 *   { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-10') },
 *   { startDate: new Date('2022-01-05'), endDate: new Date('2022-01-15') }
 * );
 * //=> [
 * //     new Date('2022-01-01'),
 * //     new Date('2022-01-02'),
 * //     new Date('2022-01-03'),
 * //     new Date('2022-01-04'),
 * //     new Date('2022-01-11'),
 * //     new Date('2022-01-12')
 * //     new Date('2022-01-13')
 * //     new Date('2022-01-14')
 * //     new Date('2022-01-15')
 * //   ]
 */
function findNonOverlappingDates(referenceDateRange: DateRange, comparisonDateRange: DateRange): Date[] {
    checkDateRangeFormat(referenceDateRange);
    checkDateRangeFormat(comparisonDateRange);

    if (!isInRange(referenceDateRange, comparisonDateRange)) {
        return [
            ...findDateRangeEachDates({
                startDate: referenceDateRange.startDate,
                endDate: referenceDateRange.endDate
            }),
            ...findDateRangeEachDates({
                startDate: comparisonDateRange.startDate,
                endDate: comparisonDateRange.endDate
            })
        ];
    }

    const firstStartDate = referenceDateRange.startDate.getTime() < comparisonDateRange.startDate.getTime() ? new Date(referenceDateRange.startDate) : new Date(comparisonDateRange.startDate);
    const firstEndDate = firstStartDate.getTime() === referenceDateRange.startDate.getTime() ? new Date(comparisonDateRange.startDate) : new Date(referenceDateRange.startDate);
    firstEndDate.setDate(firstEndDate.getDate() - 1);

    const secondStartDate = referenceDateRange.endDate.getTime() < comparisonDateRange.endDate.getTime() ? new Date(referenceDateRange.endDate) : new Date(comparisonDateRange.endDate);
    const secondEndDate = secondStartDate.getTime() == referenceDateRange.endDate.getTime() ? new Date(comparisonDateRange.endDate) : new Date(referenceDateRange.endDate);
    secondStartDate.setDate(secondStartDate.getDate() + 1)

    return [
        ...findDateRangeEachDates({
            startDate: firstStartDate,
            endDate: firstEndDate
        }),
        ...findDateRangeEachDates({
            startDate: secondStartDate,
            endDate: secondEndDate
        })
    ]
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
    findOverlappingDates,
    findNonOverlappingDates,
    DateRangeCheckerError
}