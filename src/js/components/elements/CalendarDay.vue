<template>
    <button class="calendar-day">

    </button>
</template>

<script>
    import * as moment from 'moment';

    export default {

        props: [
            'day'
        ],

        created(){
            console.log(this.day);
        }

    }
</script>