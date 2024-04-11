const {DateRangeCheckerError, isEndDateInRange, isInRange, isStartDateAndEndDateIncludeRange, isStartDateAndEndDateInRange, isStartDateInRange} = require("../src")

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
