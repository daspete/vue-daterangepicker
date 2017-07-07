<template>
    <div class="date-input-field-container">
        <input type="text" :value="date.format('DD.MM.YYYY')" :name="`date-input-${type}`" v-on:click="onClicked">
    </div>
</template>

<script>
    import * as moment from 'moment';

    export default {
        props: [
            'type',
            'date'
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