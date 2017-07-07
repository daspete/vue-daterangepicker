window._ = require('lodash');

try {
    window.$ = window.jQuery = require('jquery');
    window.Tether = require('tether');
    require('bootstrap');
} catch (e){}

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';