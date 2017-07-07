import Vue from 'vue'
import VueStash from 'vue-stash'

Vue.use(VueStash);

require('./init');

import DateRangePicker from './components/DateRangePicker.vue';

const drp = new Vue({
    el: '.daterangepicker',
    components: { DateRangePicker },
    data(){
        return {
            store: {}
        }
    }
});

