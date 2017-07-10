<template>
    <div class="date-range-picker">
        <date-input-field type="start" ref="start-date-field"></date-input-field>
        <date-input-field type="end" ref="end-date-field"></date-input-field>

        <date-picker v-if="pickerOpen === true" ref="date-picker"></date-picker>
    </div>
</template>

<script>
    import DateInputField from './elements/DateInputField.vue';
    import DatePicker from './elements/DatePicker.vue';

    import * as moment from 'moment';

    export default {

        store: [ 'global', 'dates' ],

        components: {
            DateInputField,
            DatePicker
        },

        props: [
            'visibleMonthCount',
            'maxMonthCount',
            //'pickerStartDate',
            //'pickerEndDate',
            'instanceName',
            'invalidDates'
            //'pickerInvalidDates'
        ],

        data(){
            moment.locale('de');

            return {
                pickerOpen: false,
                dateType: false//,
                //invalidDates: this.pickerInvalidDates === '' ? [] : JSON.parse(this.pickerInvalidDates),
                //startDate: moment(this.pickerStartDate === '' ? moment().add(1, 'days') : this.pickerStartDate),
                //endDate: moment(this.pickerEndDate === '' ? moment().add(3, 'days') : this.pickerEndDate)
            };
        },

        created(){
            this.global.maxMonths = typeof this.maxMonthCount === 'undefined' ? this.global.maxMonths : this.maxMonthCount;
            this.global.visibleMonths = typeof this.visibleMonthCount === 'undefined' ? this.global.visibleMonths : this.visibleMonthCount;
            

            this.dates.start = typeof this.startDate === 'undefined' || this.startDate === '' ? moment().add(1, 'days') : this.startDate;
            this.dates.end = typeof this.endDate === 'undefined' || this.endDate === '' ? moment().add(3, 'days') : this.endDate;
            this.dates.invalid = typeof this.invalidDates === 'undefined' || this.invalidDates === '' ? [] : JSON.parse(this.invalidDates);

            window.DateRangePickers = window.DateRangePickers || {};
            window.DateRangePickers[this.instanceName] = this;

            window.addEventListener('keydown', (e) => {
                if(e.keyCode === 27){
                    this.pickerOpen = false;
                }
            });
        },

        methods: {
            onDateInputFieldClicked(dateType){
                this.dateType = dateType;
                this.pickerOpen = true;
            },

            isValidDate(day){
                for(var i = 0; i < this.dates.invalid.length; i++){
                    var invalidDate = moment(this.dates.invalid[i]);



                    if(day.isSame(invalidDate, 'day')){
                        return false;
                    }
                }

                return true;
            }
        }
    }
</script>