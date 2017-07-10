<template>
    <div class="date-range-picker">
        <date-input-field type="start" :date="startDate" ref="start-date-field"></date-input-field>
        <date-input-field type="end" :date="endDate" ref="end-date-field"></date-input-field>

        <date-picker v-if="pickerOpen === true" 
            :startDate="startDate" 
            :endDate="endDate" 
            :visible-month-count="visibleMonthCount" 
            :max-month-count="maxMonthCount" 
            ref="date-picker">
        </date-picker>
    </div>
</template>

<script>
    import DateInputField from './elements/DateInputField.vue';
    import DatePicker from './elements/DatePicker.vue';

    import * as moment from 'moment';

    export default {
        components: {
            DateInputField,
            DatePicker
        },

        props: [
            'visibleMonthCount',
            'maxMonthCount',
            'pickerStartDate',
            'pickerEndDate',
            'instanceName'
        ],

        data(){
            moment.locale('de');

            return {
                pickerOpen: false,
                dateType: false,
                startDate: moment(this.pickerStartDate),
                endDate: moment(this.pickerEndDate)
            };
        },

        created(){
            window.DateRangePickers = window.DateRangePickers || {};
            window.DateRangePickers[this.instanceName] = this;

            window.addEventListener('keydown', (e) => {
                if(e.keyCode === 27){
                    this.closeDatePicker();
                }
            });
        },

        methods: {
            onDateInputFieldClicked(dateType){
                this.dateType = dateType;
                this.pickerOpen = true;
            },

            closeDatePicker(){
                this.pickerOpen = false;
            }
        }
    }
</script>