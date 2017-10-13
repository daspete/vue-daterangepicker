<template>
    <div :class="`calendar-month${visible == true ? '' : ' calendar-month--invisible'}`">
        <div class="calendar-month__header">
            {{ this.startDate.format('MMMM') }}
            {{ this.startDate.format('YYYY') }}
        </div>
        <div class="calendar-month__days-header">
            <div class="calendar-month__weekday" v-for="weekday in weekdays">{{ weekday }}</div>
        </div>
        <div class="calendar-month__days">
            <calendar-day v-for="(calendarDay, i) in calendarDays" 
                :is-active="isDayValid(calendarDay)"
                :is-visible="isDayVisible(calendarDay)"
                :day="calendarDay"
                :key="`day-${i}`">
            </calendar-day>
        </div>
    </div>
</template>

<script>

    import * as moment from 'moment';

    import CalendarDay from './CalendarDay.vue';

    export default {

        components: {
            CalendarDay
        },

        props: [
            'startDate',
            'visible'
        ],

        data(){
            return {
                calendarDays: [],
                weekdays: moment.weekdaysMin(true)
            };
        },

        created(){
            var startDay = moment(this.startDate.clone().startOf('week'));
            var endDay = moment(moment(this.startDate.clone().endOf('month')).endOf('week'));

            var currentDay = startDay;

            while(currentDay.isBefore(endDay)){
                this.calendarDays.push(currentDay);
                currentDay = currentDay.clone().add(1, 'days');
            }
        },

        methods: {
            isDayValid(day){
                var isValid = this.$parent.$parent.isValidDate(day);
                
                if(isValid)
                    isValid = moment(day).isAfter(moment());
                
                return isValid;
            },

            isDayVisible(day){
                var isVisible = moment(day).isAfter(moment(this.startDate.startOf('month')).subtract(1, 'days'));

                if(isVisible)
                    isVisible = moment(day).isBefore(this.startDate.endOf('month'));

                return isVisible;
            }
        }



    }

</script>