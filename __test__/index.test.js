const {
    DateRangeCheckerError, 
    isEndDateInRange, 
    isInRange, 
    isStartDateAndEndDateIncludeRange, 
    isStartDateAndEndDateInRange, 
    isStartDateInRange, 
    findOverlappingDates,
    findNonOverlappingDates
} = require("../src")

describe('checkDateRangeFormat', () => {
    test('Throws error if dateRange is undefined', () => {
        expect(() => {
            console.log(isInRange());
        }).toThrow(DateRangeCheckerError);
    });

    test('Throws error if startDate or endDate is undefined', () => {
        const dateRange = { startDate: undefined, endDate: new Date() };
        expect(() => {
            isInRange(dateRange, dateRange);
        }).toThrow(DateRangeCheckerError);
    });

    test('Throws error if startDate or endDate is null', () => {
        const dateRange = { startDate: null, endDate: new Date() };
        expect(() => {
            isInRange(dateRange, dateRange);
        }).toThrow(DateRangeCheckerError);
    });

    test('Throws error if startDate or endDate is not instance of Date', () => {
        const dateRange = { startDate: 'invalid', endDate: new Date() };
        expect(() => {
            isInRange(dateRange, dateRange);
        }).toThrow(DateRangeCheckerError);
    });

    test('Throws error if startDate is after endDate', () => {
        const dateRange = { startDate: new Date(), endDate: new Date('2022-01-01') };
        expect(() => {
            isInRange(dateRange, dateRange);
        }).toThrow(DateRangeCheckerError);
    });

    test('Does not throw error for valid dateRange', () => {
        const dateRange = { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-01') };
        expect(() => {
            isInRange(dateRange, dateRange);
        }).not.toThrow();
    });
});

describe('isInRange', () => {
    test('is in range', () => {
        const result = isInRange(
            { startDate: new Date('2022-01-01'), endDate: new Date('2023-12-31') },
            { startDate: new Date('2023-01-01'), endDate: new Date('2023-11-01') }
        )
        expect(result).toBe(true)
    })
    
    test('is not in range', () => {
        const result = isInRange(
            { startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31') },
            { startDate: new Date('2023-01-01'), endDate: new Date('2023-11-01') }
        )
        expect(result).toBe(false)
    })
})

describe('isStartDateInRange', () => {
    test('is startDate in range', () => {
        const result = isStartDateInRange(
            { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') },
            { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
        )
        expect(result).toBe(true)
    })
    
    test('is startDate not in range', () => {
        const result = isStartDateInRange(
            { startDate: new Date('2021-12-31'), endDate: new Date('2023-12-31') },
            { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
        )
        expect(result).toBe(false)
    })
})

describe('isEndDateInRange', () => {
    test('is endDate in range', () => {
        const result = isEndDateInRange(
            { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') },
            { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
        )
        expect(result).toBe(true)
    })
    
    test('is endDate not in range', () => {
        const result = isEndDateInRange(
            { startDate: new Date('2023-01-01'), endDate: new Date('2025-12-31') },
            { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
        )
        expect(result).toBe(false)
    })
})

describe('isStartDateAndEndDateInRange', () => {
    test('is startDate and endDate in range', () => {
        const result = isStartDateAndEndDateInRange(
            { startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') },
            { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
        )
        expect(result).toBe(true)
    })
    
    test('is startDate and endDate not in range', () => {
        const result = isStartDateAndEndDateInRange(
            { startDate: new Date('2021-01-01'), endDate: new Date('2023-12-31') },
            { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
        )
        expect(result).toBe(false)
    })
})

describe('isStartDateAndEndDateIncludeRange', () => {
    test('is startDate and endDate include range', () => {
        const result = isStartDateAndEndDateIncludeRange(
            { startDate: new Date('2022-01-01'), endDate: new Date('2023-12-31') },
            { startDate: new Date('2023-01-01'), endDate: new Date('2023-11-01') }
        )
        expect(result).toBe(true)
    })
    
    test('is startDate and endDate does not include range', () => {
        const result = isStartDateAndEndDateIncludeRange(
            { startDate: new Date('2022-01-01'), endDate: new Date('2023-12-31') },
            { startDate: new Date('2022-01-01'), endDate: new Date('2024-01-01') }
        )
        expect(result).toBe(false)
    })
})

describe('findOverlappingDates', () => {
    test('returns empty array when date ranges do not overlap', () => {
        const result = findOverlappingDates(
            { startDate: new Date('2022-01-01'), endDate: new Date('2023-12-31') },
            { startDate: new Date('2024-01-01'), endDate: new Date('2024-11-01') }
        )
        expect(result).toEqual([]);
    })

    test('If there are overlapping dates, those dates are returned.', () => {
        const referenceDateRange = { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-15') };
        const comparisonDateRange = { startDate: new Date('2022-01-05'), endDate: new Date('2022-01-20') };
    
        const result = findOverlappingDates(referenceDateRange, comparisonDateRange);
    
        expect(result).toEqual([
            new Date('2022-01-05'),
            new Date('2022-01-06'),
            new Date('2022-01-07'),
            new Date('2022-01-08'),
            new Date('2022-01-09'),
            new Date('2022-01-10'),
            new Date('2022-01-11'),
            new Date('2022-01-12'),
            new Date('2022-01-13'),
            new Date('2022-01-14'),
            new Date('2022-01-15'),
        ]);
    });

    test('returns overlapping dates when one range is completely within the other', () => {
        const referenceDateRange = { startDate: new Date('2022-01-05'), endDate: new Date('2022-01-10') };
        const comparisonDateRange = { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-15') };
    
        const result = findOverlappingDates(referenceDateRange, comparisonDateRange);
    
        expect(result).toEqual([
            new Date('2022-01-05'),
            new Date('2022-01-06'),
            new Date('2022-01-07'),
            new Date('2022-01-08'),
            new Date('2022-01-09'),
            new Date('2022-01-10')
        ]);
    });

    test('returns overlapping dates when date ranges are identical', () => {
        const referenceDateRange = { startDate: new Date('2022-01-05'), endDate: new Date('2022-01-15') };
        const comparisonDateRange = { startDate: new Date('2022-01-05'), endDate: new Date('2022-01-15') };
    
        const result = findOverlappingDates(referenceDateRange, comparisonDateRange);
    
        expect(result).toEqual([
            new Date('2022-01-05'),
            new Date('2022-01-06'),
            new Date('2022-01-07'),
            new Date('2022-01-08'),
            new Date('2022-01-09'),
            new Date('2022-01-10'),
            new Date('2022-01-11'),
            new Date('2022-01-12'),
            new Date('2022-01-13'),
            new Date('2022-01-14'),
            new Date('2022-01-15')
        ]);
    });
})

describe('findNonOverlappingDates', () => {
    test('returns merging two date ranges when there are no overlapping dates', () => {
        const referenceDateRange = { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-10') };
        const comparisonDateRange = { startDate: new Date('2022-01-11'), endDate: new Date('2022-01-15') };

        const result = findNonOverlappingDates(referenceDateRange, comparisonDateRange);

        expect(result).toEqual([
            new Date('2022-01-01'),
            new Date('2022-01-02'),
            new Date('2022-01-03'),
            new Date('2022-01-04'),
            new Date('2022-01-05'),
            new Date('2022-01-06'),
            new Date('2022-01-07'),
            new Date('2022-01-08'),
            new Date('2022-01-09'),
            new Date('2022-01-10'),
            new Date('2022-01-11'),
            new Date('2022-01-12'),
            new Date('2022-01-13'),
            new Date('2022-01-14'),
            new Date('2022-01-15')
        ]);
    })

    test('returns empty array when both date ranges are same', () => {
        const referenceDateRange = { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-10') };
        const comparisonDateRange = { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-10') };

        const result = findNonOverlappingDates(referenceDateRange, comparisonDateRange);

        expect(result).toEqual([]);
    })

    test('returns nonOverlapping dates', () => {
        const referenceDateRange = { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-10') };
        const comparisonDateRange = { startDate: new Date('2022-01-05'), endDate: new Date('2022-01-15') };

        const result = findNonOverlappingDates(referenceDateRange, comparisonDateRange);

        expect(result).toEqual([
            new Date('2022-01-01'),
            new Date('2022-01-02'),
            new Date('2022-01-03'),
            new Date('2022-01-04'),
            new Date('2022-01-11'),
            new Date('2022-01-12'),
            new Date('2022-01-13'),
            new Date('2022-01-14'),
            new Date('2022-01-15')
        ]);

        const referenceDateRangeReverse = { startDate: new Date('2022-01-05'), endDate: new Date('2022-01-15') };
        const comparisonDateRangeReverse = { startDate: new Date('2022-01-01'), endDate: new Date('2022-01-10') };

        const resultReverse = findNonOverlappingDates(referenceDateRangeReverse, comparisonDateRangeReverse);

        expect(resultReverse).toEqual([
            new Date('2022-01-01'),
            new Date('2022-01-02'),
            new Date('2022-01-03'),
            new Date('2022-01-04'),
            new Date('2022-01-11'),
            new Date('2022-01-12'),
            new Date('2022-01-13'),
            new Date('2022-01-14'),
            new Date('2022-01-15')
        ]);
    })
})