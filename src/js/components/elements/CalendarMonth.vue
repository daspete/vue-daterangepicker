<template>
    <div :class="`calendar-month${visible == true ? '' : ' calendar-month--invisible'}`">
        <div class="calendar-month__header">
            {{ this.startDate.format('MMMM') }}
            {{ this.startDate.format('YYYY') }}
        </div>
        <div class="calendar-month__days">
            <calendar-day v-for="(calendarDay, i) in calendarDays" 
                :is-active="isDayValid(calendarDay)"
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
                calendarDays: []
            };
        },

        created(){
            let startWeek = this.startDate.startOf('month').week();
            let endWeek = this.startDate.endOf('month').week();

            if(endWeek < startWeek){
                endWeek = this.startDate.subtract(1, 'weeks').endOf('week').week();
            }

            let calendar = [];

            for(var week = startWeek; week <= endWeek; week++){
                for(var i = 0; i < 7; i++){
                    calendar.push(moment().week(week).startOf('week').clone().add(i, 'day'));
                }
            }

            this.calendarDays = calendar;
        },

        methods: {
            isDayValid(day){
                return moment(day).isAfter(this.$parent.startDate);
            }
        }



    }

</script>