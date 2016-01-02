(function () {
    'use strict';

    require.config({
        paths: {
            // Test modules
            mocha: '../node_modules/mocha/mocha',
            chai: '../node_modules/chai/chai',

            // Libraries
            jquery: '../node_modules/jquery/dist/jquery',

            // Code under test
            safemail: '../src/jquery.safemail'
        },
        shim: {
            mocha: {
                init: function () {
                    // https://gist.github.com/michaelcox/3800736
                    // https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
                    return this.mocha.setup({
                        ui: 'bdd',
                        reporter: /phantom/i.test(window.navigator.userAgent) ? 'spec' : 'html'
                    });
                }
            }
        }
    });

    require(
        [
            'mocha'
        ],
        function (mocha) {
            require(
                [
                    './spec/jquery.safemail.spec'
                ],
                function () {
                    mocha.run();
                }
            );
        }
    );
}());
