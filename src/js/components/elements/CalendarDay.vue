<template>
    <div class="calendar-day">
        <button type="button" v-if="isActive && isVisible" :class="`calendar-day__active-day${isSelected === true ? ' day-selected' : ''}${isInRange === true ? ' day-in-range' : ''}`" v-on:click="onClick">{{ day.format('DD') }}</button>
        <div v-if="!isVisible" class="calendar-day__invisible-day"></div>
        <div v-if="!isActive && isVisible" class="calendar-day__inactive-day">{{ day.format('DD') }}</div>
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

        props: [
            'day',
            'isActive',
            'isVisible'
        ],

        computed: {
            isSelected(){
                if(this.selection.start === null && this.selection.end === null) return false;

                if(this.selection.start !== null && this.selection.start.clone().startOf('day').isSame(this.day)) return true;
                if(this.selection.end !== null && this.selection.end.clone().startOf('day').isSame(this.day)) return true;
                
                return false;
            },

            isInRange(){
                if(this.selection.start === null) return false;
                if(this.selection.end === null) return false;

                return this.day.isAfter(this.selection.start) && this.day.isBefore(this.selection.end);
            }
        },

        created(){
            
        },

        methods: {
            onClick(e){
                if(this.selection.current === null) return;

                if(this.selection.current === 'start'){
                    this.selection.start = this.day.clone();
                    this.selection.current = 'end';
                    return;
                }

                if(this.selection.current === 'end'){
                    this.selection.end = this.day.clone();
                    this.$parent.$parent.$parent.closeDatePicker();
                }
            }
        }

    }
</script>