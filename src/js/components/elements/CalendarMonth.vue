<template>
    <div class="calendar-month">
        <div class="calendar-month__header">
            
        </div>
        <div class="calendar-month__days">
            <calendar-day v-for="calendarDay in calendarDays" :day="calendarDay"></calendar-day>
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
            'offset'
        ],

        data(){
            return {
                calendarDays: []
            };
        },

        created(){
            console.log(this.offset);

            const startWeek = this.startDate.startOf('month').week();
            const endWeek = this.startDate.endOf('month').week();

            let calendar = [];
            for(var week = startWeek; week < endWeek; week++){
                calendar.push(Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day')));
            }

            this.calendarDays = calendar;
        }



    }

</script>