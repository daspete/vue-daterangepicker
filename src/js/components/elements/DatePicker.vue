<template>
    <div class="datepicker-container">
        <div class="calendar-container">
            <calendar-month v-for="i in parseInt(global.maxMonths)" 
                :startDate="dates.start.startOf('month').clone().add((i - 1), 'month')"
                :visible="i > parseInt(global.visibleMonths) ? false : true"
                :key="`month-${i}`">
            </calendar-month>
        </div>
    </div>
</template>

<script>
    import * as moment from 'moment';

    import CalendarMonth from './CalendarMonth.vue';

    export default {

        store: [ 'global', 'dates' ],

        components: {
            CalendarMonth
        },

        data(){
            return {};
        },

        created(){

        },

        methods: {
            selectDay(day){
                console.log(day);
            }
        }
    }
</script>