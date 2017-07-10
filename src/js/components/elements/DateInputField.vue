<template>
    <div class="date-input-field-container">
        <input type="text" :value="dates[type].format('DD.MM.YYYY')" :name="`date-input-${type}`" v-on:click="onClicked">
    </div>
</template>

<script>
    import * as moment from 'moment';

    export default {

        store: [ 'dates' ],

        props: [
            'type'
        ],

        created(){

        },

        methods: {
            onClicked(){
                this.$parent.onDateInputFieldClicked(this.$props.type);
            }
        }
    }
</script>