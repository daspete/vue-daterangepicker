<template>
    <div class="datepicker-container">
        <div class="calendar-container">
            <calendar-month v-for="i in parseInt(maxMonthCount)" 
                :startDate="startDate.clone().add((i - 1), 'month')"
                :visible="i > parseInt(visibleMonthCount) ? false : true"
                :key="`month-${i}`">
            </calendar-month>
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
            'maxMonthCount',
            'visibleMonthCount'
        ],

        components: {
            CalendarMonth
        },

        data(){
            return {};
        },

        created(){

        },

        methods: {
            onDayClicked(e){
                
            }
        }
    }
</script>