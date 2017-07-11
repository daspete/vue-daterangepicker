# vue-daterangepicker

## How-To

create a div container with the class ``` daterangepicker ``` and inside, create a vue-component named ``` date-range-picker ```

```
<div class="daterangepicker">
    <date-range-picker 
        instance-name="headerDatePicker"
        selection-callback="onHeaderDatePickerDateSelected"
        visible-month-count="2" 
        max-month-count="12"
        invalid-dates='["2017-07-08","2017-07-09","2017-07-10"]'
        >
    </date-range-picker>
</div>
```

## Parameters

### instance-name

If this is set, you can access the current daterangepicker component with ``` window.DateRangePickers.[instance-name] ``` [instance-name] is the name, which you chose as parameter value.

### selection-callback

this function is called, when the start- and the end-date is chosen by the user, the function gets the two dates as parameters.

### visible-month-count

how many months will be shown at once

### max-month-count

how many months will be generated to view

### invalid dates

an array with blocked days