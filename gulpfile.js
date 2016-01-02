(function (rimraf, gulp, jshint, mocha, uglify) {
    'use strict';

    // Run the linter and report transgressions
    gulp.task(
        'linter',
        function () {
            return gulp
                .src([
                    '*.js',
                    'src/**/*.js',
                    'test/**/*.js'
                ])
                .pipe(jshint());
        }
    );

    // Run the test and report errors and failures; requires that linting passes first
    gulp.task(
        'tests',
        [
            'linter'
        ],
        function () {
            return gulp
                .src('test/runner.html')
                .pipe(mocha()); // Options given in `test/main.js`
        }
    );

    // Perform all QA tasks
    gulp.task(
        'qa',
        [
            'linter',
            'tests'
        ]
    );

    // Clean dist directory
    gulp.task(
        'clean',
        function (callback) {
            rimraf('dist', callback);
        }
    );

    gulp.task(
        'build',
        [
            'qa',
            'clean'
        ],
        function () {
            return gulp
                .src('src/**/*.js')
                .pipe(uglify())
                .pipe(gulp.dest('dist'));
        }
    );

    // Watch all files and perform a full build if anything changes
    gulp.task(
        'watch',
        function () {
            return gulp
                .watch(
                    [
                        'src/**',
                        'test/**'
                    ],
                    [
                        'build'
                    ]
                );
        }
    );

    // Default task is to run a full build (including QA)
    gulp.task(
        'default',
        [
            'build',
            'watch'
        ]
    );
}(require('rimraf'), require('gulp'), require('gulp-jshint'), require('gulp-mocha-phantomjs'), require('gulp-uglify')));
