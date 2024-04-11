# Date Range Checker

A utility library for comparing date ranges.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install date-range-checker
```

## Usage
```typescript
import {
  isInRange,
  isStartDateInRange,
  isEndDateInRange,
  isStartDateAndEndDateInRange,
  isStartDateAndEndDateIncludeRange
} from 'date-range-checker';
// or
const  {
  isInRange,
  isStartDateInRange,
  isEndDateInRange,
  isStartDateAndEndDateInRange,
  isStartDateAndEndDateIncludeRange
} = require('date-range-checker');


const result = isInRange(
  { startDate: new Date('2022-01-01'), endDate: new Date('2023-12-31') },
  { startDate: new Date('2023-01-01'), endDate: new Date('2023-11-01') }
);
//=> true
```

## Functions

Name                                       | Params                                                          | Return  | Description 
|------------------------------------------|-----------------------------------------------------------------|---------|-------------------------------------------------------------------------------|
isInRange                                  | (referenceDateRange: DateRange, comparisonDateRange: DateRange) | boolean | Checks if the provided date range is within another date range.
isStartDateInRange                         | (referenceDateRange: DateRange, comparisonDateRange: DateRange) | boolean | Checks if the start date of the reference range is within the comparison range.
isEndDateInRange                           | (referenceDateRange: DateRange, comparisonDateRange: DateRange) | boolean | Checks if the end date of the reference range is within the comparison range.
isStartDateAndEndDateInRange               | (referenceDateRange: DateRange, comparisonDateRange: DateRange) | boolean | Checks if both start and end dates of the reference range are within the comparison range.
isStartDateAndEndDateIncludeRange          | (referenceDateRange: DateRange, comparisonDateRange: DateRange) | boolean | Checks if both start and end dates of the reference range include the comparison range.

## Contributing
Contributions are welcome! Read [contributing guide](CONTRIBUTING.md)

## License
This project is licensed under the MIT License.