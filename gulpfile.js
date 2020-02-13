//подключение модуля галпа
var gulp = require('gulp'),
    sass = require('gulp-sass'), //Подключаем Sass пакет
    rename      = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    // pngquant    = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache       = require('gulp-cache'), // Подключаем библиотеку кеширования
    pug = require('gulp-pug'),
    // tinypng = require('gulp-tinypng-compress'), //Сжатие картинок на сайте tinypng, 500 в месяц
    // ttf2woff = require('gulp-ttf2woff'), //Конвертация шрифров в woff
    // ttf2woff2 = require('gulp-ttf2woff2'), //Конвертация шрифров в woff2
    // svgmin = require('gulp-svgmin'), // Подключаем библиотеку для очистки svg от мусора
    // svgstore = require('gulp-svgstore'), //Сборка SVG-спрайтов
    // spritesmith = require('gulp.spritesmith'), //Сборка растровых спрайтов
    postcss = require('gulp-postcss'), //Подключение postcss
    mqpacker = require('css-mqpacker'), //Оптимизация медиа-запросов
    concat = require('gulp-concat'), //объединение файлов
    autoprefixer = require('gulp-autoprefixer'), //авто префиксы
    cssnano = require('gulp-cssnano'), //Сжатие CSS-файлов
    uglify = require('gulp-uglify'), //минимизация js
    del = require('del'), //очищение папок от файлов
    browserSync = require('browser-sync').create(); //обновление браузера

/*---------------------------------Сборка спрайтов SVG-------------------*/
gulp.task('svg-sprites', function(callback) {
    return gulp.src('app/img/svg/*.svg')
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('symbols.svg'))
        .pipe(gulp.dest('app/img/sprites'));
});

/*-------------------- Формирование растрового спрайта -------------------*/
gulp.task('picture-sprites', function (callback) {
    var spriteData =  gulp.src('app/img/icons/**/*.+(jpg|jpeg|png)')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.ccs',
            padding: 10
        }));
    spriteData.img.pipe(gulp.dest('app/img/sprites/'));
    spriteData.css.pipe(gulp.dest('app/pr.common.blocks/'));
    callback();
});

/*-----------------------Конвертация шрифтов woff и woff2-----------------*/
gulp.task('woff', function() {
    gulp.src('app/fonts/ttf/**/*.ttf')
        .pipe(ttf2woff())
        .pipe(gulp.dest('app/fonts'));
});
gulp.task('woff2', function() {
    gulp.src('app/fonts/ttf/**/*.ttf')
        .pipe(ttf2woff2())
        .pipe(gulp.dest('app/fonts/'));
});

gulp.task('fonts', gulp.series('woff', 'woff2'));

/*--------------------Сжатие растровых картинок----------------------------*/
gulp.task('compress-pictures-images', function() {
    return gulp.src('app/images/**/*.+(jpg|jpeg|png)')
        .pipe(tinypngcompress({
            log: true,
            sigFile: settings.sigFile,
            key: settings.key
        }))
        .pipe(gulp.dest('app/dist/images/'));
});

gulp.task('compress-pictures-userdata', function() {
    return gulp.src('app/userdata/**/*.+(jpg|jpeg|png)')
        .pipe(tinypngcompress({
            log: true,
            sigFile: settings.sigFile,
            key: settings.key
        }))
        .pipe(gulp.dest('app/dist/userdata/'));
});

gulp.task('compress-images', gulp.series('compress-pictures-images', 'compress-pictures-userdata'));

/*---------------------------------преобразование pug---------------------------*/
// gulp.task('pug', function buildHTML() {
//     return gulp.src('app/**/*.pug')
//         .pipe(pug())
//         .pipe(gulp.dest('app')) // Выгружаем результата в папку app/css
//         .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
// });


/*---------------------------------преобразование scss-------------------*/
gulp.task('sass', function() { // Создаем таск Sass
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

/*---------------------------------Сборка библиотек стилей в один файл-------------------*/
var cssFiles = [ //файлы в том порядке, в котором должны быть добавлены в общий файл
    'app/css/style.css',
    'app/css/media.css'
];

//запустить на продакшене, один раз, не отслеживать??
gulp.task('styles', function () {
    //'./src/css/**/*.css'
    return gulp.src(cssFiles) // Выбираем файл для минификации

        .pipe(concat('libs.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())// Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({stream: true}));
});

var jsFiles = [ //файлы в том порядке, в котором должны быть добавлены в общий файл
    'app/js/script.js'
];

// альтернатива 'app/js/libs/*.js'

/*------------------Сборка библиотек скриптов в один файл---------------------*/
gulp.task('scripts', function () {
    return gulp.src(jsFiles)

        .pipe(concat('lib.js'))
        .pipe(uglify({
            toplevel: true //максимальный уровень минификации
        }))
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync.init ({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', function() {
    gulp.watch('app/pug/**/*.pug'); // Наблюдение за sass файлами
    gulp.watch('app/sass/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('app/js/**/*.js', gulp.parallel('scripts')); // Наблюдение за js файлами
    gulp.watch("app/*.html").on('change', browserSync.reload); //наблюдение за html файлами
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));