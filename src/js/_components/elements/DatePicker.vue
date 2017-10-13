<template>
    <div class="datepicker-container">
        <div :class="`calendar-container${ openUp == true ? ' open-up' : '' }${ openRight == true ? ' open-right':'' }`" :style="`width: ${global.visibleMonths * 7 * 30 + global.visibleMonths * 20}px`">
            <div class="calendar-months-container">
                <calendar-month v-for="i in parseInt(global.maxMonths)" 
                    :startDate="dates.start.startOf('month').clone().add((i - 1), 'month')"
                    :visible="true"
                    :key="`month-${i}`">
                </calendar-month>
            </div>
            <button type="button" class="calendar-nav-btn prev" v-on:click="onPrevButtonClick"></button>
            <button type="button" class="calendar-nav-btn next" v-on:click="onNextButtonClick"></button>
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
                openUp: false,
                openRight: false,
                currentPage: 0
            };
        },

        created(){
            this.checkDimensions();
        },

        mounted(){
            this.checkDimensions();

            this.currentPage = this.global.currentOffset;

            TweenMax.set('.calendar-months-container', {
                x: -(this.currentPage * (this.global.visibleMonths * 7 * 30 + this.global.visibleMonths * 20))
            });
        },

        methods: {
            checkDimensions(){
                var height = window.innerHeight;
                var width = window.innerWidth;

                var rect = this.$parent.$el.getBoundingClientRect();
                var calWidth = this.global.visibleMonths * 7 * 30 + 40;

                var x = typeof rect.x === 'undefined' ? rect.left : rect.x;
                var y = typeof rect.y === 'undefined' ? rect.top : rect.y;

                if(x + calWidth > width){
                    this.openRight = true;
                }else{
                    this.openRight = false;
                }

                if(y > height * 0.5){
                    this.openUp = true;
                }else{
                    this.openUp = false;
                }
            },
            

            onPrevButtonClick(){
                this.currentPage = Math.max(0, this.currentPage - 1);

                this.global.currentOffset = this.currentPage;

                this.animateToCurrentPage();
            },

            onNextButtonClick(){
                this.currentPage = Math.min(parseInt(this.global.maxMonths / this.global.visibleMonths) - 1, this.currentPage + 1);

                this.global.currentOffset = this.currentPage;

                this.animateToCurrentPage();
            },

            animateToCurrentPage(){
                TweenMax.to('.calendar-months-container', 0.5, {
                    x: -(this.currentPage * (this.global.visibleMonths * 7 * 30 + this.global.visibleMonths * 20))
                });
            }
        }
    }
</script>