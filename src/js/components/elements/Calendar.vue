<template>
    <div class="calendar-container">
        <div class="calender-months-container">
            <div class="calendar-month">
                <div class="calendar-month__header">
                    {{ this.currentDate.format('MMMM') }}
                    {{ this.currentDate.format('YYYY') }}
                </div>
                <div class="calendar-month__days-header">
                    <div class="calendar-month__weekday" v-for="weekday in weekdays">{{ weekday }}</div>
                </div>

                <div class="calendar-month__days">
                    <div class="calendar-day" v-for="(day, i) in days">
                        <button type="button"
                            v-if="isActive(day) && isVisible(day)"
                            :class="`calendar-day__active-day${isSelected(day) == true ? ' day-selected':''}${isInRange(day) == true ? ' day-in-range':''}`" 
                            v-on:click="selectDay(day)"
                        >
                            {{ day.format('DD') }}
                        </button>

                        <div v-if="!isVisible(day)" class="calendar-day__invisible-day"></div>
                        <div v-if="!isActive(day) && isVisible(day)" class="calendar-day__inactive-day">
                            {{ day.format('DD') }}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <button type="button" class="calendar-nav-btn prev" v-on:click="onPrevButtonClick"></button>
        <button type="button" class="calendar-nav-btn next" v-on:click="onNextButtonClick"></button>
    </div>
</template>

<script>

import * as moment from 'moment';

export default {

    store: [
        'global',
        'dates',
        'selection'
    ],

    data(){
        return {
            currentDate: moment(),
            weekdays: moment.weekdaysMin(true),
            days: [],
            invalidDays: ''
        }
    },

    watch: {
        'selection.current': function(selectionType){
            console.log('change', selectionType);
            this.checkType(selectionType);
            this.generateMonthDays();
        }
    },

    created(){},

    mounted(){
        this.invalidDays = this.dates.invalid.join('|');
        this.checkType(this.selection.current);
        this.generateMonthDays();
    },

    methods: {
        onPrevButtonClick(){
            var d = this.currentDate.clone();
            if(d.subtract(1, 'month').isBefore(this.dates.start.clone().startOf('month'))) return;

            this.currentDate = this.currentDate.subtract(1, 'month').clone();
            this.generateMonthDays();
        },
        onNextButtonClick(){
            this.currentDate = this.currentDate.add(1, 'month').clone();
            this.generateMonthDays();
        },

        checkType(selectionType){
            if(selectionType == 'start'){
                this.currentDate = this.selection[selectionType] !== null ? this.selection[selectionType].clone() : moment();
            }

            if(selectionType == 'end'){
                if(this.selection.end != null){
                    this.currentDate = this.selection[selectionType] !== null ? this.selection[selectionType].clone() : moment();
                }else{
                    if(this.selection.start == null){
                        this.currentDate = this.selection[selectionType] !== null ? this.selection[selectionType].clone() : moment();
                    }else{
                        this.currentDate = this.selection.start !== null ? this.selection.start.clone() : moment();
                    }
                }
            }
        },

        generateMonthDays(){
            var startDay = moment(this.currentDate.clone().startOf('month').startOf('week'));
            var endDay = moment(moment(this.currentDate.clone().endOf('month')).endOf('week'));

            var currentDay = startDay;
            this.days = [];


            while(currentDay.isBefore(endDay)){
                this.days.push(currentDay);
                currentDay = currentDay.clone().add(1, 'days');
            }
        },

        selectDay(day){
            this.selection[this.selection.current] = day.clone();
            if(this.selection.current == 'start' && this.selection.start.isAfter(this.selection.end)){
                this.selection.end = this.selection.start.clone();
            }

            if(this.selection.current == 'end'){
                setTimeout(() => {
                    this.$parent.$parent.closeDatePicker();
                }, 200);
                
            }

            if(this.selection.current == 'start'){
                this.selection.current = 'end';
            }
        },

        isActive(day){
            if(this.selection.current == 'end'){
                if(day.isBefore(this.selection.start)) return false;
            }

            if(this.invalidDays.indexOf(day.format('YYYY-MM-DD')) !== -1){
                return false;
            }

            return true;
        },

        isInRange(day){
            if(this.selection.start == null || this.selection.end == null) return;

            var start = this.selection.start.clone().startOf('day');
            var end = this.selection.end.clone().startOf('day');

            var isAfter = day.isAfter(start);
            var isBefore = day.isBefore(end);

            return isAfter && isBefore;
        },

        isSelected(day){
            if(this.selection.current == 'end'){
                var selection = this.selection.start;
                if(selection === null) return false;
                selection = selection.clone();

                var isSelected = selection.startOf('day').isSame(day.startOf('day'));

                if(isSelected === true) return true;
            }

            if(this.selection.current == 'start'){
                var selection = this.selection.end;
                if(selection === null) return false;
                selection = selection.clone();

                var isSelected = selection.startOf('day').isSame(day.startOf('day'));

                if(isSelected === true) return true;
            }



            var selection = this.selection[this.selection.current];
            if(selection === null) return false;
            selection = selection.clone();
            
            var isSelected = selection.startOf('day').isSame(day.startOf('day'));

            return isSelected;
        },

        isVisible(day){
            var isVisible = day.isAfter(this.dates.start.clone().startOf('month').subtract(1, 'days'));

            return isVisible;
        }
    }

}

</script>