<template>

    <div class="date-range-picker">
        <div class="date-pickers-container">
            <date-input-field type="start" ref="start-date-field"></date-input-field>
            <date-input-field type="end" ref="end-date-field"></date-input-field>
        </div>

        <div class="datepicker-underlay" v-if="global.pickerOpen === true" v-on:click="closeDatePicker"></div>
        <date-picker v-if="global.pickerOpen === true" ref="date-picker"></date-picker>
    </div>

</template>

<script>
    import * as moment from 'moment';

    import DateInputField from './elements/DateInputField.vue'
    import DatePicker from './elements/DatePicker.vue'

    export default {
        store: [
            'global',
            'dates',
            'selection'
        ],
        components: {
            DateInputField,
            DatePicker
        },

        props: [
            'instanceName',
            'selectionCallback',
            'initCallback',
            'visibleMonthCount',
            'maxMonthCount',
            'invalidDates',
            'startDate',
            'endDate',
            'language',
            'startPlaceholder',
            'endPlaceholder'
        ],

        data(){
            return {}
        },

        created(){
            moment.locale(typeof this.language == 'undefined' ? 'de' : this.language);

            this.global.maxMonths = typeof this.maxMonthCount === 'undefined' ? this.global.maxMonths : this.maxMonthCount;

            this.global.visibleMonths = typeof this.visibleMonthCount === 'undefined' ? this.global.visibleMonths : this.visibleMonthCount;
            if(window.innerWidth < 576){
                this.global.visibleMonths = 1;
            }

            if(typeof this.startPlaceholder !== 'undefined'){
                this.global.placeholders.start = this.startPlaceholder;
            }
            if(typeof this.endPlaceholder !== 'undefined'){
                this.global.placeholders.end = this.endPlaceholder;
            }

            this.dates.start = moment().add(1, 'days');
            this.dates.end = moment().add(3, 'days');

            this.dates.invalid = typeof this.invalidDates === 'undefined' || this.invalidDates === '' ? [] : JSON.parse(this.invalidDates);

            this.selection.start = typeof this.startDate === 'undefined' || this.startDate === '' ? null : moment(this.startDate).clone();
            this.selection.end = typeof this.endDate === 'undefined' || this.endDate === '' ? null : moment(this.endDate).clone();

            var monthDiff = 0;
            var page = 0;
            if(this.selection.start != null){
                monthDiff = this.selection.start.diff(this.dates.start, 'months', true);
                page = Math.round(monthDiff / this.global.visibleMonths);
                
            }
            this.global.currentOffset = page;

            window.DateRangePickers = window.DateRangePickers || {};
            window.DateRangePickers[this.instanceName] = this;

            window.addEventListener('keydown', (e) => {
                if(e.keyCode === 27){
                    this.closeDatePicker();
                }
            });
        },

        mounted(){
            if(typeof this.initCallback !== 'undefined'){
                if(typeof window[this.initCallback] !== 'undefined'){
                    window[this.initCallback](this);
                }
            }
        },

        methods: {
            onDateInputFieldClicked(dateType){
                this.selection.current = dateType;
                this.global.pickerOpen = true;
            },

            setDates(start, end){
                this.selection.start = start;
                this.selection.end = end;

                this.checkDates();
            },

            closeDatePicker(){
                this.selection.current = null;
                this.global.pickerOpen = false;

                this.checkDates();
            },

            checkDates(){
                if(this.selection.start !== null && this.selection.end !== null){
                    if(this.selection.start.isAfter(this.selection.end)){
                        var start = this.selection.start.clone();
                        this.selection.start = this.selection.end.clone();
                        this.selection.end = start;
                    }
                }
                
                if(typeof this.selectionCallback !== 'undefined'){
                    if(typeof window[this.selectionCallback] !== 'undefined'){
                        window[this.selectionCallback](this.selection.start, this.selection.end);
                    }
                }
            }
        }
    }
</script>