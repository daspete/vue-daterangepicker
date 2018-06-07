<template>
    <div class="datepicker-container">
        <div class="selection-header">
            <button type="button" v-on:click="setCurrentType('start')" :class="`date-start ${ selection.current == 'start' ? 'active' : '' }`">Check-In</button>
            <button type="button" v-on:click="setCurrentType('end')" :class="`date-end ${ selection.current == 'end' ? 'active' : '' }`">Check-Out</button>
        </div>

        <div :class="`step-container step-container--${selection.current}`">
            <div class="datepicker-header" v-if="selection.current == 'start'">Wann wollen Sie einchecken?</div>
            <div class="datepicker-header" v-if="selection.current == 'end'">Wann wollen Sie auschecken?</div>

            <div class="datepicker-calendar">
                <calendar></calendar>
            </div>
        </div>

    </div>
</template>

<script>
    import * as moment from 'moment';
    import TweenMax from 'gsap';

    import Calendar from './Calendar.vue'

    export default {
        store: [
            'global', 
            'dates', 
            'selection'
        ],

        components: {
            Calendar
        },

        data(){
            return {}
        },

        created(){

        },

        mounted(){

        },

        methods: {
            setCurrentType(type){
                this.selection.current = type;
            }
        }
    }
</script>