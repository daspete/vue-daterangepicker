<template>
    <div class="datepicker-container">
        <div class="calendar-container" :style="`width: ${global.visibleMonths * 7 * 30 + 40}px`">
            <div class="calendar-months-container">
                <calendar-month v-for="i in parseInt(global.maxMonths)" 
                    :startDate="dates.start.startOf('month').clone().add((i - 1), 'month')"
                    :visible="true"
                    :key="`month-${i}`">
                </calendar-month>
            </div>
            <button class="calendar-nav-btn prev" v-on:click="onPrevButtonClick"></button>
            <button class="calendar-nav-btn next" v-on:click="onNextButtonClick"></button>
        </div>
    </div>
</template>

<script>
    import * as moment from 'moment';
    import TweenMax from 'gsap';

    import CalendarMonth from './CalendarMonth.vue';

    export default {

        store: [ 
            'global', 
            'dates', 
            'selection' 
        ],

        components: {
            CalendarMonth
        },

        data(){
            return {
                currentPage: 0
            };
        },

        created(){

        },

        methods: {
            onPrevButtonClick(){
                this.currentPage = Math.max(0, this.currentPage - 1);

                this.animateToCurrentPage();
            },

            onNextButtonClick(){
                this.currentPage = Math.min(parseInt(this.global.maxMonths / this.global.visibleMonths) - 1, this.currentPage + 1);

                this.animateToCurrentPage();
            },

            animateToCurrentPage(){
                TweenMax.to('.calendar-months-container', 0.5, {
                    x: -(this.currentPage * (this.global.visibleMonths * 7 * 30 + 40))
                });
            }
        }
    }
</script>