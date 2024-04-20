import { DateRange } from "./type/type";


function findDateRangeEachDates(dateRange: DateRange): Date[] {
    const result: Date[] = [];
    let currentDate = new Date(dateRange.startDate);

    while (currentDate.getTime() <= dateRange.endDate.getTime()) {
        result.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
}

export {
    findDateRangeEachDates
}