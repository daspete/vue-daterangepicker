<template>
    <div class="date-input-field-container">
        <div :class="`date-input date-input-${type}`" v-on:click="onClicked">{{ (selection[type] === null ? dates : selection)[type].format('DD.MM.YYYY') }}</div>
        <input type="hidden" :value="(selection[type] === null ? dates : selection)[type].format('DD.MM.YYYY')" :name="`date-input-${type}`">
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