<template>
    <div class="datepicker-container">
        <div class="calendar-container">
            <calendar-month v-for="i in monthCount" :startDate="startDate" :offset="i"></calendar-month>
        </div>
    </div>
</template>

<script>
    import * as moment from 'moment';

    import CalendarMonth from './CalendarMonth.vue';

    export default {

        props: [
            'startDate',
            'endDate',
            'monthCount'
        ],

        components: {
            CalendarMonth
        },

        data(){
            return {};
        },

        created(){
            const startWeek = this.startDate.startOf('month').week();
            const endWeek = this.startDate.endOf('month').week();


            let calendar = []
            for(var week = startWeek; week < endWeek; week++){
                calendar.push({
                    week: week,
                    days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
                });
            }

            console.log(calendar);


            return;

            var weekdays = moment().localeData().weekdaysMin();
            var weekStartsAt = 1;

            var computedWeekDays = [];

            for(var i = weekStartsAt; i < weekStartsAt === 1 ? 8 : 7; i++){
                if(i == 7){
                    computedWeekDays.push(weekdays[0]);
                    break;
                }
                computedWeekDays.push(weekdays[i]);
            }

            this.weekdays = computedWeekDays;

            this.inactiveDaysBeforeStart = parseInt(this.startDate.format('DD'));
            this.daysTillEnd = parseInt(this.startDate.daysInMonth()) - this.inactiveDaysBeforeStart;
            this.daysTillMonthStart = this.startDate.weekday() + weekStartsAt;
        },

        methods: {
            onDayClicked(e){
                console.log(e);
            }
        }
    }
</script>