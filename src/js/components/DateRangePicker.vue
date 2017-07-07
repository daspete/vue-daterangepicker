<template>
    <div class="date-range-picker">
        <date-input-field type="start" :date="startDate" ref="start-date-field"></date-input-field>
        <date-input-field type="end" :date="endDate" ref="end-date-field"></date-input-field>
        <date-picker v-if="pickerOpen === true" :startDate="startDate" :endDate="endDate" :monthCount="monthCount" ref="date-picker"></date-picker>
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
            'monthCount'
        ],

        data(){
            return {
                pickerOpen: false,
                dateType: false,
                startDate: moment().add(0, 'month'),
                endDate: moment().add(2, 'month')
            };
        },

        created(){
            moment.locale('de');
        },

        methods: {
            onDateInputFieldClicked(dateType){
                this.dateType = dateType;
                this.pickerOpen = true;
            }
        }
    }
</script>