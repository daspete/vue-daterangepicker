const { mix } = require('laravel-mix');

mix.options({
    postCss: [
        require('autoprefixer')({
            browsers: ['> 0%'],
            cascade: false,
            remove: false
        })
    ]
});

mix.sass('src/sass/daterangepicker.scss', 'public/assets/css')
    .js('src/js/daterangepicker.js', 'public/assets/js')
    .setPublicPath('public');