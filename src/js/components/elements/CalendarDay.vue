<template>
    <button :class="`calendar-day${isActive ? '' : ' calendar-day--inactive'}${isVisible ? '' : ' calendar-day--invisible'}`" v-on:click="onClick">
        {{ day.format('DD') }}
    </button>
</template>

<script>
    import * as moment from 'moment';

    export default {

        props: [
            'day',
            'isActive',
            'isVisible'
        ],

        created(){
            
        },

        methods: {
            onClick(e){
                if(!this.isActive) return;
                if(!this.isVisible) return;

                this.$parent.$parent.selectDay(this.day);
            }
        }

    }
</script>