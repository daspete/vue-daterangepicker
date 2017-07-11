import Vue from 'vue'
import VueStash from 'vue-stash'

Vue.use(VueStash);

require('./init');

import DateRangePicker from './components/DateRangePicker.vue';


var containers = document.getElementsByClassName('daterangepicker');

for(var i = 0; i < containers.length; i++){
    var drp = new Vue({
        el: containers[i],
        components: { DateRangePicker },
        data(){
            return {
                store: {
                    global: {
                        maxMonths: 18,
                        visibleMonths: 2
                    },
                    dates: {
                        start: null,
                        end: null,
                        invalid: []
                    },
                    selection: {
                        current: null,
                        start: null,
                        end: null
                    }
                }
            }
        }
    });
}



