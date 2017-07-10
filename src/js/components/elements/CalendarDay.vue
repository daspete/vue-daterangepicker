<template>
    <button :class="`calendar-day${isActive ? '' : ' calendar-day--inactive'}`">
        {{ day.format('DD') }}
        {{ this.isActive }}
    </button>
</template>

<script>
    import * as moment from 'moment';

    export default {

        props: [
            'day',
            'isActive'
        ],

        created(){
            
        }

    }
</script>